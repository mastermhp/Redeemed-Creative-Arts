import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    await connectDB()

    const user = await User.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    return NextResponse.json({
      user: {
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
      },
    })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
