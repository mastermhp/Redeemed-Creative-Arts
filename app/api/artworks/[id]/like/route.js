import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import Vote from "@/models/Vote"
import User from "@/models/User"
import { withAuth } from "@/lib/middleware"

export const POST = withAuth(async (request, { params }) => {
  try {
    await connectDB()

    const artworkId = params.id
    const userId = request.user.userId

    // Check if artwork exists
    const artwork = await Artwork.findById(artworkId)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user already liked this artwork
    const existingVote = await Vote.findOne({
      voter: userId,
      targetId: artworkId,
      voteType: "like",
    })

    if (existingVote) {
      // Unlike - remove vote
      await Vote.findByIdAndDelete(existingVote._id)
      await Artwork.findByIdAndUpdate(artworkId, {
        $inc: { "engagement.likes": -1 },
      })

      return NextResponse.json({
        message: "Artwork unliked",
        liked: false,
        likes: artwork.engagement.likes - 1,
      })
    } else {
      // Like - create vote
      const vote = new Vote({
        voter: userId,
        targetId: artworkId,
        targetType: "artwork",
        voteType: "like",
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      })

      await vote.save()

      // Update artwork likes count
      const updatedArtwork = await Artwork.findByIdAndUpdate(
        artworkId,
        { $inc: { "engagement.likes": 1 } },
        { new: true },
      )

      // Award points to artwork owner
      const artist = await User.findById(artwork.artist)
      if (artist) {
        const pointsToAward = 5 // Points for receiving a like
        artist.points.current += pointsToAward
        artist.points.total += pointsToAward
        await artist.save()

        // Update artwork points
        await Artwork.findByIdAndUpdate(artworkId, {
          $inc: { "pointsEarned.engagement": pointsToAward, "pointsEarned.total": pointsToAward },
        })
      }

      return NextResponse.json({
        message: "Artwork liked",
        liked: true,
        likes: updatedArtwork.engagement.likes,
      })
    }
  } catch (error) {
    console.error("Like artwork error:", error)
    return NextResponse.json({ error: "Failed to like artwork" }, { status: 500 })
  }
})
