import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import EngagementReward from "@/models/EngagementReward"
import PointTransaction from "@/models/PointTransaction"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    const skip = (page - 1) * limit

    // Get engagement rewards
    const rewards = await EngagementReward.find({ user: session.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Get point transactions (gifts received/sent)
    const transactions = await PointTransaction.find({
      $or: [{ from: session.userId }, { to: session.userId }],
    })
      .populate("from", "name profileImage")
      .populate("to", "name profileImage")
      .sort({ createdAt: -1 })
      .limit(10)

    // Calculate engagement stats
    const stats = await EngagementReward.aggregate([
      { $match: { user: session.userId } },
      {
        $group: {
          _id: "$action",
          count: { $sum: 1 },
          totalPoints: { $sum: "$points" },
        },
      },
    ])

    const total = await EngagementReward.countDocuments({ user: session.userId })

    return NextResponse.json({
      rewards,
      transactions,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get engagement rewards error:", error)
    return NextResponse.json({ error: "Failed to fetch engagement rewards" }, { status: 500 })
  }
}
