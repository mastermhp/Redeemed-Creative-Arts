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

    const { tier, useTrial } = await request.json()

    // Validate tier
    const validTiers = ["free", "pro", "pro_plus", "tier_1", "tier_2"]
    if (!validTiers.includes(tier)) {
      return NextResponse.json({ error: "Invalid membership tier" }, { status: 400 })
    }

    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if downgrading to free
    if (tier === "free") {
      user.membership.tier = "free"
      user.membership.subscriptionStatus = "inactive"
      user.membership.pointMultiplier = 1
      user.membership.monthlyCoins = 0
      user.membership.subscriptionEndDate = null

      await user.save()

      return NextResponse.json({
        success: true,
        membership: user.membership,
        message: "Downgraded to free tier",
      })
    }

    // Check if user can use trial
    if (useTrial && user.membership.trialUsed) {
      return NextResponse.json({ error: "Trial already used" }, { status: 400 })
    }

    // Set membership details based on tier
    let pointMultiplier = 1
    let monthlyCoins = 0

    switch (tier) {
      case "pro":
      case "tier_1":
        pointMultiplier = 2
        monthlyCoins = 500
        break
      case "pro_plus":
      case "tier_2":
        pointMultiplier = 3
        monthlyCoins = 1000
        break
    }

    // Update membership
    user.membership.tier = tier
    user.membership.subscriptionStatus = useTrial ? "trial" : "active"
    user.membership.pointMultiplier = pointMultiplier
    user.membership.monthlyCoins = monthlyCoins
    user.membership.subscriptionStartDate = new Date()

    if (useTrial) {
      user.membership.trialUsed = true
      user.membership.trialEndDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
      user.membership.subscriptionEndDate = user.membership.trialEndDate
    } else {
      user.membership.subscriptionEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }

    // Update helper badge if applicable
    if (user.isHelper) {
      if (tier === "tier_2" || tier === "pro_plus") {
        user.helperInfo.badge = "gold"
      } else if (tier === "tier_1" || tier === "pro") {
        user.helperInfo.badge = "silver"
      }
    }

    await user.save()

    // TODO: Process actual payment
    // TODO: Create subscription record
    // TODO: Send confirmation email

    return NextResponse.json({
      success: true,
      membership: user.membership,
      message: useTrial ? "Trial started successfully" : "Membership upgraded successfully",
    })
  } catch (error) {
    console.error("Membership upgrade error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
