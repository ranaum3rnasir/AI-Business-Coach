"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function NewAuditPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Audit</h1>
          <p className="text-muted-foreground">Start a new business audit process</p>
        </div>

        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">New audit form will be implemented here</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
