import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { action, userIds, data } = body

    if (!action || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    let result

    switch (action) {
      case "delete":
        result = await User.deleteMany({ _id: { $in: userIds } })
        break

      case "ban":
        result = await User.updateMany(
          { _id: { $in: userIds } },
          {
            isBanned: true,
            isActive: false,
            banReason: data?.banReason || "Bulk ban action",
            updatedAt: new Date(),
          },
        )
        break

      case "unban":
        result = await User.updateMany(
          { _id: { $in: userIds } },
          {
            isBanned: false,
            isActive: true,
            banReason: null,
            updatedAt: new Date(),
          },
        )
        break

      case "activate":
        result = await User.updateMany(
          { _id: { $in: userIds } },
          {
            isActive: true,
            updatedAt: new Date(),
          },
        )
        break

      case "deactivate":
        result = await User.updateMany(
          { _id: { $in: userIds } },
          {
            isActive: false,
            updatedAt: new Date(),
          },
        )
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      message: `Bulk ${action} completed successfully`,
      affected: result.modifiedCount || result.deletedCount,
    })
  } catch (error) {
    console.error("Error performing bulk action:", error)
    return NextResponse.json({ error: "Failed to perform bulk action" }, { status: 500 })
  }
}
