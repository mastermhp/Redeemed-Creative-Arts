import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Vote from "@/models/Vote"
import Artwork from "@/models/Artwork"

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

    // Get all artworks by this artist
    const artworks = await Artwork.find({ artist: user._id }).select("_id title")
    const artworkIds = artworks.map((a) => a._id)

    // Get votes on artist's artworks
    const votes = await Vote.find({
      targetId: { $in: artworkIds },
      targetType: "artwork",
    })
      .populate("userId", "name email profileImage userType")
      .populate("targetId", "title images")
      .sort({ createdAt: -1 })
      .lean()

    // Get vote statistics
    const voteStats = await Vote.aggregate([
      {
        $match: {
          targetId: { $in: artworkIds },
          targetType: "artwork",
        },
      },
      {
        $group: {
          _id: "$targetId",
          upvotes: { $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] } },
          downvotes: { $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] } },
          totalVotes: { $sum: 1 },
        },
      },
    ])

    // Get votes from other artists (for artist choice awards)
    const artistVotes = await Vote.find({
      targetId: { $in: artworkIds },
      targetType: "artwork",
    })
      .populate("userId", "name email profileImage userType")
      .populate("targetId", "title images")
      .match({ "userId.userType": "artist" })
      .sort({ createdAt: -1 })
      .lean()

    const formattedVotes = votes.map((vote) => ({
      id: vote._id,
      voteType: vote.voteType,
      voter: {
        name: vote.userId?.name || "Anonymous",
        email: vote.userId?.email || "",
        profileImage: vote.userId?.profileImage || "",
        userType: vote.userId?.userType || "patron",
      },
      artwork: {
        id: vote.targetId?._id,
        title: vote.targetId?.title || "",
        image: vote.targetId?.images?.[0]?.url || "",
      },
      createdAt: vote.createdAt,
    }))

    const formattedArtistVotes = artistVotes.map((vote) => ({
      id: vote._id,
      voteType: vote.voteType,
      voter: {
        name: vote.userId?.name || "Anonymous",
        email: vote.userId?.email || "",
        profileImage: vote.userId?.profileImage || "",
      },
      artwork: {
        id: vote.targetId?._id,
        title: vote.targetId?.title || "",
        image: vote.targetId?.images?.[0]?.url || "",
      },
      createdAt: vote.createdAt,
    }))

    // Calculate total stats
    const totalUpvotes = votes.filter((v) => v.voteType === "upvote").length
    const totalDownvotes = votes.filter((v) => v.voteType === "downvote").length
    const artistUpvotes = artistVotes.filter((v) => v.voteType === "upvote").length

    return NextResponse.json({
      votes: formattedVotes,
      artistVotes: formattedArtistVotes,
      stats: {
        totalUpvotes,
        totalDownvotes,
        artistUpvotes,
        totalVotes: votes.length,
        artworkStats: voteStats,
      },
    })
  } catch (error) {
    console.error("Fetch votes error:", error)
    return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 })
  }
}
