import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { hashPassword, isValidEmail, isValidPassword } from "@/lib/auth"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(request) {
  try {
    console.log("🔐 Registration attempt started")

    const body = await request.json()
    const { name, email, password, confirmPassword, userType, artistInfo, churchInfo, agreements } = body

    // Validation
    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "Name, email, password, and user type are required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters with uppercase, lowercase, and number" },
        { status: 400 },
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    if (!["artist", "patron", "church"].includes(userType)) {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user object
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      userType,
      isVerified: false,
      isActive: true,
      points: {
        current: 10,
        total: 10,
        level: "bronze",
      },
      membership: {
        tier: "free",
        subscriptionStatus: "inactive",
      },
    }

    // Add type-specific data
    if (userType === "artist" && artistInfo) {
      userData.artistInfo = {
        specialties: artistInfo.specialties || [],
        experience: artistInfo.experience || "beginner",
        portfolio: [],
        commissionRates: artistInfo.commissionRates || {},
        availability: "available",
      }
    }

    if (userType === "church" && churchInfo) {
      userData.churchInfo = {
        organizationName: churchInfo.organizationName || "",
        denomination: churchInfo.denomination || "",
        size: churchInfo.size || "",
        address: churchInfo.address || {},
        pastor: churchInfo.pastor || "",
        artsMinistryContact: churchInfo.artsMinistryContact || "",
      }
    }

    // Add agreements
    if (agreements) {
      userData.agreements = {
        termsAccepted: agreements.termsAccepted || false,
        termsAcceptedDate: agreements.termsAccepted ? new Date() : null,
        privacyAccepted: agreements.privacyAccepted || false,
        privacyAcceptedDate: agreements.privacyAccepted ? new Date() : null,
        artistDisclaimer: agreements.artistDisclaimer || false,
        artistDisclaimerDate: agreements.artistDisclaimer ? new Date() : null,
        noAIConfirmation: agreements.noAIConfirmation || false,
        noAIConfirmationDate: agreements.noAIConfirmation ? new Date() : null,
      }
    }

    // Create user
    const user = new User(userData)

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken()

    // Save user
    await user.save()

    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken, user.name)
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      // Don't fail registration if email fails
    }

    // Prepare response data (exclude password)
    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      isVerified: user.isVerified,
      isActive: user.isActive,
      points: user.points,
      membership: user.membership,
    }

    console.log("✅ Registration successful for:", user.email)

    return NextResponse.json(
      {
        message: "Registration successful! Please check your email to verify your account.",
        user: responseUser,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Registration error:", error)
    return NextResponse.json(
      {
        error: "Registration failed. Please try again.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
