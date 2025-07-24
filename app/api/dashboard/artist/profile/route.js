import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import User from "@/models/User"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function PUT(request) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Only artists can update their profile" }, { status: 403 })
    }

    const formData = await request.formData()
    const name = formData.get("name")
    const bio = formData.get("bio")
    const location = JSON.parse(formData.get("location") || "{}")
    const socialLinks = JSON.parse(formData.get("socialLinks") || "{}")
    const profileImage = formData.get("profileImage")
    const coverImage = formData.get("coverImage")

    const updateData = {
      name,
      bio,
      location,
      socialLinks,
    }

    // Upload profile image to Cloudinary if provided
    if (profileImage && profileImage.size > 0) {
      try {
        const bytes = await profileImage.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "redeemed-creative-arts/profiles",
                transformation: [
                  { width: 400, height: 400, crop: "fill", gravity: "face" },
                  { quality: "auto", fetch_format: "auto" },
                ],
              },
              (error, result) => {
                if (error) reject(error)
                else resolve(result)
              },
            )
            .end(buffer)
        })

        updateData.profileImage = uploadResult.secure_url
      } catch (error) {
        console.error("Profile image upload error:", error)
        return NextResponse.json({ error: "Failed to upload profile image" }, { status: 500 })
      }
    }

    // Upload cover image to Cloudinary if provided
    if (coverImage && coverImage.size > 0) {
      try {
        const bytes = await coverImage.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "redeemed-creative-arts/covers",
                transformation: [
                  { width: 1200, height: 400, crop: "fill" },
                  { quality: "auto", fetch_format: "auto" },
                ],
              },
              (error, result) => {
                if (error) reject(error)
                else resolve(result)
              },
            )
            .end(buffer)
        })

        updateData.coverImage = uploadResult.secure_url
      } catch (error) {
        console.error("Cover image upload error:", error)
        return NextResponse.json({ error: "Failed to upload cover image" }, { status: 500 })
      }
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password -refreshToken")

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Only artists can access this endpoint" }, { status: 403 })
    }

    const artistProfile = await User.findById(user._id).select("-password -refreshToken").lean()

    if (!artistProfile) {
      return NextResponse.json({ error: "Artist profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      profile: artistProfile,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
