"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardActions } from "@/components/dashboard-actions"
import { RecentAudits } from "@/components/recent-audits"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">Dashboard Overview</h1>
          <p className="text-muted-foreground text-pretty">
            Monitor your audit activities and business compliance metrics
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Main Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <DashboardActions />
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Recent Audits</h2>
          <RecentAudits />
        </div>
      </div>
    </DashboardLayout>
  )
}
