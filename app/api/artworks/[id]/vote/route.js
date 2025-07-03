import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Artwork from "@/models/Artwork"
import Vote from "@/models/Vote"
import User from "@/models/User"
import Notification from "@/models/Notification"

export async function POST(request, { params }) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const artworkId = params.id
    const { rating } = await request.json()

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Check if artwork exists
    const artwork = await Artwork.findById(artworkId).populate("artist", "name")
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user already voted
    const existingVote = await Vote.findOne({
      user: authResult.user._id,
      artwork: artworkId,
    })

    if (existingVote) {
      // Update existing vote
      existingVote.rating = rating
      await existingVote.save()

      return NextResponse.json({
        message: "Vote updated successfully",
        vote: {
          rating: existingVote.rating,
          createdAt: existingVote.createdAt,
          updatedAt: existingVote.updatedAt,
        },
      })
    } else {
      // Create new vote
      const vote = new Vote({
        user: authResult.user._id,
        artwork: artworkId,
        rating,
      })

      await vote.save()

      // Update artwork rating
      const votes = await Vote.find({ artwork: artworkId })
      const averageRating = votes.reduce((sum, v) => sum + v.rating, 0) / votes.length

      await Artwork.findByIdAndUpdate(artworkId, {
        "engagement.rating": averageRating,
        "engagement.votes": votes.length,
      })

      // Award points to voter
      await User.findByIdAndUpdate(authResult.user._id, {
        $inc: {
          "points.current": 1,
          "points.total": 1,
        },
      })

      // Create notification for artist (if not voting on own artwork)
      if (artwork.artist._id.toString() !== authResult.user._id.toString()) {
        await Notification.create({
          recipient: artwork.artist._id,
          type: "artwork_rated",
          title: "Artwork Rated",
          message: `${authResult.user.name} rated your artwork "${artwork.title}" ${rating} stars`,
          data: {
            artworkId: artwork._id,
            rating,
            voterName: authResult.user.name,
          },
        })
      }

      return NextResponse.json(
        {
          message: "Vote submitted successfully",
          vote: {
            rating: vote.rating,
            createdAt: vote.createdAt,
          },
        },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error("Vote artwork error:", error)
    return NextResponse.json({ error: "Failed to submit vote" }, { status: 500 })
  }
}
