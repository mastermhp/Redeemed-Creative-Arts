import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function POST(request) {
  try {
    await connectDB()

    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    // Find user with verification token
    const user = await User.findOne({ verificationToken: token })
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 })
    }

    // Verify user
    user.isVerified = true
    user.verificationToken = undefined

    // Award verification bonus points
    user.points.current += 50
    user.points.total += 50

    await user.save()

    return NextResponse.json({
      message: "Email verified successfully",
      pointsAwarded: 50,
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
