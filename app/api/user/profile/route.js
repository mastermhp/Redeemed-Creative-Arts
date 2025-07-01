import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import { verifyAuth } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = authResult.user

    // Return user profile data
    const profile = {
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      bio: user.bio,
      profileImage: user.profileImage,
      isHelper: user.isHelper,
      membership: user.membership,
      points: user.points,
      agreements: user.agreements,
      helperInfo: user.helperInfo,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await connectDB()

    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = authResult.user
    const updateData = await request.json()

    // Allowed fields to update
    const allowedFields = ["name", "bio", "profileImage"]
    const filteredData = {}

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field]
      }
    }

    // Update user
    Object.assign(user, filteredData)
    await user.save()

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
