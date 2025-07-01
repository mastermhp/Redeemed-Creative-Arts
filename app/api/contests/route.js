import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Contest from "@/models/Contest"
import User from "@/models/User" // Import User model
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10

    const filter = {}
    if (status && status !== "all") {
      filter.status = status
    }

    const skip = (page - 1) * limit

    const contests = await Contest.find(filter)
      .populate("organizer", "name email")
      .populate("submissions.artist", "name email profileImage")
      .populate("submissions.artwork", "title images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Contest.countDocuments(filter)

    return NextResponse.json({
      contests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Contests API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId) // Declare User variable
    if (!user || (user.userType !== "admin" && user.userType !== "church")) {
      return NextResponse.json({ error: "Admin or Church access required" }, { status: 403 })
    }

    const data = await request.json()

    const contest = new Contest({
      ...data,
      organizer: session.userId,
      status: "upcoming",
    })

    await contest.save()

    return NextResponse.json({
      message: "Contest created successfully",
      contest,
    })
  } catch (error) {
    console.error("Create contest error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
