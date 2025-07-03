import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Event from "@/models/Event"
import Comment from "@/models/Comment"
import Vote from "@/models/Vote"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get church events
    const events = await Event.find({ createdBy: session.userId })

    // Get engagement metrics for church events
    const eventIds = events.map((event) => event._id)

    const [commentsOnEvents, eventLikes, eventShares] = await Promise.all([
      Comment.countDocuments({
        artwork: { $in: eventIds }, // Assuming events can have comments like artworks
      }),
      Vote.countDocuments({
        targetId: { $in: eventIds },
        voteType: "like",
      }),
      // Mock shares data - would need actual sharing tracking
      Promise.resolve(34),
    ])

    const engagement = {
      commentsOnEvents,
      eventLikes,
      eventShares,
      averageRating: 4.8, // Mock data - would calculate from actual ratings
    }

    return NextResponse.json({ engagement })
  } catch (error) {
    console.error("Get church engagement error:", error)
    return NextResponse.json({ error: "Failed to fetch engagement data" }, { status: 500 })
  }
}
