import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AuditService } from "@/lib/services/audit-service"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stats = await AuditService.getAuditStats(session.user.id)

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Error fetching audit stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
