"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { File, Calendar, User, Building, FileText } from "lucide-react"
import type { AuditFormData } from "@/lib/audit-schemas"

interface AuditDetailSectionsProps {
  formData: AuditFormData
}

export function AuditDetailSections({ formData }: AuditDetailSectionsProps) {
  const { basicInfo, quiz, processEvaluation, legalCompliance, documentUpload } = formData

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Company</span>
              </div>
              <p className="text-sm">{basicInfo.company}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Audit Date</span>
              </div>
              <p className="text-sm">{new Date(basicInfo.auditDate).toLocaleDateString()}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Auditor</span>
              </div>
              <p className="text-sm">{basicInfo.auditor}</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Department</span>
              <p className="text-sm">{basicInfo.department}</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Audit Type</span>
              <Badge variant="secondary">
                {basicInfo.auditType.charAt(0).toUpperCase() + basicInfo.auditType.slice(1)}
              </Badge>
            </div>
          </div>

          {basicInfo.description && (
            <>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm font-medium">Description</span>
                <p className="text-sm text-muted-foreground">{basicInfo.description}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Assessment Results */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>Risk evaluation and compliance assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-sm font-medium">Risk Assessment</span>
              <Badge
                className={
                  quiz.riskAssessment === "high"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : quiz.riskAssessment === "medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                }
              >
                {quiz.riskAssessment.toUpperCase()} RISK
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Compliance Status</span>
              <Badge
                className={
                  quiz.complianceStatus === "compliant"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : quiz.complianceStatus === "partial"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }
              >
                {quiz.complianceStatus.replace("-", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Previous Issues</span>
              <p className="text-sm">{quiz.previousAuditIssues === "yes" ? "Yes" : "No"}</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Stakeholder Involvement</span>
              <p className="text-sm capitalize">{quiz.stakeholderInvolvement}</p>
            </div>
          </div>

          {quiz.additionalNotes && (
            <>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm font-medium">Additional Notes</span>
                <p className="text-sm text-muted-foreground">{quiz.additionalNotes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Process Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle>Process Evaluation</CardTitle>
          <CardDescription>Detailed assessment of process effectiveness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Process Efficiency</span>
                <span className="text-sm text-muted-foreground">{processEvaluation.processEfficiency}/10</span>
              </div>
              <Progress value={processEvaluation.processEfficiency * 10} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Documentation Quality</span>
                <span className="text-sm text-muted-foreground">{processEvaluation.documentationQuality}/10</span>
              </div>
              <Progress value={processEvaluation.documentationQuality * 10} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Control Effectiveness</span>
                <span className="text-sm text-muted-foreground">{processEvaluation.controlEffectiveness}/10</span>
              </div>
              <Progress value={processEvaluation.controlEffectiveness * 10} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Resource Adequacy</span>
                <span className="text-sm text-muted-foreground">{processEvaluation.resourceAdequacy}/10</span>
              </div>
              <Progress value={processEvaluation.resourceAdequacy * 10} className="h-2" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Process Improvements</span>
              <p className="text-sm text-muted-foreground">{processEvaluation.processImprovements}</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Key Findings</span>
              <p className="text-sm text-muted-foreground">{processEvaluation.keyFindings}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Compliance</CardTitle>
          <CardDescription>Regulatory compliance assessment and requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-sm font-medium">Regulatory Compliance</span>
              <Badge
                className={
                  legalCompliance.regulatoryCompliance === "full"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : legalCompliance.regulatoryCompliance === "partial"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }
              >
                {legalCompliance.regulatoryCompliance.replace("-", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Compliance Deadline</span>
              <p className="text-sm">{new Date(legalCompliance.complianceDeadline).toLocaleDateString()}</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Responsible Party</span>
              <p className="text-sm">{legalCompliance.responsibleParty}</p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Legal Requirements</span>
            <div className="flex flex-wrap gap-2">
              {legalCompliance.legalRequirements.map((req, index) => (
                <Badge key={index} variant="outline">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            {legalCompliance.complianceGaps && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Compliance Gaps</span>
                <p className="text-sm text-muted-foreground">{legalCompliance.complianceGaps}</p>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-sm font-medium">Remedial Actions</span>
              <p className="text-sm text-muted-foreground">{legalCompliance.remedialActions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
          <CardDescription>Files and documentation attached to this audit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-medium">Document Types</span>
            <div className="flex flex-wrap gap-2">
              {documentUpload.documentTypes.map((type, index) => (
                <Badge key={index} variant="secondary">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Uploaded Files</span>
            <div className="space-y-2">
              {documentUpload.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {documentUpload.additionalComments && (
            <>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm font-medium">Additional Comments</span>
                <p className="text-sm text-muted-foreground">{documentUpload.additionalComments}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
