import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Donation from "@/models/Donation"
import Comment from "@/models/Comment"
import Vote from "@/models/Vote"
import PointTransaction from "@/models/PointTransaction"
import EngagementReward from "@/models/EngagementReward"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    if (authResult.user.userType !== "patron") {
      return NextResponse.json({ error: "Access denied. Patron account required." }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "monthly"
    const year = Number.parseInt(searchParams.get("year")) || new Date().getFullYear()
    const month = Number.parseInt(searchParams.get("month")) || new Date().getMonth() + 1

    // Calculate date range
    let startDate, endDate
    if (period === "monthly") {
      startDate = new Date(year, month - 1, 1)
      endDate = new Date(year, month, 0)
    } else if (period === "yearly") {
      startDate = new Date(year, 0, 1)
      endDate = new Date(year, 11, 31)
    } else {
      // Default to current month
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    }

    // Get engagement metrics
    const [
      donations,
      comments,
      votes,
      pointsGifted,
      engagementRewards,
      totalDonations,
      totalComments,
      totalVotes,
      totalPointsGifted,
    ] = await Promise.all([
      // Period-specific metrics
      Donation.find({
        patron: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      Comment.find({
        author: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      Vote.find({
        user: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      PointTransaction.find({
        from: authResult.user._id,
        type: "gift",
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      EngagementReward.find({
        user: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      // All-time metrics
      Donation.find({ patron: authResult.user._id }),
      Comment.find({ author: authResult.user._id }),
      Vote.find({ user: authResult.user._id }),
      PointTransaction.find({ from: authResult.user._id, type: "gift" }),
    ])

    // Calculate engagement score
    const engagementScore = Math.round(
      donations.length * 10 + comments.length * 2 + votes.length * 1 + pointsGifted.length * 5,
    )

    // Calculate streak (simplified - days with any activity)
    const activityDates = new Set()
    donations.forEach((d) => activityDates.add(d.createdAt.toDateString()))
    comments.forEach((c) => activityDates.add(c.createdAt.toDateString()))
    votes.forEach((v) => activityDates.add(v.createdAt.toDateString()))
    pointsGifted.forEach((p) => activityDates.add(p.createdAt.toDateString()))

    // Calculate growth (compare to previous period)
    const prevStartDate = new Date(startDate)
    const prevEndDate = new Date(endDate)
    if (period === "monthly") {
      prevStartDate.setMonth(prevStartDate.getMonth() - 1)
      prevEndDate.setMonth(prevEndDate.getMonth() - 1)
    } else {
      prevStartDate.setFullYear(prevStartDate.getFullYear() - 1)
      prevEndDate.setFullYear(prevEndDate.getFullYear() - 1)
    }

    const [prevDonations, prevComments, prevVotes] = await Promise.all([
      Donation.countDocuments({
        patron: authResult.user._id,
        createdAt: { $gte: prevStartDate, $lte: prevEndDate },
      }),
      Comment.countDocuments({
        author: authResult.user._id,
        createdAt: { $gte: prevStartDate, $lte: prevEndDate },
      }),
      Vote.countDocuments({
        user: authResult.user._id,
        createdAt: { $gte: prevStartDate, $lte: prevEndDate },
      }),
    ])

    const currentTotal = donations.length + comments.length + votes.length
    const prevTotal = prevDonations + prevComments + prevVotes
    const growthRate = prevTotal > 0 ? Math.round(((currentTotal - prevTotal) / prevTotal) * 100) : 0

    // Get unique artists supported
    const uniqueArtists = new Set(totalDonations.map((d) => d.artist?.toString()).filter(Boolean))

    const engagementStats = {
      period: {
        donations: donations.length,
        donationAmount: donations.reduce((sum, d) => sum + d.amount, 0),
        comments: comments.length,
        votes: votes.length,
        pointsGifted: pointsGifted.reduce((sum, p) => sum + p.amount, 0),
        engagementScore,
        activeDays: activityDates.size,
        rewardsEarned: engagementRewards.length,
        rewardPoints: engagementRewards.reduce((sum, r) => sum + r.points, 0),
      },
      allTime: {
        totalDonations: totalDonations.length,
        totalDonationAmount: totalDonations.reduce((sum, d) => sum + d.amount, 0),
        totalComments: totalComments.length,
        totalVotes: totalVotes.length,
        totalPointsGifted: totalPointsGifted.reduce((sum, p) => sum + p.amount, 0),
        artistsSupported: uniqueArtists.size,
      },
      trends: {
        growthRate,
        averageEngagementPerDay: Math.round(currentTotal / Math.max(activityDates.size, 1)),
        mostActiveDay: getMostActiveDay(donations, comments, votes),
        engagementStreak: calculateStreak(authResult.user._id),
      },
      breakdown: {
        donationsByMonth: await getDonationsByMonth(authResult.user._id, year),
        commentsByArtwork: await getCommentsByArtwork(authResult.user._id),
        voteDistribution: await getVoteDistribution(authResult.user._id),
        pointGiftHistory: await getPointGiftHistory(authResult.user._id),
      },
    }

    return NextResponse.json(engagementStats)
  } catch (error) {
    console.error("Patron engagement stats error:", error)
    return NextResponse.json({ error: "Failed to fetch engagement statistics" }, { status: 500 })
  }
}

// Helper functions
function getMostActiveDay(donations, comments, votes) {
  const dayCount = {}
  const activities = [...donations, ...comments, ...votes]

  activities.forEach((activity) => {
    const day = activity.createdAt.toLocaleDateString("en-US", { weekday: "long" })
    dayCount[day] = (dayCount[day] || 0) + 1
  })

  return Object.keys(dayCount).reduce((a, b) => (dayCount[a] > dayCount[b] ? a : b), "Monday")
}

async function calculateStreak(userId) {
  // Simplified streak calculation - consecutive days with any activity
  const activities = await Promise.all([
    Donation.find({ patron: userId }).select("createdAt").sort({ createdAt: -1 }).limit(30),
    Comment.find({ author: userId }).select("createdAt").sort({ createdAt: -1 }).limit(30),
    Vote.find({ user: userId }).select("createdAt").sort({ createdAt: -1 }).limit(30),
  ])

  const allActivities = activities.flat().sort((a, b) => b.createdAt - a.createdAt)
  const uniqueDays = [...new Set(allActivities.map((a) => a.createdAt.toDateString()))]

  let streak = 0
  const today = new Date().toDateString()

  for (let i = 0; i < uniqueDays.length; i++) {
    const daysDiff = Math.floor((new Date(today) - new Date(uniqueDays[i])) / (1000 * 60 * 60 * 24))
    if (daysDiff === i) {
      streak++
    } else {
      break
    }
  }

  return streak
}

async function getDonationsByMonth(userId, year) {
  const donations = await Donation.aggregate([
    {
      $match: {
        patron: userId,
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
        amount: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ])

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    count: 0,
    amount: 0,
  }))

  donations.forEach((d) => {
    monthlyData[d._id - 1] = { month: d._id, count: d.count, amount: d.amount }
  })

  return monthlyData
}

async function getCommentsByArtwork(userId) {
  return await Comment.aggregate([
    { $match: { author: userId } },
    {
      $lookup: {
        from: "artworks",
        localField: "artwork",
        foreignField: "_id",
        as: "artworkInfo",
      },
    },
    {
      $group: {
        _id: "$artwork",
        count: { $sum: 1 },
        artworkTitle: { $first: { $arrayElemAt: ["$artworkInfo.title", 0] } },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ])
}

async function getVoteDistribution(userId) {
  return await Vote.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ])
}

async function getPointGiftHistory(userId) {
  return await PointTransaction.aggregate([
    { $match: { from: userId, type: "gift" } },
    {
      $lookup: {
        from: "users",
        localField: "to",
        foreignField: "_id",
        as: "recipient",
      },
    },
    {
      $group: {
        _id: "$to",
        totalGifted: { $sum: "$amount" },
        giftCount: { $sum: 1 },
        recipientName: { $first: { $arrayElemAt: ["$recipient.name", 0] } },
      },
    },
    { $sort: { totalGifted: -1 } },
    { $limit: 10 },
  ])
}
