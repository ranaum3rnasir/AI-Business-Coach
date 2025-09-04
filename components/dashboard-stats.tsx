"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: string
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && <p className="text-xs text-primary mt-1">{trend}</p>}
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Audits"
        value="24"
        description="All time audits conducted"
        icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        trend="+2 from last month"
      />
      <StatsCard
        title="In Progress"
        value="3"
        description="Currently active audits"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        trend="2 due this week"
      />
      <StatsCard
        title="Completed"
        value="18"
        description="Successfully completed"
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        trend="+5 this month"
      />
      <StatsCard
        title="Issues Found"
        value="7"
        description="Requiring attention"
        icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        trend="3 high priority"
      />
    </div>
  )
}
