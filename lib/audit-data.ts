import type { AuditFormData } from "./audit-schemas"

export interface Audit {
  id: string
  auditName: string
  company: string
  auditDate: string
  auditor: string
  status: "completed" | "in-progress" | "pending" | "draft"
  auditType: "financial" | "operational" | "compliance" | "security" | "quality"
  createdAt: string
  updatedAt: string
  formData?: AuditFormData
}

// Mock data for demonstration
export const mockAudits: Audit[] = [
  {
    id: "AUD-2024-001",
    auditName: "Q4 Financial Audit",
    company: "TechCorp Inc.",
    auditDate: "2024-01-15",
    auditor: "John Smith",
    status: "completed",
    auditType: "financial",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
    formData: {
      basicInfo: {
        auditName: "Q4 Financial Audit",
        company: "TechCorp Inc.",
        auditDate: "2024-01-15",
        auditor: "John Smith",
        department: "Finance",
        auditType: "financial",
        description: "Quarterly financial audit for compliance and accuracy verification",
      },
      quiz: {
        riskAssessment: "medium",
        complianceStatus: "compliant",
        previousAuditIssues: "no",
        stakeholderInvolvement: "moderate",
        additionalNotes: "Standard quarterly review",
      },
      processEvaluation: {
        processEfficiency: 8,
        documentationQuality: 9,
        controlEffectiveness: 8,
        resourceAdequacy: 7,
        processImprovements: "Implement automated reconciliation processes",
        keyFindings: "Overall strong financial controls with minor process improvements needed",
      },
      legalCompliance: {
        regulatoryCompliance: "full",
        legalRequirements: ["SOX Compliance", "Local Regulations"],
        complianceGaps: "",
        remedialActions: "Continue current practices",
        complianceDeadline: "2024-03-31",
        responsibleParty: "Finance Team",
      },
      documentUpload: {
        documents: [
          { name: "financial-statements-q4.pdf", size: 2048000, type: "application/pdf" },
          { name: "audit-checklist.xlsx", size: 512000, type: "application/vnd.ms-excel" },
        ],
        documentTypes: ["Financial Statements", "Process Documentation"],
        additionalComments: "All required documents attached",
      },
    },
  },
  {
    id: "AUD-2024-002",
    auditName: "Security Compliance Review",
    company: "DataSafe LLC",
    auditDate: "2024-01-10",
    auditor: "Sarah Johnson",
    status: "in-progress",
    auditType: "security",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-10",
  },
  {
    id: "AUD-2024-003",
    auditName: "Operational Efficiency Audit",
    company: "Manufacturing Co.",
    auditDate: "2024-01-08",
    auditor: "Mike Wilson",
    status: "pending",
    auditType: "operational",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-08",
  },
  {
    id: "AUD-2024-004",
    auditName: "Quality Management System Audit",
    company: "PharmaLife Inc.",
    auditDate: "2024-01-20",
    auditor: "Emily Davis",
    status: "draft",
    auditType: "quality",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  {
    id: "AUD-2024-005",
    auditName: "GDPR Compliance Assessment",
    company: "EuroTech Solutions",
    auditDate: "2024-01-25",
    auditor: "Robert Brown",
    status: "completed",
    auditType: "compliance",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
]

export function getAuditById(id: string): Audit | undefined {
  return mockAudits.find((audit) => audit.id === id)
}

export function getAuditsByStatus(status: Audit["status"]): Audit[] {
  return mockAudits.filter((audit) => audit.status === status)
}

export function getAuditsByAuditor(auditor: string): Audit[] {
  return mockAudits.filter((audit) => audit.auditor === auditor)
}
