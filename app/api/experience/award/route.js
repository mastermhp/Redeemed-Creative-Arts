import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function POST(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { points, activity, targetUserId } = await request.json()

    // Validate input
    if (!points || !activity) {
      return NextResponse.json({ error: "Points and activity are required" }, { status: 400 })
    }

    // Determine which user to award points to
    const userId = targetUserId || decoded.userId

    // Find the user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Award experience points
    const awardedPoints = user.awardExperience(points, activity)

    if (awardedPoints === 0) {
      return NextResponse.json(
        {
          error: "Daily limit reached for this activity",
          dailyLimits: user.dailyActivity.dailyLimits,
        },
        { status: 429 },
      )
    }

    // Check for level up
    let levelUpResult = null
    const requiredExp = user.getRequiredExpForLevel(user.experience.level + 1)
    if (user.experience.currentExp >= requiredExp && user.experience.level < 12) {
      levelUpResult = user.levelUp()
    }

    await user.save()

    return NextResponse.json({
      success: true,
      awardedPoints,
      newExperience: user.experience.currentExp,
      currentLevel: user.experience.level,
      levelUp: levelUpResult,
      dailyLimits: user.dailyActivity.dailyLimits,
    })
  } catch (error) {
    console.error("Experience award error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await User.findById(decoded.userId).select("experience dailyActivity")
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate level progress
    const currentLevelExp = user.getRequiredExpForLevel(user.experience.level)
    const nextLevelExp = user.getRequiredExpForLevel(user.experience.level + 1)
    const progressExp = user.experience.currentExp - currentLevelExp
    const requiredExp = nextLevelExp - currentLevelExp

    return NextResponse.json({
      experience: user.experience,
      levelProgress: {
        current: progressExp,
        required: requiredExp,
        percentage: requiredExp > 0 ? Math.floor((progressExp / requiredExp) * 100) : 100,
      },
      dailyLimits: user.dailyActivity.dailyLimits,
    })
  } catch (error) {
    console.error("Experience fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
