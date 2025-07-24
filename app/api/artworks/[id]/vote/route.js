import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Vote from "@/models/Vote"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import Notification from "@/models/Notification"

export async function POST(request, { params }) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    const { voteType } = await request.json() // "upvote" or "downvote"

    if (!["upvote", "downvote"].includes(voteType)) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 })
    }

    // Check if artwork exists
    const artwork = await Artwork.findById(params.id).populate("artist", "name")
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user already voted
    const existingVote = await Vote.findOne({
      userId: user._id,
      targetId: params.id,
      targetType: "artwork",
    })

    let pointsAwarded = 0
    let message = ""

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote if same type
        await Vote.findByIdAndDelete(existingVote._id)

        // Update artwork engagement
        const updateField = voteType === "upvote" ? "engagement.likes" : "engagement.dislikes"
        await Artwork.findByIdAndUpdate(params.id, {
          $inc: { [updateField]: -1 },
        })

        message = "Vote removed"
      } else {
        // Change vote type
        existingVote.voteType = voteType
        await existingVote.save()

        // Update artwork engagement
        const incField = voteType === "upvote" ? "engagement.likes" : "engagement.dislikes"
        const decField = voteType === "upvote" ? "engagement.dislikes" : "engagement.likes"

        await Artwork.findByIdAndUpdate(params.id, {
          $inc: {
            [incField]: 1,
            [decField]: -1,
          },
        })

        message = "Vote updated"
      }
    } else {
      // Create new vote
      const newVote = new Vote({
        userId: user._id,
        targetId: params.id,
        targetType: "artwork",
        voteType,
      })
      await newVote.save()

      // Update artwork engagement
      const updateField = voteType === "upvote" ? "engagement.likes" : "engagement.dislikes"
      await Artwork.findByIdAndUpdate(params.id, {
        $inc: { [updateField]: 1 },
      })

      // Award points for engagement
      pointsAwarded = 10
      await User.findByIdAndUpdate(user._id, {
        $inc: {
          "points.current": pointsAwarded,
          "points.total": pointsAwarded,
        },
      })

      // Create notification for artist (only for upvotes)
      if (voteType === "upvote" && artwork.artist.toString() !== user._id.toString()) {
        await Notification.create({
          recipient: artwork.artist,
          type: "artwork_liked",
          title: "Your artwork received a vote!",
          message: `${user.name} ${user.userType === "artist" ? "(Artist)" : ""} voted for your artwork "${artwork.title}"`,
          data: {
            artworkId: artwork._id,
            artworkTitle: artwork.title,
            voterName: user.name,
            voterType: user.userType,
          },
        })
      }

      message = `${voteType === "upvote" ? "Upvoted" : "Downvoted"} successfully`
    }

    // Get updated vote counts
    const voteCounts = await Vote.aggregate([
      { $match: { targetId: artwork._id, targetType: "artwork" } },
      {
        $group: {
          _id: "$voteType",
          count: { $sum: 1 },
        },
      },
    ])

    const upvotes = voteCounts.find((v) => v._id === "upvote")?.count || 0
    const downvotes = voteCounts.find((v) => v._id === "downvote")?.count || 0

    return NextResponse.json({
      message,
      pointsAwarded,
      votes: {
        upvotes,
        downvotes,
        userVote: existingVote?.voteType || null,
      },
    })
  } catch (error) {
    console.error("Vote artwork error:", error)
    return NextResponse.json({ error: "Failed to process vote" }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB()

    // Get vote counts for artwork
    const voteCounts = await Vote.aggregate([
      { $match: { targetId: params.id, targetType: "artwork" } },
      {
        $group: {
          _id: "$voteType",
          count: { $sum: 1 },
        },
      },
    ])

    const upvotes = voteCounts.find((v) => v._id === "upvote")?.count || 0
    const downvotes = voteCounts.find((v) => v._id === "downvote")?.count || 0

    // Check user's vote if authenticated
    let userVote = null
    const authResult = await authenticateRequest(request)
    if (authResult.success) {
      const existingVote = await Vote.findOne({
        userId: authResult.user._id,
        targetId: params.id,
        targetType: "artwork",
      })
      userVote = existingVote?.voteType || null
    }

    return NextResponse.json({
      votes: {
        upvotes,
        downvotes,
        userVote,
      },
    })
  } catch (error) {
    console.error("Get votes error:", error)
    return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 })
  }
}
