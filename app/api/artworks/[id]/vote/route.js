import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Vote from "@/models/Vote"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import EngagementReward from "@/models/EngagementReward"
import { getServerSession } from "@/lib/auth"

export async function POST(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const artworkId = params.id
    const { voteType = "like" } = await request.json()

    // Check if artwork exists
    const artwork = await Artwork.findById(artworkId)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user already voted
    const existingVote = await Vote.findOne({
      voter: session.userId,
      targetId: artworkId,
      voteType,
    })

    if (existingVote) {
      // Remove vote (unlike)
      await Vote.deleteOne({ _id: existingVote._id })

      return NextResponse.json({
        message: "Vote removed",
        voted: false,
      })
    } else {
      // Add vote (like)
      const vote = new Vote({
        voter: session.userId,
        targetType: "artwork",
        targetId: artworkId,
        voteType,
      })

      await vote.save()

      // Award engagement points
      const engagementReward = new EngagementReward({
        user: session.userId,
        action: "vote",
        points: 5,
        relatedEntity: {
          entityType: "artwork",
          entityId: artworkId,
        },
        description: "Voted on artwork",
      })

      await engagementReward.save()

      // Update user points
      await User.findByIdAndUpdate(session.userId, {
        $inc: {
          "points.current": 5,
          "points.total": 5,
        },
      })

      return NextResponse.json({
        message: "Vote added",
        voted: true,
      })
    }
  } catch (error) {
    console.error("Vote artwork error:", error)
    return NextResponse.json({ error: "Failed to vote on artwork" }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  try {
    const session = await getServerSession()
    await connectDB()

    const artworkId = params.id

    // Get vote count
    const voteCount = await Vote.countDocuments({
      targetId: artworkId,
      voteType: "like",
    })

    // Check if current user voted (if logged in)
    let userVoted = false
    if (session) {
      const userVote = await Vote.findOne({
        voter: session.userId,
        targetId: artworkId,
        voteType: "like",
      })
      userVoted = !!userVote
    }

    return NextResponse.json({
      voteCount,
      userVoted,
    })
  } catch (error) {
    console.error("Get artwork votes error:", error)
    return NextResponse.json({ error: "Failed to get votes" }, { status: 500 })
  }
}
