"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AuditFormModal } from "@/components/audit-form-modal"
import Link from "next/link"

export function DashboardActions() {
  const { toast } = useToast()

  const handleViewAudits = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Audit history will be fetched from your external API server.",
    })
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <Card className="cursor-pointer transition-colors hover:bg-accent/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary" />
            <CardTitle>New Audit</CardTitle>
          </div>
          <CardDescription>Start a new audit process with guided forms</CardDescription>
        </CardHeader>
        <CardContent>
          <AuditFormModal>
            <Button className="w-full" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create New Audit
            </Button>
          </AuditFormModal>
        </CardContent>
      </Card>

      <Card className="cursor-pointer transition-colors hover:bg-accent/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-primary" />
            <CardTitle>Previous Audits</CardTitle>
          </div>
          <CardDescription>View and manage your audit records</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/history">
            <Button variant="outline" className="w-full bg-transparent" size="lg">
              <History className="mr-2 h-4 w-4" />
              View Audit History
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
