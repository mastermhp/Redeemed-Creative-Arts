import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function POST(request) {
  try {
    console.log("🔐 Login attempt started")

    const { email, password } = await request.json()

    if (!email || !password) {
      console.log("❌ Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("📧 Login attempt for email:", email)
    console.log("🔑 Password provided:", password)
    console.log("🔑 Password length:", password.length)

    // Connect to database
    await connectDB()
    console.log("✅ Database connected for login")

    // Find user by email and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password")

    if (!user) {
      console.log("❌ User not found:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("👤 User found:", user.email, "Type:", user.userType)
    console.log("🔍 User has password hash:", !!user.password)
    console.log("🔍 Stored password hash:", user.password)
    console.log("🔍 Stored password hash length:", user.password?.length)

    // Check if user is active
    if (!user.isActive) {
      console.log("❌ User account is inactive")
      return NextResponse.json({ error: "Account is inactive. Please contact support." }, { status: 401 })
    }

    // Compare password directly with bcrypt
    console.log("🔍 Comparing passwords...")
    console.log("🔍 Input password:", password)
    console.log("🔍 Stored hash:", user.password)

    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log("🔍 Password comparison result:", isPasswordValid)

    if (!isPasswordValid) {
      console.log("❌ Invalid password for user:", email)
      console.log("❌ Tried password:", password)
      console.log("❌ Against hash:", user.password)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("✅ Password validated successfully")

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

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userType: user.userType,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Prepare user data (exclude password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      isVerified: user.isVerified,
      isActive: user.isActive,
      points: user.points,
      membership: user.membership,
      bio: user.bio,
      location: user.location,
      artistInfo: user.artistInfo,
      churchInfo: user.churchInfo,
      isHelper: user.isHelper,
      helperInfo: user.helperInfo,
      profileImage: user.profileImage,
      socialLinks: user.socialLinks,
    }

    console.log("🎉 Login successful for:", email)

    // Create response with token in cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: userData,
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
    console.error("❌ Login error:", error)
    return NextResponse.json(
      {
        error: "Login failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
