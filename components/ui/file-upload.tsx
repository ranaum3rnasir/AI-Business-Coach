"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { uploadFile, formatFileSize, type UploadedFile } from "@/lib/file-upload"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void
  maxFiles?: number
  className?: string
  disabled?: boolean
}

interface FileWithStatus extends File {
  id: string
  status: "pending" | "uploading" | "success" | "error"
  progress: number
  error?: string
  uploadedFile?: UploadedFile
}

export function FileUpload({ onFilesUploaded, maxFiles = 10, className, disabled = false }: FileUploadProps) {
  const [files, setFiles] = useState<FileWithStatus[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return

      const newFiles: FileWithStatus[] = acceptedFiles.map((file) => ({
        ...file,
        id: crypto.randomUUID(),
        status: "pending" as const,
        progress: 0,
      }))

      setFiles((prev) => [...prev, ...newFiles].slice(0, maxFiles))
      setIsUploading(true)

      // Upload files one by one
      const uploadedFiles: UploadedFile[] = []

      for (const fileWithStatus of newFiles) {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileWithStatus.id ? { ...f, status: "uploading", progress: 0 } : f)),
        )

        try {
          // Simulate progress
          const progressInterval = setInterval(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileWithStatus.id && f.progress < 90 ? { ...f, progress: f.progress + 10 } : f,
              ),
            )
          }, 100)

          const result = await uploadFile(fileWithStatus)
          clearInterval(progressInterval)

          if (result.success && result.file) {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileWithStatus.id
                  ? {
                      ...f,
                      status: "success",
                      progress: 100,
                      uploadedFile: result.file,
                    }
                  : f,
              ),
            )
            uploadedFiles.push(result.file)
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileWithStatus.id
                  ? {
                      ...f,
                      status: "error",
                      progress: 0,
                      error: result.error,
                    }
                  : f,
              ),
            )
          }
        } catch (error) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileWithStatus.id
                ? {
                    ...f,
                    status: "error",
                    progress: 0,
                    error: "Upload failed",
                  }
                : f,
            ),
          )
        }
      }

      setIsUploading(false)

      if (uploadedFiles.length > 0) {
        onFilesUploaded(uploadedFiles)
      }
    },
    [disabled, maxFiles, onFilesUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: disabled || isUploading,
    maxFiles,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "text/plain": [".txt"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  })

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const retryUpload = async (fileId: string) => {
    const fileToRetry = files.find((f) => f.id === fileId)
    if (!fileToRetry) return

    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "uploading", progress: 0, error: undefined } : f)),
    )

    try {
      const result = await uploadFile(fileToRetry)

      if (result.success && result.file) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  status: "success",
                  progress: 100,
                  uploadedFile: result.file,
                }
              : f,
          ),
        )
        onFilesUploaded([result.file])
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  status: "error",
                  progress: 0,
                  error: result.error,
                }
              : f,
          ),
        )
      }
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                status: "error",
                progress: 0,
                error: "Upload failed",
              }
            : f,
        ),
      )
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
          (disabled || isUploading) && "opacity-50 cursor-not-allowed",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          {isDragActive ? (
            <p className="text-sm text-primary">Drop the files here...</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, Word documents, Excel files, and images (Max 10MB per file)
              </p>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Files</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {file.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {file.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                  {file.status === "uploading" && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                  {file.status === "pending" && <File className="h-5 w-5 text-muted-foreground" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground ml-2">{formatFileSize(file.size)}</p>
                  </div>

                  {file.status === "uploading" && <Progress value={file.progress} className="h-1 mt-1" />}

                  {file.error && <p className="text-xs text-destructive mt-1">{file.error}</p>}
                </div>

                <div className="flex items-center space-x-1">
                  {file.status === "error" && (
                    <Button variant="ghost" size="sm" onClick={() => retryUpload(file.id)}>
                      Retry
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    disabled={file.status === "uploading"}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.some((f) => f.status === "error") && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Some files failed to upload. Please check the errors above and try again.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
