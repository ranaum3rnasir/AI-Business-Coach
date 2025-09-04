"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, User } from "lucide-react"
import { AuditDetailModal } from "@/components/audit-detail-modal"

interface RecentAudit {
  id: string
  name: string
  company: string
  date: string
  status: "completed" | "in-progress" | "pending"
  auditor: string
}

const recentAudits: RecentAudit[] = [
  {
    id: "AUD-001",
    name: "Q4 Financial Audit",
    company: "TechCorp Inc.",
    date: "2024-01-15",
    status: "completed",
    auditor: "John Smith",
  },
  {
    id: "AUD-002",
    name: "Security Compliance Review",
    company: "DataSafe LLC",
    date: "2024-01-10",
    status: "in-progress",
    auditor: "Sarah Johnson",
  },
  {
    id: "AUD-003",
    name: "Operational Efficiency Audit",
    company: "Manufacturing Co.",
    date: "2024-01-08",
    status: "pending",
    auditor: "Mike Wilson",
  },
]

function getStatusColor(status: RecentAudit["status"]) {
  switch (status) {
    case "completed":
      return "badge-green"
    case "in-progress":
      return "badge-blue"
    case "pending":
      return "badge-yellow"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function RecentAudits() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Audits</CardTitle>
        <CardDescription>Your latest audit activities and their current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAudits.map((audit) => (
            <div
              key={audit.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">{audit.name}</h4>
                  <Badge className={getStatusColor(audit.status)}>{audit.status.replace("-", " ")}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{audit.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(audit.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Auditor: {audit.auditor}</p>
              </div>
              <AuditDetailModal auditId={audit.id}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Eye className="h-4 w-4" />
                </Button>
              </AuditDetailModal>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
