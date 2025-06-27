import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    console.log("🔐 Registration attempt started")

    const body = await request.json()
    console.log("📝 Registration data received:", {
      name: body.name,
      email: body.email,
      userType: body.userType,
      passwordLength: body.password?.length,
    })

    const { name, email, password, userType, artistInfo, churchInfo, agreements } = body

    // Validation
    if (!name || !email || !password || !userType) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ error: "Name, email, password, and user type are required" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log("❌ Password too short:", password.length)
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    console.log("🔑 Password validation passed. Length:", password.length)
    console.log("🔑 Raw password:", password)

    // Connect to database
    await connectDB()
    console.log("✅ Database connected for registration")

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      console.log("❌ User already exists:", email)
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    console.log("✅ Email is unique, proceeding with registration")

    // Hash password manually to debug
    console.log("🔒 Starting password hashing...")
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log("✅ Password hashed successfully")
    console.log("🔍 Original password:", password)
    console.log("🔍 Hashed password length:", hashedPassword.length)

    // Create user object
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword, // Use manually hashed password
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
      userData.artistInfo = artistInfo
      if (agreements?.artistDisclaimer) {
        userData.agreements = {
          ...userData.agreements,
          artistDisclaimer: true,
          artistDisclaimerDate: new Date(),
        }
      }
      if (agreements?.noAIConfirmation) {
        userData.agreements = {
          ...userData.agreements,
          noAIConfirmation: true,
          noAIConfirmationDate: new Date(),
        }
      }
    }

    if (userType === "church" && churchInfo) {
      userData.churchInfo = churchInfo
    }

    // Add agreements
    if (agreements) {
      userData.agreements = {
        ...userData.agreements,
        termsAccepted: agreements.termsAccepted || false,
        termsAcceptedDate: agreements.termsAccepted ? new Date() : null,
        privacyAccepted: agreements.privacyAccepted || false,
        privacyAcceptedDate: agreements.privacyAccepted ? new Date() : null,
      }
    }

    console.log("👤 Creating user with data:", {
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
      hasPassword: !!userData.password,
      passwordLength: userData.password?.length,
    })

    // Create user (skip pre-save middleware by setting password directly)
    const user = new User(userData)

    // Save without triggering pre-save middleware again
    const savedUser = await user.save()
    console.log("✅ User created successfully:", savedUser.email)

    // Test password immediately after creation
    console.log("🧪 Testing password immediately after creation...")
    const testUser = await User.findById(savedUser._id).select("+password")
    console.log("🔍 Retrieved user has password:", !!testUser.password)
    console.log("🔍 Retrieved password length:", testUser.password?.length)

    const testComparison = await bcrypt.compare(password, testUser.password)
    console.log("🧪 Immediate password test result:", testComparison)

    // Prepare response data (exclude password)
    const responseUser = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      userType: savedUser.userType,
      isVerified: savedUser.isVerified,
      isActive: savedUser.isActive,
      points: savedUser.points,
      membership: savedUser.membership,
    }

    console.log("🎉 Registration completed successfully for:", email)

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: responseUser,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Registration error:", error)
    console.error("❌ Error stack:", error.stack)
    return NextResponse.json(
      {
        error: "Registration failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
