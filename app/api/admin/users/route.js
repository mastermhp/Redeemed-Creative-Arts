import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const userType = searchParams.get("userType")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    // Build filter
    const filter = {}
    if (userType && userType !== "all") filter.userType = userType
    if (status === "active") filter.isActive = true
    if (status === "inactive") filter.isActive = false
    if (status === "verified") filter.isVerified = true
    if (status === "unverified") filter.isVerified = false
    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    const skip = (page - 1) * limit

    const users = await User.find(filter).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await User.countDocuments(filter)

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Admin users API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { userId, action, data } = await request.json()

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    switch (action) {
      case "activate":
        user.isActive = true
        break
      case "deactivate":
        user.isActive = false
        break
      case "verify":
        user.isVerified = true
        break
      case "unverify":
        user.isVerified = false
        break
      case "updateTier":
        user.membership.tier = data.tier
        break
      case "addPoints":
        user.points.current += data.points
        user.points.total += data.points
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    await user.save()

    return NextResponse.json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isActive: user.isActive,
        isVerified: user.isVerified,
        points: user.points,
        membership: user.membership,
      },
    })
  } catch (error) {
    console.error("Admin user update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
