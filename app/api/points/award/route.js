import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

// Points configuration
const POINTS_CONFIG = {
  LOGIN: 5,
  VOTE: 10,
  DONATION: 20,
  SHARE: 15,
  PURCHASE: 25,
  CONTEST_SUBMISSION: 30,
  CONTEST_WIN: 100,
  HELPER_JOB: 50,
  REFERRAL: 25,
}

// Level thresholds
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 17000]

// Tier thresholds
const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 500,
  gold: 2000,
  platinum: 5000,
  diamond: 10000,
}

function calculateLevel(points) {
  let level = 1
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= LEVEL_THRESHOLDS[i]) {
      level = i + 1
      break
    }
  }
  return level
}

function calculateTier(points) {
  if (points >= TIER_THRESHOLDS.diamond) return "diamond"
  if (points >= TIER_THRESHOLDS.platinum) return "platinum"
  if (points >= TIER_THRESHOLDS.gold) return "gold"
  if (points >= TIER_THRESHOLDS.silver) return "silver"
  return "bronze"
}

export async function POST(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    const { action, userId, customPoints, metadata } = await request.json()

    // Use provided userId or default to token user
    const targetUserId = userId || decoded.userId

    const user = await User.findById(targetUserId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate points to award
    const pointsToAward = customPoints || POINTS_CONFIG[action?.toUpperCase()] || 0

    if (pointsToAward <= 0) {
      return NextResponse.json({ error: "Invalid points amount" }, { status: 400 })
    }

    // Check for daily limits on certain actions
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (action === "LOGIN") {
      // Only award login points once per day
      const lastLogin = user.lastLoginPoints || new Date(0)
      if (lastLogin >= today) {
        return NextResponse.json({
          message: "Login points already awarded today",
          points: user.points,
        })
      }
      user.lastLoginPoints = new Date()
    }

    // Store previous values for comparison
    const previousPoints = user.points
    const previousLevel = user.level
    const previousTier = user.tier

    // Award points
    user.points += pointsToAward
    user.totalPointsEarned = (user.totalPointsEarned || 0) + pointsToAward

    // Update level and tier
    const newLevel = calculateLevel(user.points)
    const newTier = calculateTier(user.points)

    user.level = newLevel
    user.tier = newTier

    // Track point history
    if (!user.pointsHistory) {
      user.pointsHistory = []
    }

    user.pointsHistory.push({
      action: action || "CUSTOM",
      points: pointsToAward,
      timestamp: new Date(),
      metadata: metadata || {},
    })

    // Keep only last 100 entries
    if (user.pointsHistory.length > 100) {
      user.pointsHistory = user.pointsHistory.slice(-100)
    }

    await user.save()

    // Prepare response with level/tier changes
    const response = {
      success: true,
      pointsAwarded: pointsToAward,
      totalPoints: user.points,
      level: user.level,
      tier: user.tier,
      levelUp: newLevel > previousLevel,
      tierUp: newTier !== previousTier && TIER_THRESHOLDS[newTier] > TIER_THRESHOLDS[previousTier],
    }

    // Add achievement notifications
    if (response.levelUp) {
      response.levelUpMessage = `Congratulations! You've reached Level ${newLevel}!`
    }

    if (response.tierUp) {
      response.tierUpMessage = `Amazing! You've been promoted to ${newTier.charAt(0).toUpperCase() + newTier.slice(1)} tier!`
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Points award error:", error)
    return NextResponse.json({ error: "Failed to award points" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId).select("points level tier totalPointsEarned pointsHistory")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate next level requirements
    const currentLevel = user.level
    const nextLevelThreshold = LEVEL_THRESHOLDS[currentLevel] || null
    const pointsToNextLevel = nextLevelThreshold ? nextLevelThreshold - user.points : 0

    // Calculate next tier requirements
    const currentTier = user.tier
    const tierNames = Object.keys(TIER_THRESHOLDS)
    const currentTierIndex = tierNames.indexOf(currentTier)
    const nextTier = currentTierIndex < tierNames.length - 1 ? tierNames[currentTierIndex + 1] : null
    const pointsToNextTier = nextTier ? TIER_THRESHOLDS[nextTier] - user.points : 0

    return NextResponse.json({
      points: user.points,
      level: user.level,
      tier: user.tier,
      totalPointsEarned: user.totalPointsEarned || 0,
      nextLevel: currentLevel + 1,
      pointsToNextLevel: Math.max(0, pointsToNextLevel),
      nextTier,
      pointsToNextTier: Math.max(0, pointsToNextTier),
      recentActivity: user.pointsHistory?.slice(-10) || [],
      availableActions: POINTS_CONFIG,
    })
  } catch (error) {
    console.error("Points fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch points data" }, { status: 500 })
  }
}
