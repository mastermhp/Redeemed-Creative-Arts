import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Update login tracking and award points
    const today = new Date().toDateString()
    const lastLoginDate = user.lastLogin ? user.lastLogin.toDateString() : null

    if (lastLoginDate !== today) {
      user.points.current += 5
      user.points.total += 5

      // Update level based on total points
      if (user.points.total >= 1000) user.points.level = "diamond"
      else if (user.points.total >= 500) user.points.level = "platinum"
      else if (user.points.total >= 250) user.points.level = "gold"
      else if (user.points.total >= 100) user.points.level = "silver"
      else user.points.level = "bronze"
    }

    user.lastLogin = new Date()
    user.loginCount = (user.loginCount || 0) + 1
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userType: user.userType,
        name: user.name,
      },
      process.env.JWT_SECRET || "fallback-secret-key-change-in-production",
      { expiresIn: "7d" },
    )

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      points: user.points,
      membership: user.membership,
      isVerified: user.isVerified,
      artistInfo: user.artistInfo,
      churchInfo: user.churchInfo,
      isHelper: user.isHelper,
    }

    const response = NextResponse.json({
      message: "Login successful",
      user: userResponse,
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
