import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import EngagementReward from "@/models/EngagementReward"
import User from "@/models/User"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20
    const type = searchParams.get("type")
    const claimed = searchParams.get("claimed")

    const query = { user: authResult.user._id }
    if (type) query.type = type
    if (claimed !== null) query.claimed = claimed === "true"

    const skip = (page - 1) * limit

    const rewards = await EngagementReward.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    const totalRewards = await EngagementReward.countDocuments(query)
    const unclaimedRewards = await EngagementReward.countDocuments({
      user: authResult.user._id,
      claimed: false,
    })

    // Calculate total points available to claim
    const unclaimedPoints = await EngagementReward.aggregate([
      { $match: { user: authResult.user._id, claimed: false } },
      { $group: { _id: null, total: { $sum: "$points" } } },
    ])

    return NextResponse.json({
      rewards,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRewards / limit),
        totalRewards,
        hasNextPage: page < Math.ceil(totalRewards / limit),
        hasPrevPage: page > 1,
      },
      summary: {
        unclaimedCount: unclaimedRewards,
        unclaimedPoints: unclaimedPoints[0]?.total || 0,
      },
    })
  } catch (error) {
    console.error("Fetch engagement rewards error:", error)
    return NextResponse.json({ error: "Failed to fetch engagement rewards" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { rewardIds } = await request.json()

    if (!rewardIds || !Array.isArray(rewardIds) || rewardIds.length === 0) {
      return NextResponse.json({ error: "Reward IDs are required" }, { status: 400 })
    }

    // Find unclaimed rewards
    const rewards = await EngagementReward.find({
      _id: { $in: rewardIds },
      user: authResult.user._id,
      claimed: false,
    })

    if (rewards.length === 0) {
      return NextResponse.json({ error: "No valid unclaimed rewards found" }, { status: 404 })
    }

    // Calculate total points
    const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0)

    // Mark rewards as claimed
    await EngagementReward.updateMany(
      { _id: { $in: rewards.map((r) => r._id) } },
      {
        claimed: true,
        claimedAt: new Date(),
      },
    )

    // Add points to user
    await User.findByIdAndUpdate(authResult.user._id, {
      $inc: {
        "points.current": totalPoints,
        "points.total": totalPoints,
      },
    })

    return NextResponse.json({
      message: "Rewards claimed successfully",
      claimedRewards: rewards.length,
      pointsEarned: totalPoints,
    })
  } catch (error) {
    console.error("Claim rewards error:", error)
    return NextResponse.json({ error: "Failed to claim rewards" }, { status: 500 })
  }
}
