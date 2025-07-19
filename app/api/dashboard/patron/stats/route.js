import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import User from "@/models/User"
import Comment from "@/models/Comment"
import Vote from "@/models/Vote"
import PointTransaction from "@/models/PointTransaction"
import EngagementReward from "@/models/EngagementReward"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || session.user._id

    // Verify user is a patron or admin
    const user = await User.findById(userId)
    if (!user || (user.userType !== "patron" && session.user.userType !== "admin")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get current date and month boundaries
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Calculate total donations
    const donationStats = await Donation.aggregate([
      {
        $match: {
          donorId: user._id,
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalDonations: { $sum: "$amount" },
          donationCount: { $sum: 1 },
          uniqueRecipients: { $addToSet: "$recipientId" },
        },
      },
    ])

    const totalDonations = donationStats[0]?.totalDonations || 0
    const artistsSupported = donationStats[0]?.uniqueRecipients?.length || 0

    // Calculate monthly donations
    const monthlyDonationStats = await Donation.aggregate([
      {
        $match: {
          donorId: user._id,
          status: "completed",
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          monthlyDonations: { $sum: "$amount" },
        },
      },
    ])

    const monthlyDonations = monthlyDonationStats[0]?.monthlyDonations || 0

    // Calculate points gifted
    const pointsGiftedStats = await PointTransaction.aggregate([
      {
        $match: {
          fromUserId: user._id,
          type: "gift",
        },
      },
      {
        $group: {
          _id: null,
          pointsGifted: { $sum: "$amount" },
        },
      },
    ])

    const pointsGifted = pointsGiftedStats[0]?.pointsGifted || 0

    // Calculate current points
    const currentPointsStats = await PointTransaction.aggregate([
      {
        $match: {
          $or: [{ fromUserId: user._id }, { toUserId: user._id }],
        },
      },
      {
        $group: {
          _id: null,
          totalEarned: {
            $sum: {
              $cond: [{ $eq: ["$toUserId", user._id] }, "$amount", 0],
            },
          },
          totalSpent: {
            $sum: {
              $cond: [{ $eq: ["$fromUserId", user._id] }, "$amount", 0],
            },
          },
        },
      },
    ])

    const totalEarned = currentPointsStats[0]?.totalEarned || 0
    const totalSpent = currentPointsStats[0]?.totalSpent || 0
    const currentPoints = totalEarned - totalSpent

    // Calculate comments posted
    const commentsPosted = await Comment.countDocuments({ author: user._id })

    // Calculate monthly comments
    const monthlyComments = await Comment.countDocuments({
      author: user._id,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    })

    // Calculate votes submitted
    const votesSubmitted = await Vote.countDocuments({ voter: user._id })

    // Calculate monthly votes
    const monthlyVotes = await Vote.countDocuments({
      voter: user._id,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    })

    // Calculate engagement rewards
    const rewardStats = await EngagementReward.aggregate([
      {
        $match: { userId: user._id },
      },
      {
        $group: {
          _id: null,
          availableRewards: {
            $sum: { $cond: [{ $eq: ["$claimed", false] }, 1, 0] },
          },
          claimedRewards: {
            $sum: { $cond: [{ $eq: ["$claimed", true] }, 1, 0] },
          },
          totalPoints: { $sum: "$points" },
          availablePoints: {
            $sum: { $cond: [{ $eq: ["$claimed", false] }, "$points", 0] },
          },
        },
      },
    ])

    const rewardData = rewardStats[0] || {}

    // Calculate engagement score (simple formula)
    const engagementScore = Math.round((commentsPosted * 2 + votesSubmitted * 1 + totalDonations / 10) / 3)

    // Calculate reward streak (days with activity)
    const rewardStreak = Math.min(Math.floor((monthlyComments + monthlyVotes + (monthlyDonations > 0 ? 1 : 0)) / 2), 30)

    const stats = {
      overview: {
        totalDonations,
        artistsSupported,
        pointsGifted,
        commentsPosted,
        votesSubmitted,
        currentPoints,
        totalPoints: totalEarned,
      },
      engagement: {
        monthlyDonations,
        monthlyComments,
        monthlyVotes,
        engagementScore,
        rewardStreak,
      },
      rewards: {
        available: rewardData.availableRewards || 0,
        claimed: rewardData.claimedRewards || 0,
        totalPoints: rewardData.totalPoints || 0,
        availablePoints: rewardData.availablePoints || 0,
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Patron stats API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
