import { NextResponse } from "next/request"
import connectDB from "@/lib/database"
import Contest from "@/models/Contest"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    // Build query
    const query = {}
    if (status) {
      query.status = status
    }

    const contests = await Contest.find(query)
      .populate("createdBy", "name email")
      .populate("submissions.artistId", "name email profile.portfolio")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Contest.countDocuments(query)

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
    console.error("Contests fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch contests" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId)

    if (!user || (user.role !== "admin" && user.role !== "church")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const contestData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "description", "startDate", "endDate", "votingEndDate"]
    for (const field of requiredFields) {
      if (!contestData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Validate dates
    const startDate = new Date(contestData.startDate)
    const endDate = new Date(contestData.endDate)
    const votingEndDate = new Date(contestData.votingEndDate)

    if (startDate >= endDate) {
      return NextResponse.json({ error: "End date must be after start date" }, { status: 400 })
    }

    if (endDate >= votingEndDate) {
      return NextResponse.json({ error: "Voting end date must be after submission end date" }, { status: 400 })
    }

    const contest = new Contest({
      ...contestData,
      createdBy: user._id,
      status: "active",
    })

    await contest.save()

    // Populate creator info for response
    await contest.populate("createdBy", "name email")

    return NextResponse.json(contest, { status: 201 })
  } catch (error) {
    console.error("Contest creation error:", error)
    return NextResponse.json({ error: "Failed to create contest" }, { status: 500 })
  }
}
