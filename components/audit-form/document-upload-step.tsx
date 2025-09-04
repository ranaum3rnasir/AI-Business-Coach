"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"
import { documentUploadSchema, type DocumentUploadData } from "@/lib/audit-schemas"
import type { UploadedFile } from "@/lib/file-upload"

interface DocumentUploadStepProps {
  data: Partial<DocumentUploadData>
  onNext: (data: DocumentUploadData) => void
  onBack: () => void
}

const documentTypeOptions = [
  "Financial Statements",
  "Process Documentation",
  "Compliance Certificates",
  "Risk Assessments",
  "Previous Audit Reports",
  "Policy Documents",
  "Training Records",
  "Other Supporting Documents",
]

export function DocumentUploadStep({ data, onNext, onBack }: DocumentUploadStepProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DocumentUploadData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      documents: [],
      documentTypes: [],
      ...data,
    },
  })

  const watchedValues = watch()
  const selectedDocumentTypes = watchedValues.documentTypes || []

  const handleFilesUploaded = (newFiles: UploadedFile[]) => {
    const allFiles = [...uploadedFiles, ...newFiles]
    setUploadedFiles(allFiles)

    const documentData = allFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url,
      id: file.id,
    }))
    setValue("documents", documentData as any)
  }

  const handleDocumentTypeChange = (docType: string, checked: boolean) => {
    const current = selectedDocumentTypes
    if (checked) {
      setValue("documentTypes", [...current, docType])
    } else {
      setValue(
        "documentTypes",
        current.filter((t) => t !== docType),
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>Upload supporting documents for this audit</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onNext)} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-medium">Upload Documents *</Label>

            <FileUpload onFilesUploaded={handleFilesUploaded} maxFiles={10} />

            {errors.documents && <p className="text-sm text-destructive">{errors.documents.message}</p>}
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Document Types *</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {documentTypeOptions.map((docType) => (
                <div key={docType} className="flex items-center space-x-2">
                  <Checkbox
                    id={docType}
                    checked={selectedDocumentTypes.includes(docType)}
                    onCheckedChange={(checked) => handleDocumentTypeChange(docType, checked as boolean)}
                  />
                  <Label htmlFor={docType} className="text-sm">
                    {docType}
                  </Label>
                </div>
              ))}
            </div>
            {errors.documentTypes && <p className="text-sm text-destructive">{errors.documentTypes.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalComments">Additional Comments</Label>
            <Textarea
              id="additionalComments"
              placeholder="Any additional notes about the uploaded documents..."
              rows={3}
              {...register("additionalComments")}
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Complete Audit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
