import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, password, userType, isHelper, ...additionalData } = body

    // Validate required fields
    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Create new user
    const userData = {
      name,
      email: email.toLowerCase(),
      password,
      userType,
      isHelper: isHelper || false,
      agreements: {
        termsAccepted: true,
        termsAcceptedDate: new Date(),
      },
    }

    // Add user-type specific data
    if (userType === "church" && additionalData.organizationName) {
      userData.churchInfo = {
        organizationName: additionalData.organizationName,
        denomination: additionalData.denomination,
        size: additionalData.size,
        address: additionalData.address,
        pastor: additionalData.pastor,
        artsMinistryContact: additionalData.artsMinistryContact,
      }
    }

    if (userType === "artist" && additionalData.specialties) {
      userData.artistInfo = {
        specialties: additionalData.specialties,
        experience: additionalData.experience,
        portfolio: [],
        availability: "available",
      }
    }

    const user = new User(userData)

    // Generate verification token
    const verificationToken = user.generateVerificationToken()

    await user.save()

    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken, user.name)
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      // Don't fail registration if email fails
    }

    // Award initial points
    user.points.current = 100 // Welcome bonus
    user.points.total = 100
    await user.save()

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          isVerified: user.isVerified,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
