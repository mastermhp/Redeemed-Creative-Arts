import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { hashPassword, isValidEmail, isValidPassword } from "@/lib/auth"

export async function POST(request) {
  try {
    console.log("🔐 Admin creation attempt started")

    const { name, email, password, adminKey } = await request.json()

    // Check admin key (you should set this in your environment variables)
    if (adminKey !== process.env.ADMIN_CREATION_KEY) {
      return NextResponse.json({ error: "Invalid admin key" }, { status: 403 })
    }

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
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

    // Connect to database
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create admin user
    const adminUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      userType: "admin",
      isVerified: true,
      isActive: true,
      points: {
        current: 1000,
        total: 1000,
        level: "diamond",
      },
      membership: {
        tier: "premium",
        subscriptionStatus: "active",
      },
      agreements: {
        termsAccepted: true,
        termsAcceptedDate: new Date(),
        privacyAccepted: true,
        privacyAcceptedDate: new Date(),
      },
    })

    await adminUser.save()

    console.log("✅ Admin user created successfully:", adminUser.email)

    return NextResponse.json(
      {
        message: "Admin user created successfully",
        user: {
          _id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          userType: adminUser.userType,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Admin creation error:", error)
    return NextResponse.json(
      {
        error: "Admin creation failed",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
