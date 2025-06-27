import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Contest from "@/models/Contest"
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
    const status = searchParams.get("status")

    const filter = {}
    if (status && status !== "all") filter.status = status

    const skip = (page - 1) * limit

    const contests = await Contest.find(filter)
      .populate("createdBy", "name email")
      .populate("submissions.artistId", "name email")
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
    console.error("Admin contests API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const contestData = await request.json()

    const contest = new Contest({
      ...contestData,
      createdBy: session.userId,
      status: "draft",
    })

    await contest.save()

    return NextResponse.json({
      message: "Contest created successfully",
      contest,
    })
  } catch (error) {
    console.error("Admin contest creation error:", error)
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

    const { contestId, action } = await request.json()

    const contest = await Contest.findById(contestId)
    if (!contest) {
      return NextResponse.json({ error: "Contest not found" }, { status: 404 })
    }

    switch (action) {
      case "activate":
        contest.status = "active"
        break
      case "startVoting":
        contest.status = "voting"
        break
      case "complete":
        contest.status = "completed"
        await contest.determineWinners()
        break
      case "cancel":
        contest.status = "cancelled"
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    await contest.save()

    return NextResponse.json({
      message: "Contest updated successfully",
      contest,
    })
  } catch (error) {
    console.error("Admin contest update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
