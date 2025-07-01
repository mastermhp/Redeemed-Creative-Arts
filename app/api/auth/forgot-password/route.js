import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { sendPasswordResetEmail } from "@/lib/email"
import { isValidEmail } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    await connectDB()

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })

    // Always return success message for security (don't reveal if user exists)
    const successMessage = "If an account with that email exists, a password reset link has been sent."

    if (!user) {
      return NextResponse.json({ message: successMessage })
    }

    if (!user.isActive) {
      return NextResponse.json({ message: successMessage })
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken()
    await user.save()

    // Send reset email
    try {
      await sendPasswordResetEmail(user.email, resetToken, user.name)
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError)
      return NextResponse.json({ error: "Failed to send reset email. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ message: successMessage })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Request failed. Please try again." }, { status: 500 })
  }
}
