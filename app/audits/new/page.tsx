"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Stepper } from "@/components/ui/stepper"
import { BasicInfoStep } from "@/components/audit-form/basic-info-step"
import { QuizStep } from "@/components/audit-form/quiz-step"
import { ProcessEvaluationStep } from "@/components/audit-form/process-evaluation-step"
import { LegalComplianceStep } from "@/components/audit-form/legal-compliance-step"
import { DocumentUploadStep } from "@/components/audit-form/document-upload-step"
import { DashboardHeader } from "@/components/dashboard-header"
import { useToast } from "@/hooks/use-toast"
import type { AuditFormData } from "@/lib/audit-schemas"

const steps = [
  { id: "basic-info", title: "Basic Info", description: "Audit details" },
  { id: "quiz", title: "Assessment", description: "Risk evaluation" },
  { id: "process", title: "Process Eval", description: "Process review" },
  { id: "legal", title: "Legal & Compliance", description: "Regulatory review" },
  { id: "documents", title: "Documents", description: "File upload" },
]

export default function NewAuditPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<AuditFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleNext = (stepData: any, stepKey: keyof AuditFormData) => {
    setFormData((prev) => ({ ...prev, [stepKey]: stepData }))
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleComplete = async (stepData: any) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create an audit.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const finalData = { ...formData, documentUpload: stepData } as AuditFormData

      const response = await fetch("/api/audits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auditName: finalData.basicInfo.auditName,
          company: finalData.basicInfo.company,
          auditDate: finalData.basicInfo.auditDate,
          auditor: finalData.basicInfo.auditor,
          auditType: finalData.basicInfo.auditType,
          formData: finalData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create audit")
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: "Audit created successfully!",
      })

      router.push(`/audits/${result.audit.id}`)
    } catch (error) {
      console.error("Error creating audit:", error)
      toast({
        title: "Error",
        description: "Failed to create audit. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={formData.basicInfo || {}} onNext={(data) => handleNext(data, "basicInfo")} />
      case 2:
        return <QuizStep data={formData.quiz || {}} onNext={(data) => handleNext(data, "quiz")} onBack={handleBack} />
      case 3:
        return (
          <ProcessEvaluationStep
            data={formData.processEvaluation || {}}
            onNext={(data) => handleNext(data, "processEvaluation")}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <LegalComplianceStep
            data={formData.legalCompliance || {}}
            onNext={(data) => handleNext(data, "legalCompliance")}
            onBack={handleBack}
          />
        )
      case 5:
        return <DocumentUploadStep data={formData.documentUpload || {}} onNext={handleComplete} onBack={handleBack} />
      default:
        return null
    }
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Creating your audit...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-balance">Create New Audit</h1>
            <p className="text-muted-foreground text-pretty">
              Follow the guided process to complete your audit documentation
            </p>
          </div>

          <Stepper steps={steps} currentStep={currentStep} />

          <div className="max-w-4xl mx-auto">{renderStep()}</div>
        </div>
      </main>
    </div>
  )
}
