import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function POST(request) {
  try {
    const { email, password, name, secretKey } = await request.json()

    // Check secret key for security
    if (secretKey !== "CREATE_ADMIN_SECRET_2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    await connectDB()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: email.toLowerCase() })
    if (existingAdmin) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create admin user
    const admin = new User({
      name,
      email: email.toLowerCase(),
      password,
      userType: "admin",
      isVerified: true,
      isActive: true,
      points: {
        current: 10000,
        total: 10000,
        level: "diamond",
      },
      membership: {
        tier: "diamond",
        subscriptionStatus: "active",
      },
      agreements: {
        termsAccepted: true,
        termsAcceptedDate: new Date(),
      },
    })

    await admin.save()

    return NextResponse.json({
      message: "Admin user created successfully",
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        userType: admin.userType,
      },
    })
  } catch (error) {
    console.error("Create admin error:", error)
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 })
  }
}
