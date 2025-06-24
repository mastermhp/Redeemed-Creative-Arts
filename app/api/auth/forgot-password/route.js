import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(request) {
  try {
    await connectDB()

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      // Don't reveal if user exists or not
      return NextResponse.json({
        message: "If an account with that email exists, a password reset link has been sent.",
      })
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken()
    await user.save()

    // Send reset email
    try {
      await sendPasswordResetEmail(user.email, resetToken, user.name)
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError)
      return NextResponse.json({ error: "Failed to send reset email" }, { status: 500 })
    }

    return NextResponse.json({
      message: "If an account with that email exists, a password reset link has been sent.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Request failed" }, { status: 500 })
  }
}
