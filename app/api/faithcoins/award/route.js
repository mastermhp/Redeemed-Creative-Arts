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

    const { amount, reason, targetUserId } = await request.json()

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 })
    }

    if (!reason) {
      return NextResponse.json({ error: "Reason is required" }, { status: 400 })
    }

    // Determine which user to award coins to
    const userId = targetUserId || decoded.userId

    // Find the user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Award FaithCoins
    const awardedAmount = user.awardFaithCoins(amount, reason)

    await user.save()

    return NextResponse.json({
      success: true,
      awardedAmount,
      newBalance: user.faithCoins.current,
      totalEarned: user.faithCoins.totalEarned,
      reason,
    })
  } catch (error) {
    console.error("FaithCoins award error:", error)
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

    const user = await User.findById(decoded.userId).select("faithCoins membership")
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if monthly coins need to be awarded
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    if (user.faithCoins.lastMonthlyReset < monthStart && user.membership.monthlyCoins > 0) {
      user.awardFaithCoins(user.membership.monthlyCoins, "monthly_membership_bonus")
      await user.save()
    }

    return NextResponse.json({
      faithCoins: user.faithCoins,
      membership: {
        tier: user.membership.tier,
        monthlyCoins: user.membership.monthlyCoins,
      },
    })
  } catch (error) {
    console.error("FaithCoins fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
