import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import Vote from "@/models/Vote"
import User from "@/models/User"
import Notification from "@/models/Notification"
import { getServerSession } from "@/lib/auth"

export async function POST(request, { params }) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const artworkId = params.id

    const artwork = await Artwork.findById(artworkId).populate("artist")
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user already liked this artwork
    const existingVote = await Vote.findOne({
      voter: session.userId,
      targetId: artworkId,
      voteType: "like",
    })

    let liked = false
    let message = ""

    if (existingVote) {
      // Unlike
      await Vote.deleteOne({ _id: existingVote._id })
      await artwork.toggleLike(false)
      message = "Artwork unliked"
    } else {
      // Like
      const vote = new Vote({
        voter: session.userId,
        targetType: "artwork",
        targetId: artworkId,
        voteType: "like",
      })
      await vote.save()
      await artwork.toggleLike(true)
      liked = true
      message = "Artwork liked"

      // Award points to voter
      const voter = await User.findById(session.userId)
      if (voter) {
        voter.points.current += 1
        voter.points.total += 1
        await voter.save()
      }

      // Award points to artist
      const artist = await User.findById(artwork.artist._id)
      if (artist) {
        artist.points.current += 2
        artist.points.total += 2
        await artist.save()
      }

      // Create notification for artist (if not self-like)
      if (session.userId !== artwork.artist._id.toString()) {
        const notification = new Notification({
          recipient: artwork.artist._id,
          type: "artwork_liked",
          title: "Your artwork was liked!",
          message: `Someone liked your artwork "${artwork.title}"`,
          relatedUser: session.userId,
          relatedArtwork: artworkId,
          priority: "low",
        })
        await notification.save()
      }
    }

    return NextResponse.json({
      message,
      liked,
      likes: artwork.engagement.likes,
    })
  } catch (error) {
    console.error("Artwork like error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
