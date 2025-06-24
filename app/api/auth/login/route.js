import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { generateToken } from "@/lib/auth"

export async function POST(request) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Update login tracking
    user.lastLogin = new Date()
    user.loginCount += 1
    user.ipAddress = request.headers.get("x-forwarded-for") || "unknown"
    await user.save()

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      userType: user.userType,
      name: user.name,
    })

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
        points: user.points,
        membership: user.membership,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
