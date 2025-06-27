import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Donation from "@/models/Donation"
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

    // Get donation statistics
    const donationStats = await Donation.aggregate([
      { $match: { donorId: user._id, status: "completed" } },
      {
        $group: {
          _id: null,
          totalDonated: { $sum: "$amount" },
          totalDonations: { $sum: 1 },
          totalMatched: { $sum: "$matchedAmount" },
        },
      },
    ])

    const stats = donationStats[0] || {
      totalDonated: 0,
      totalDonations: 0,
      totalMatched: 0,
    }

    // Get unique artists supported
    const supportedArtists = await Donation.distinct("recipientId", {
      donorId: user._id,
      status: "completed",
    })

    // Get campaigns supported (would need Campaign model)
    const campaignsSupported = await Donation.distinct("challengeCampaignId", {
      donorId: user._id,
      status: "completed",
      challengeCampaignId: { $ne: null },
    })

    // Calculate this month's donations
    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)

    const monthlyDonations = await Donation.aggregate([
      {
        $match: {
          donorId: user._id,
          status: "completed",
          createdAt: { $gte: thisMonth },
        },
      },
      {
        $group: {
          _id: null,
          currentMonthDonated: { $sum: "$amount" },
        },
      },
    ])

    const currentMonthDonated = monthlyDonations[0]?.currentMonthDonated || 0

    // Mock engagement stats (would need actual tracking)
    const engagementStats = {
      artworksLiked: 0, // Would need Like model
      commentsPosted: 0, // Would need Comment model
      pointsGifted: 0, // Would need PointTransaction model
      votescast: 0, // Would need Vote model
    }

    // Calculate impact score (simplified)
    const impactScore = Math.min(
      100,
      Math.floor(stats.totalDonated / 100 + supportedArtists.length * 5 + campaignsSupported.length * 3),
    )

    return NextResponse.json({
      totalDonated: stats.totalDonated,
      artistsSupported: supportedArtists.length,
      campaignsSupported: campaignsSupported.length,
      impactScore,
      currentMonthDonated,
      monthlyGoal: user.monthlyGoal || 500,
      ...engagementStats,
      userInfo: {
        name: user.name,
        email: user.email,
        userType: user.userType,
        tier: user.membership?.tier || "free",
        points: user.points,
      },
    })
  } catch (error) {
    console.error("Patron stats API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
