import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AuditService } from "@/lib/services/audit-service"
import { z } from "zod"

const createAuditSchema = z.object({
  auditName: z.string().min(1),
  company: z.string().min(1),
  auditDate: z.string().min(1),
  auditor: z.string().min(1),
  auditType: z.enum(["financial", "operational", "compliance", "security", "quality"]),
  formData: z.any().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let audits
    if (status) {
      audits = await AuditService.getAuditsByStatus(session.user.id, status as any)
    } else {
      audits = await AuditService.getAuditsByUser(session.user.id)
    }

    return NextResponse.json({ audits })
  } catch (error) {
    console.error("Error fetching audits:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createAuditSchema.parse(body)

    const audit = await AuditService.createAudit({
      ...validatedData,
      userId: session.user.id,
    })

    return NextResponse.json({ audit }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error creating audit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
