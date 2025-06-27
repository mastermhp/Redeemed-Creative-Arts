import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Contest from "@/models/Contest"
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
    const userId = searchParams.get("userId") || session.userId

    // Verify user is an artist or admin
    const user = await User.findById(userId)
    if (!user || (user.userType !== "artist" && session.userType !== "admin")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get active contests
    const contests = await Contest.find({
      status: "active",
      endDate: { $gt: new Date() },
    })
      .populate("organizer", "name email")
      .sort({ endDate: 1 })

    // Transform contests for frontend
    const transformedContests = contests.map((contest) => ({
      id: contest._id,
      title: contest.title,
      deadline: contest.endDate.toISOString().split("T")[0],
      prize: contest.prizes?.[0]?.value ? `$${contest.prizes[0].value}` : "TBD",
      participants: contest.submissions?.length || 0,
      status: contest.status,
      submitted: contest.submissions?.some((sub) => sub.artist.toString() === userId) || false,
      description: contest.description,
      requirements: contest.rules || [],
    }))

    return NextResponse.json({
      contests: transformedContests,
    })
  } catch (error) {
    console.error("Artist contests API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
