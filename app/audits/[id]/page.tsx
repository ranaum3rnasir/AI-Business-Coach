"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuditDetailSections } from "@/components/audit-detail-sections"
import { ArrowLeft, Download, Edit, Share, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { AuditDocument } from "@/lib/models/audit"

export default function AuditDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const auditId = params.id as string

  const [audit, setAudit] = useState<AuditDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.id && auditId) {
      fetchAudit()
    }
  }, [session, auditId])

  const fetchAudit = async () => {
    try {
      const response = await fetch(`/api/audits/${auditId}`)

      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Audit Not Found",
            description: "The requested audit could not be found.",
            variant: "destructive",
          })
          router.push("/audits/previous")
          return
        }
        throw new Error("Failed to fetch audit")
      }

      const data = await response.json()
      setAudit(data.audit)
    } catch (error) {
      console.error("Error fetching audit:", error)
      toast({
        title: "Error",
        description: "Failed to load audit details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading audit details...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!audit) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-6 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold mb-2">Audit Not Found</h2>
              <p className="text-muted-foreground mb-4">The requested audit could not be found.</p>
              <Button onClick={() => router.push("/audits/previous")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Audits
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/audits/previous")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Audits
              </Button>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-balance">{audit.auditName}</h1>
                  <Badge className={getStatusColor(audit.status)}>{audit.status.replace("-", " ").toUpperCase()}</Badge>
                </div>
                <p className="text-muted-foreground">Audit ID: {audit.id}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              {audit.status !== "completed" && (
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Audit
                </Button>
              )}
            </div>
          </div>

          {/* Audit Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Overview</CardTitle>
              <CardDescription>Summary information for this audit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm text-muted-foreground">{audit.company}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Auditor</p>
                  <p className="text-sm text-muted-foreground">{audit.auditor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Audit Date</p>
                  <p className="text-sm text-muted-foreground">{new Date(audit.auditDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Type</p>
                  <Badge variant="secondary">
                    {audit.auditType.charAt(0).toUpperCase() + audit.auditType.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Sections */}
          {audit.formData ? (
            <AuditDetailSections formData={audit.formData} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <h3 className="text-lg font-semibold mb-2">No Detailed Data Available</h3>
                <p className="text-muted-foreground text-center">
                  This audit doesn't have detailed form data available. It may be in draft status or created before the
                  detailed form system was implemented.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
