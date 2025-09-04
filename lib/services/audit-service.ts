import { getDatabase } from "@/lib/mongodb"
import type { AuditDocument, CreateAuditData, UpdateAuditData } from "@/lib/models/audit"

const COLLECTION_NAME = "audits"

export class AuditService {
  static async createAudit(data: CreateAuditData): Promise<AuditDocument> {
    const db = await getDatabase()
    const collection = db.collection<AuditDocument>(COLLECTION_NAME)

    const auditId = `AUD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    const now = new Date().toISOString()

    const auditDocument: Omit<AuditDocument, "_id"> = {
      id: auditId,
      auditName: data.auditName,
      company: data.company,
      auditDate: data.auditDate,
      auditor: data.auditor,
      auditType: data.auditType,
      status: data.formData ? "completed" : "draft",
      userId: data.userId,
      formData: data.formData,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(auditDocument)

    return {
      ...auditDocument,
      _id: result.insertedId,
    }
  }

  static async getAuditById(id: string): Promise<AuditDocument | null> {
    const db = await getDatabase()
    const collection = db.collection<AuditDocument>(COLLECTION_NAME)

    return await collection.findOne({ id })
  }

  static async getAuditsByUser(userId: string): Promise<AuditDocument[]> {
    const db = await getDatabase()
    const collection = db.collection<AuditDocument>(COLLECTION_NAME)

    return await collection.find({ userId }).sort({ updatedAt: -1 }).toArray()
  }

  static async updateAudit(id: string, data: UpdateAuditData): Promise<AuditDocument | null> {
    const db = await getDatabase()
    const collection = db.collection<AuditDocument>(COLLECTION_NAME)

    const result = await collection.findOneAndUpdate({ id }, { $set: data }, { returnDocument: "after" })

    return result
  }

  static async deleteAudit(id: string): Promise<boolean> {
    const db = await getDatabase()
    const collection = db.collection<AuditDocument>(COLLECTION_NAME)

    const result = await collection.deleteOne({ id })
    return result.deletedCount > 0
  }

  static async getAuditsByStatus(userId: string, status: AuditDocument["status"]): Promise<AuditDocument[]> {
    const db = await getDatabase()
    const collection = db.collection<AuditDocument>(COLLECTION_NAME)

    return await collection.find({ userId, status }).sort({ updatedAt: -1 }).toArray()
  }

  static async getAuditStats(userId: string): Promise<{
    total: number
    completed: number
    inProgress: number
    pending: number
    draft: number
  }> {
    const db = await getDatabase()
    const collection = db.collection<AuditDocument>(COLLECTION_NAME)

    const pipeline = [
      { $match: { userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]

    const results = await collection.aggregate(pipeline).toArray()

    const stats = {
      total: 0,
      completed: 0,
      inProgress: 0,
      pending: 0,
      draft: 0,
    }

    results.forEach((result) => {
      const status = result._id as keyof typeof stats
      if (status === "in-progress") {
        stats.inProgress = result.count
      } else if (stats.hasOwnProperty(status)) {
        stats[status as keyof typeof stats] = result.count
      }
      stats.total += result.count
    })

    return stats
  }
}
