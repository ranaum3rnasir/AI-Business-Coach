import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AuditService } from "@/lib/services/audit-service"
import { z } from "zod"

const updateAuditSchema = z.object({
  auditName: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  auditDate: z.string().min(1).optional(),
  auditor: z.string().min(1).optional(),
  status: z.enum(["completed", "in-progress", "pending", "draft"]).optional(),
  auditType: z.enum(["financial", "operational", "compliance", "security", "quality"]).optional(),
  formData: z.any().optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const audit = await AuditService.getAuditById(params.id)

    if (!audit) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 })
    }

    // Check if user owns this audit
    if (audit.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ audit })
  } catch (error) {
    console.error("Error fetching audit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if audit exists and user owns it
    const existingAudit = await AuditService.getAuditById(params.id)
    if (!existingAudit || existingAudit.userId !== session.user.id) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = updateAuditSchema.parse(body)

    const updatedAudit = await AuditService.updateAudit(params.id, {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ audit: updatedAudit })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error updating audit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if audit exists and user owns it
    const existingAudit = await AuditService.getAuditById(params.id)
    if (!existingAudit || existingAudit.userId !== session.user.id) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 })
    }

    const deleted = await AuditService.deleteAudit(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete audit" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting audit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
