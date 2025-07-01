import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function POST(request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    await connectDB()

    // Find user with verification token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 })
    }

    // Verify user
    user.isVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined

    // Award verification bonus points
    user.points.current += 50
    user.points.total += 50

    // Update level based on total points
    if (user.points.total >= 5000) user.points.level = "diamond"
    else if (user.points.total >= 2000) user.points.level = "platinum"
    else if (user.points.total >= 1000) user.points.level = "gold"
    else if (user.points.total >= 500) user.points.level = "silver"
    else user.points.level = "bronze"

    await user.save()

    return NextResponse.json({
      message: "Email verified successfully! You earned 50 bonus points.",
      pointsAwarded: 50,
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 })
  }
}
