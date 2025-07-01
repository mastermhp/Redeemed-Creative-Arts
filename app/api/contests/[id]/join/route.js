import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Contest from "@/models/Contest"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function POST(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId)
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Artist access required" }, { status: 403 })
    }

    const contestId = params.id
    const contest = await Contest.findById(contestId)
    if (!contest) {
      return NextResponse.json({ error: "Contest not found" }, { status: 404 })
    }

    // Check if contest is active
    if (contest.status !== "active") {
      return NextResponse.json({ error: "Contest is not active" }, { status: 400 })
    }

    // Check if user already joined
    const alreadyJoined = contest.submissions.some((submission) => submission.artist.toString() === session.userId)

    if (alreadyJoined) {
      return NextResponse.json({ error: "Already joined this contest" }, { status: 400 })
    }

    // Add user to contest submissions
    contest.submissions.push({
      artist: session.userId,
      submissionDate: new Date(),
      votes: 0,
    })

    await contest.save()

    // Award points for joining contest
    const pointsEarned = 25
    user.updatePoints(pointsEarned)
    await user.save()

    return NextResponse.json({
      message: "Successfully joined contest!",
      pointsEarned,
      contest: {
        id: contest._id,
        title: contest.title,
        status: contest.status,
      },
    })
  } catch (error) {
    console.error("Join contest error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
