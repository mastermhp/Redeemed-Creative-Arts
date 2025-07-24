import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Vote from "@/models/Vote"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET() {
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

    // Get artist's artworks
    const artworks = await Artwork.find({ artist: session.userId })

    // Get votes for artist's artworks
    const artworkIds = artworks.map((artwork) => artwork._id)
    const votes = await Vote.find({
      targetId: { $in: artworkIds },
      targetType: "artwork",
    })
      .populate("userId", "name email profileImage")
      .populate("targetId", "title images")
      .sort({ createdAt: -1 })

    // Get contest votes for artist's submissions
    const contestVotes = await Vote.find({
      artistId: session.userId,
      targetType: "contest",
    })
      .populate("userId", "name email profileImage")
      .populate("contestId", "title")
      .populate("targetId", "title images")
      .sort({ createdAt: -1 })

    // Calculate vote stats
    const totalVotes = votes.length + contestVotes.length
    const artworkVotes = votes.length
    const contestVotesCount = contestVotes.length

    // Monthly votes data
    const monthlyVotes = {}
    ;[...votes, ...contestVotes].forEach((vote) => {
      const month = vote.createdAt.toISOString().slice(0, 7) // YYYY-MM
      monthlyVotes[month] = (monthlyVotes[month] || 0) + 1
    })

    return NextResponse.json({
      votes: [...votes, ...contestVotes].slice(0, 20), // Recent 20 votes
      stats: {
        totalVotes,
        artworkVotes,
        contestVotes: contestVotesCount,
        monthlyVotes,
      },
    })
  } catch (error) {
    console.error("Artist votes API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
