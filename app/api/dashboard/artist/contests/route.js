import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Contest from "@/models/Contest"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    // Get active contests
    const contests = await Contest.find({
      status: "active",
      endDate: { $gte: new Date() },
    })
      .select("title description theme prize endDate participantCount status")
      .sort({ createdAt: -1 })
      .lean()

    // Check if user has entered each contest
    const contestsWithStatus = contests.map((contest) => ({
      id: contest._id,
      title: contest.title,
      description: contest.description,
      theme: contest.theme,
      prize: contest.prize,
      endDate: contest.endDate,
      participantCount: contest.participantCount || 0,
      status: contest.status,
      hasEntered: contest.participants?.includes(user._id) || false,
    }))

    return NextResponse.json({ contests: contestsWithStatus })
  } catch (error) {
    console.error("Fetch contests error:", error)
    return NextResponse.json({ error: "Failed to fetch contests" }, { status: 500 })
  }
}
