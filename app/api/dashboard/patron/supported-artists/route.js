import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import User from "@/models/User"
import Artwork from "@/models/Artwork"
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

    // Verify user is a patron or admin
    const user = await User.findById(userId)
    if (!user || (user.userType !== "patron" && session.userType !== "admin")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get artists supported through donations
    const supportedArtistsData = await Donation.aggregate([
      {
        $match: {
          donorId: user._id,
          status: "completed",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "recipientId",
          foreignField: "_id",
          as: "recipient",
        },
      },
      {
        $unwind: "$recipient",
      },
      {
        $match: {
          "recipient.userType": "artist",
        },
      },
      {
        $group: {
          _id: "$recipientId",
          totalSupported: { $sum: "$amount" },
          donationCount: { $sum: 1 },
          lastDonation: { $max: "$createdAt" },
          recipient: { $first: "$recipient" },
        },
      },
      {
        $sort: { totalSupported: -1 },
      },
    ])

    // Get artwork counts for each artist
    const artistIds = supportedArtistsData.map((item) => item._id)
    const artworkCounts = await Artwork.aggregate([
      {
        $match: {
          artist: { $in: artistIds },
          status: "approved",
        },
      },
      {
        $group: {
          _id: "$artist",
          artworksCreated: { $sum: 1 },
        },
      },
    ])

    const artworkCountMap = {}
    artworkCounts.forEach((item) => {
      artworkCountMap[item._id.toString()] = item.artworksCreated
    })

    // Transform data for frontend
    const transformedArtists = supportedArtistsData.map((item) => ({
      id: item._id,
      name: item.recipient.name,
      specialty: item.recipient.artistInfo?.specialties?.[0] || "Visual Art",
      totalSupported: item.totalSupported,
      artworksCreated: artworkCountMap[item._id.toString()] || 0,
      lastDonation: item.lastDonation.toISOString().split("T")[0],
      avatar: item.recipient.profileImage || "/placeholder.svg?height=50&width=50",
      rating: 4.8, // Mock rating - would need rating system
      tier: item.recipient.membership?.tier || "free",
      recentWork: "Latest Creation", // Would need to fetch actual recent work
    }))

    return NextResponse.json({
      supportedArtists: transformedArtists,
    })
  } catch (error) {
    console.error("Supported artists API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
