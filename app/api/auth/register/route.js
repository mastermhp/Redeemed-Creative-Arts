import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, password, userType, agreements } = body

    // Validation
    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      userType,
      isVerified: false,
      points: {
        current: 50, // Welcome bonus
        total: 50,
        level: "bronze",
      },
      membership: {
        tier: "free",
      },
      agreements: {
        termsAccepted: agreements?.terms || false,
        termsAcceptedDate: agreements?.terms ? new Date() : null,
        artistDisclaimer: agreements?.artistDisclaimer || false,
        artistDisclaimerDate: agreements?.artistDisclaimer ? new Date() : null,
        noAIConfirmation: agreements?.noAI || false,
        noAIConfirmationDate: agreements?.noAI ? new Date() : null,
      },
    })

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || "fallback-secret",
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
    }

    const response = NextResponse.json({
      message: "User registered successfully",
      user: userResponse,
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
