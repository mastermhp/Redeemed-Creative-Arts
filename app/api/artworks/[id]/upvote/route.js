import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { getServerSession } from "@/lib/auth"
import Artwork from "@/models/Artwork"
import User from "@/models/User"

const mongoose = require("mongoose")

export async function POST(request, { params }) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { id: artworkId } = params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(artworkId)) {
      return NextResponse.json({ error: "Invalid artwork ID" }, { status: 400 })
    }

    // Check if user is an artist
    const user = await User.findById(session.userId).select("userType")
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Only artists can upvote artworks" }, { status: 403 })
    }

    // Find the artwork
    const artwork = await Artwork.findById(artworkId)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Prevent self-upvoting
    if (artwork.artist.toString() === session.userId) {
      return NextResponse.json({ error: "Cannot upvote your own artwork" }, { status: 400 })
    }

    // Check if already upvoted
    const hasUpvoted = artwork.artistUpvotes?.includes(session.userId)

    if (hasUpvoted) {
      // Remove upvote
      artwork.artistUpvotes = artwork.artistUpvotes.filter((id) => id.toString() !== session.userId)
      artwork.upvotes = Math.max(0, (artwork.upvotes || 0) - 1)
    } else {
      // Add upvote
      if (!artwork.artistUpvotes) {
        artwork.artistUpvotes = []
      }
      artwork.artistUpvotes.push(session.userId)
      artwork.upvotes = (artwork.upvotes || 0) + 1
    }

    await artwork.save()

    return NextResponse.json({
      message: hasUpvoted ? "Upvote removed" : "Artwork upvoted",
      upvotes: artwork.upvotes,
      hasUpvoted: !hasUpvoted,
    })
  } catch (error) {
    console.error("Upvote artwork error:", error)
    return NextResponse.json({ error: "Failed to upvote artwork" }, { status: 500 })
  }
}
