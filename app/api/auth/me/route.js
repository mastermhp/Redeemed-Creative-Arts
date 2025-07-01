import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { extractTokenFromHeaders, extractTokenFromCookies, getUserFromToken } from "@/lib/auth"

export async function GET(request) {
  try {
    // Try to get token from Authorization header first, then from cookies
    let token = extractTokenFromHeaders(request)
    if (!token) {
      token = extractTokenFromCookies(request)
    }

    if (!token) {
      return NextResponse.json({ error: "No authentication token provided" }, { status: 401 })
    }

    // Get user info from token
    const tokenUser = await getUserFromToken(token)
    if (!tokenUser) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    // Connect to database and get fresh user data
    await connectDB()
    const user = await User.findById(tokenUser.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is inactive" }, { status: 401 })
    }

    // Return user data (exclude password)
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

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}
