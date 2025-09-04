import { z } from "zod"

export const basicInfoSchema = z.object({
  auditName: z.string().min(1, "Audit name is required"),
  company: z.string().min(1, "Company name is required"),
  auditDate: z.string().min(1, "Audit date is required"),
  auditor: z.string().min(1, "Auditor name is required"),
  department: z.string().min(1, "Department is required"),
  auditType: z.enum(["financial", "operational", "compliance", "security", "quality"], {
    required_error: "Please select an audit type",
  }),
  description: z.string().optional(),
})

export const quizSchema = z.object({
  riskAssessment: z.enum(["low", "medium", "high"], {
    required_error: "Please select a risk level",
  }),
  complianceStatus: z.enum(["compliant", "partial", "non-compliant"], {
    required_error: "Please select compliance status",
  }),
  previousAuditIssues: z.enum(["yes", "no"], {
    required_error: "Please indicate if there were previous issues",
  }),
  stakeholderInvolvement: z.enum(["minimal", "moderate", "extensive"], {
    required_error: "Please select stakeholder involvement level",
  }),
  additionalNotes: z.string().optional(),
})

export const processEvaluationSchema = z.object({
  processEfficiency: z.number().min(1).max(10, "Rating must be between 1-10"),
  documentationQuality: z.number().min(1).max(10, "Rating must be between 1-10"),
  controlEffectiveness: z.number().min(1).max(10, "Rating must be between 1-10"),
  resourceAdequacy: z.number().min(1).max(10, "Rating must be between 1-10"),
  processImprovements: z.string().min(1, "Process improvements are required"),
  keyFindings: z.string().min(1, "Key findings are required"),
})

export const legalComplianceSchema = z.object({
  regulatoryCompliance: z.enum(["full", "partial", "non-compliant"], {
    required_error: "Please select regulatory compliance status",
  }),
  legalRequirements: z.array(z.string()).min(1, "At least one legal requirement must be selected"),
  complianceGaps: z.string().optional(),
  remedialActions: z.string().min(1, "Remedial actions are required"),
  complianceDeadline: z.string().min(1, "Compliance deadline is required"),
  responsibleParty: z.string().min(1, "Responsible party is required"),
})

export const documentUploadSchema = z.object({
  documents: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        url: z.string().optional(),
        id: z.string().optional(),
      }),
    )
    .min(1, "At least one document must be uploaded"),
  documentTypes: z.array(z.string()).min(1, "Please select document types"),
  additionalComments: z.string().optional(),
})

export type BasicInfoData = z.infer<typeof basicInfoSchema>
export type QuizData = z.infer<typeof quizSchema>
export type ProcessEvaluationData = z.infer<typeof processEvaluationSchema>
export type LegalComplianceData = z.infer<typeof legalComplianceSchema>
export type DocumentUploadData = z.infer<typeof documentUploadSchema>

export type AuditFormData = {
  basicInfo: BasicInfoData
  quiz: QuizData
  processEvaluation: ProcessEvaluationData
  legalCompliance: LegalComplianceData
  documentUpload: DocumentUploadData
}
