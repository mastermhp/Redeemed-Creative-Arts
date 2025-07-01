import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { comparePassword, generateToken, isValidEmail } from "@/lib/auth"

export async function POST(request) {
  try {
    console.log("🔐 Login attempt started")

    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Find user by email and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password")

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ error: "Account is inactive. Please contact support." }, { status: 401 })
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Update login tracking
    await user.updateLastLogin()

    // Create JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      userType: user.userType,
      name: user.name,
    })

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

    console.log("✅ Login successful for:", email)

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
        error: "Login failed. Please try again.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
