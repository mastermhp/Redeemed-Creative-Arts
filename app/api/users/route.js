import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const userType = searchParams.get("userType")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 50

    const skip = (page - 1) * limit

    // Build query
    const query = {}
    if (userType) {
      query.userType = userType
    }

    const users = await User.find(query)
      .select("name email userType profileImage artistInfo churchInfo patronInfo createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments(query)

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
    console.error("Users API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
