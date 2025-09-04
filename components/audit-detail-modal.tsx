"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { FileText, Calendar, User, Building2, AlertTriangle, Clock, TrendingUp, Download } from "lucide-react"

interface AuditDetailModalProps {
  children: React.ReactNode
  auditId: string
}

// Mock data for charts
const complianceData = [
  { name: "Financial Controls", score: 85, target: 90 },
  { name: "Risk Management", score: 92, target: 85 },
  { name: "Data Security", score: 78, target: 95 },
  { name: "Operational Procedures", score: 88, target: 80 },
  { name: "Regulatory Compliance", score: 95, target: 90 },
]

const riskDistribution = [
  { name: "Low Risk", value: 45, color: "#22c55e" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 15, color: "#ef4444" },
  { name: "Critical Risk", value: 5, color: "#dc2626" },
]

const timelineData = [
  { week: "Week 1", progress: 20, findings: 3 },
  { week: "Week 2", progress: 45, findings: 7 },
  { week: "Week 3", progress: 70, findings: 12 },
  { week: "Week 4", progress: 90, findings: 15 },
  { week: "Week 5", progress: 100, findings: 18 },
]

const departmentScores = [
  { department: "Finance", score: 92 },
  { department: "HR", score: 88 },
  { department: "IT", score: 85 },
  { department: "Operations", score: 90 },
  { department: "Legal", score: 95 },
]

export function AuditDetailModal({ children, auditId }: AuditDetailModalProps) {
  const [open, setOpen] = useState(false)

  // Mock audit data based on ID
  const auditData = {
    id: auditId,
    name:
      auditId === "AUD-001"
        ? "Q4 Financial Audit"
        : auditId === "AUD-002"
          ? "Security Compliance Review"
          : "Operational Efficiency Audit",
    company: auditId === "AUD-001" ? "TechCorp Inc." : auditId === "AUD-002" ? "DataSafe LLC" : "Manufacturing Co.",
    status: auditId === "AUD-001" ? "completed" : auditId === "AUD-002" ? "in-progress" : "pending",
    auditor: auditId === "AUD-001" ? "John Smith" : auditId === "AUD-002" ? "Sarah Johnson" : "Mike Wilson",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    progress: auditId === "AUD-001" ? 100 : auditId === "AUD-002" ? 75 : 25,
    overallScore: auditId === "AUD-001" ? 88 : auditId === "AUD-002" ? 82 : 0,
    totalFindings: auditId === "AUD-001" ? 18 : auditId === "AUD-002" ? 12 : 3,
    criticalIssues: auditId === "AUD-001" ? 2 : auditId === "AUD-002" ? 1 : 0,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {auditData.name}
          </DialogTitle>
          <DialogDescription>Detailed audit report and analytics for {auditData.company}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{auditData.company}</p>
                    <p className="text-xs text-muted-foreground">Company</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{auditData.auditor}</p>
                    <p className="text-xs text-muted-foreground">Lead Auditor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{new Date(auditData.startDate).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(auditData.status)}>{auditData.status.replace("-", " ")}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="compliance" className="text-xs sm:text-sm">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="risks" className="text-xs sm:text-sm">
                Risk Analysis
              </TabsTrigger>
              <TabsTrigger value="timeline" className="text-xs sm:text-sm">
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{auditData.progress}%</span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Progress value={auditData.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{auditData.overallScore}/100</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {auditData.overallScore >= 90
                          ? "Excellent"
                          : auditData.overallScore >= 80
                            ? "Good"
                            : auditData.overallScore >= 70
                              ? "Fair"
                              : "Needs Improvement"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{auditData.criticalIssues}</span>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {auditData.criticalIssues === 0
                          ? "No critical issues"
                          : `${auditData.criticalIssues} critical issue${auditData.criticalIssues > 1 ? "s" : ""} found`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Department Scores</CardTitle>
                  <CardDescription>Performance scores across different departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                    <BarChart data={departmentScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Scores vs Targets</CardTitle>
                  <CardDescription>Current compliance levels compared to target benchmarks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                    <BarChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="hsl(var(--primary))" name="Current Score" />
                      <Bar dataKey="target" fill="hsl(var(--muted))" name="Target Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Distribution</CardTitle>
                    <CardDescription>Breakdown of identified risks by severity level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                      <PieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Summary</CardTitle>
                    <CardDescription>Key risk metrics and indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {riskDistribution.map((risk) => (
                      <div key={risk.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }} />
                          <span className="text-sm font-medium">{risk.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{risk.value}%</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Progress Timeline</CardTitle>
                  <CardDescription>Weekly progress and findings accumulation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                    <AreaChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="progress"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.6}
                      />
                      <Line type="monotone" dataKey="findings" stroke="hsl(var(--destructive))" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={() => setOpen(false)} className="w-full sm:w-auto">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
