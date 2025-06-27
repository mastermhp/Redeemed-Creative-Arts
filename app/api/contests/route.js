import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Contest from "@/models/Contest"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")

    const filter = {}
    if (status && status !== "all") filter.status = status
    if (featured === "true") filter.featured = true

    const skip = (page - 1) * limit

    const contests = await Contest.find(filter)
      .populate("createdBy", "name email")
      .populate("submissions.artistId", "name email profileImage")
      .populate("submissions.artworkId", "title images")
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

    const { contestId, artworkId, action } = await request.json()

    if (action === "submit") {
      const contest = await Contest.findById(contestId)
      if (!contest) {
        return NextResponse.json({ error: "Contest not found" }, { status: 404 })
      }

      if (contest.status !== "active") {
        return NextResponse.json({ error: "Contest is not accepting submissions" }, { status: 400 })
      }

      // Check if user already submitted max entries
      const userSubmissions = contest.submissions.filter((sub) => sub.artistId.toString() === session.userId)

      if (userSubmissions.length >= contest.maxSubmissions) {
        return NextResponse.json(
          {
            error: `Maximum ${contest.maxSubmissions} submissions allowed`,
          },
          { status: 400 },
        )
      }

      // Add submission
      await contest.addSubmission(session.userId, artworkId)

      return NextResponse.json({
        message: "Artwork submitted to contest successfully",
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Contest submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
