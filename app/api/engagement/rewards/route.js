import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import EngagementReward from "@/models/EngagementReward"
import User from "@/models/User"
import { extractTokenFromHeaders, extractTokenFromCookies, getUserFromToken } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    // Get user from token
    const token = extractTokenFromHeaders(request) || extractTokenFromCookies(request)
    const user = await getUserFromToken(token)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const rewards = await EngagementReward.find({ userId: user._id }).sort({ createdAt: -1 }).limit(50)

    return NextResponse.json({
      success: true,
      rewards,
    })
  } catch (error) {
    console.error("Error fetching engagement rewards:", error)
    return NextResponse.json({ error: "Failed to fetch rewards" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    // Get user from token
    const token = extractTokenFromHeaders(request) || extractTokenFromCookies(request)
    const user = await getUserFromToken(token)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { rewardIds } = await request.json()

    if (!rewardIds || !Array.isArray(rewardIds)) {
      return NextResponse.json({ error: "Invalid reward IDs" }, { status: 400 })
    }

    // Find unclaimed rewards
    const rewards = await EngagementReward.find({
      _id: { $in: rewardIds },
      userId: user._id,
      claimed: false,
    })

    if (rewards.length === 0) {
      return NextResponse.json({ error: "No valid rewards to claim" }, { status: 400 })
    }

    // Calculate total points
    const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0)

    // Mark rewards as claimed
    await EngagementReward.updateMany(
      { _id: { $in: rewardIds }, userId: user._id },
      { claimed: true, claimedAt: new Date() },
    )

    // Add points to user
    await User.findByIdAndUpdate(user._id, {
      $inc: { points: totalPoints },
    })

    return NextResponse.json({
      success: true,
      claimedRewards: rewards.length,
      pointsEarned: totalPoints,
    })
  } catch (error) {
    console.error("Error claiming rewards:", error)
    return NextResponse.json({ error: "Failed to claim rewards" }, { status: 500 })
  }
}
