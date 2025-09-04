"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function AuditHistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Audit History</h1>
          <p className="text-muted-foreground">View and manage your previous audits</p>
        </div>

        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">Audit history table will be implemented here</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
