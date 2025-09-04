import type { ObjectId } from "mongodb"
import type { AuditFormData } from "@/lib/audit-schemas"

export interface AuditDocument {
  _id?: ObjectId
  id: string
  auditName: string
  company: string
  auditDate: string
  auditor: string
  status: "completed" | "in-progress" | "pending" | "draft"
  auditType: "financial" | "operational" | "compliance" | "security" | "quality"
  createdAt: string
  updatedAt: string
  userId: string // Link to the user who created the audit
  formData?: AuditFormData
}

export interface CreateAuditData {
  auditName: string
  company: string
  auditDate: string
  auditor: string
  auditType: "financial" | "operational" | "compliance" | "security" | "quality"
  userId: string
  formData?: AuditFormData
}

export interface UpdateAuditData {
  auditName?: string
  company?: string
  auditDate?: string
  auditor?: string
  status?: "completed" | "in-progress" | "pending" | "draft"
  auditType?: "financial" | "operational" | "compliance" | "security" | "quality"
  formData?: AuditFormData
  updatedAt: string
}
