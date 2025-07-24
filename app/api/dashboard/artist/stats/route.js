import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Artwork from "@/models/Artwork"
import Product from "@/models/Product"
import Course from "@/models/Course"
import Event from "@/models/Event"
import Donation from "@/models/Donation"
import User from "@/models/User"
import Vote from "@/models/Vote"
import Comment from "@/models/Comment"

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

    // Get current date ranges
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Fetch all data in parallel
    const [
      totalArtworks,
      approvedArtworks,
      pendingArtworks,
      rejectedArtworks,
      totalProducts,
      totalCourses,
      totalEvents,
      artworkEngagement,
      monthlyStats,
      lastMonthStats,
      donations,
      votes,
      comments,
      userProfile,
    ] = await Promise.all([
      // Artwork counts
      Artwork.countDocuments({ artist: user._id }),
      Artwork.countDocuments({ artist: user._id, status: "approved" }),
      Artwork.countDocuments({ artist: user._id, status: "pending" }),
      Artwork.countDocuments({ artist: user._id, status: "rejected" }),

      // Other content counts
      Product.countDocuments({ seller: user._id }),
      Course.countDocuments({ instructor: user._id }),
      Event.countDocuments({ organizer: user._id }),

      // Engagement stats
      Artwork.aggregate([
        { $match: { artist: user._id } },
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$engagement.views" },
            totalLikes: { $sum: "$engagement.likes" },
            totalShares: { $sum: "$engagement.shares" },
            totalComments: { $sum: "$engagement.comments" },
            featuredCount: { $sum: { $cond: ["$isFeatured", 1, 0] } },
          },
        },
      ]),

      // Monthly stats
      Artwork.aggregate([
        {
          $match: {
            artist: user._id,
            createdAt: { $gte: startOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            monthlyViews: { $sum: "$engagement.views" },
            monthlyLikes: { $sum: "$engagement.likes" },
            monthlyUploads: { $sum: 1 },
          },
        },
      ]),

      // Last month stats for comparison
      Artwork.aggregate([
        {
          $match: {
            artist: user._id,
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
          },
        },
        {
          $group: {
            _id: null,
            lastMonthViews: { $sum: "$engagement.views" },
            lastMonthLikes: { $sum: "$engagement.likes" },
          },
        },
      ]),

      // Donations received
      Donation.aggregate([
        { $match: { recipientId: user._id } },
        {
          $group: {
            _id: null,
            totalDonations: { $sum: "$amount" },
            donationCount: { $sum: 1 },
          },
        },
      ]),

      // Votes received
      Vote.countDocuments({ targetId: user._id, targetType: "artist" }),

      // Comments on artworks
      Comment.countDocuments({
        targetId: { $in: await Artwork.find({ artist: user._id }).distinct("_id") },
      }),

      // User profile for points
      User.findById(user._id).select("points membership"),
    ])

    // Process engagement data
    const engagement = artworkEngagement[0] || {
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      totalComments: 0,
      featuredCount: 0,
    }

    const monthly = monthlyStats[0] || {
      monthlyViews: 0,
      monthlyLikes: 0,
      monthlyUploads: 0,
    }

    const lastMonth = lastMonthStats[0] || {
      lastMonthViews: 0,
      lastMonthLikes: 0,
    }

    const donationData = donations[0] || {
      totalDonations: 0,
      donationCount: 0,
    }

    // Calculate growth percentages
    const viewsGrowth =
      lastMonth.lastMonthViews > 0
        ? ((monthly.monthlyViews - lastMonth.lastMonthViews) / lastMonth.lastMonthViews) * 100
        : 0

    const likesGrowth =
      lastMonth.lastMonthLikes > 0
        ? ((monthly.monthlyLikes - lastMonth.lastMonthLikes) / lastMonth.lastMonthLikes) * 100
        : 0

    // Calculate engagement rate
    const engagementRate =
      engagement.totalViews > 0
        ? ((engagement.totalLikes + engagement.totalComments + engagement.totalShares) / engagement.totalViews) * 100
        : 0

    // Get top artworks
    const topArtworks = await Artwork.find({ artist: user._id })
      .sort({ "engagement.likes": -1, "engagement.views": -1 })
      .limit(5)
      .select("title engagement images createdAt")

    // Get recent activity
    const recentActivity = await Artwork.find({ artist: user._id })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("title status updatedAt engagement")

    // Calculate subscription tier benefits
    const membershipTier = userProfile?.membership?.tier || "free"
    const pointMultiplier = membershipTier === "free" ? 1 : membershipTier === "tier1" ? 2 : 3
    const maxArtworks = membershipTier === "free" ? 5 : membershipTier === "tier1" ? 25 : -1 // -1 means unlimited

    const response = {
      overview: {
        totalArtworks,
        approvedArtworks,
        pendingArtworks,
        rejectedArtworks,
        totalProducts,
        totalCourses,
        totalEvents,
        totalViews: engagement.totalViews,
        totalLikes: engagement.totalLikes,
        totalShares: engagement.totalShares,
        totalComments: engagement.totalComments,
        featuredCount: engagement.featuredCount,
        votesReceived: votes,
        commentsReceived: comments,
      },
      engagement: {
        totalViews: engagement.totalViews,
        totalLikes: engagement.totalLikes,
        totalShares: engagement.totalShares,
        totalComments: engagement.totalComments,
        monthlyViews: monthly.monthlyViews,
        monthlyLikes: monthly.monthlyLikes,
        viewsGrowth: Math.round(viewsGrowth * 100) / 100,
        likesGrowth: Math.round(likesGrowth * 100) / 100,
        averageViews: totalArtworks > 0 ? Math.round(engagement.totalViews / totalArtworks) : 0,
        averageLikes: totalArtworks > 0 ? Math.round(engagement.totalLikes / totalArtworks) : 0,
        engagementRate: Math.round(engagementRate * 100) / 100,
      },
      financial: {
        totalDonations: donationData.totalDonations,
        donationCount: donationData.donationCount,
        averageDonation:
          donationData.donationCount > 0
            ? Math.round((donationData.totalDonations / donationData.donationCount) * 100) / 100
            : 0,
      },
      points: {
        current: userProfile?.points?.current || 0,
        total: userProfile?.points?.total || 0,
        level: userProfile?.points?.level || "bronze",
        thisMonth: monthly.monthlyUploads * 25 * pointMultiplier, // Estimated based on uploads
        multiplier: pointMultiplier,
      },
      subscription: {
        tier: membershipTier,
        maxArtworks,
        canSellMerchandise: membershipTier !== "free",
        canCreateCourses: membershipTier === "tier2",
        hasCustomThemes: membershipTier !== "free",
        hasPrioritySupport: membershipTier !== "free",
        hasAdvancedAnalytics: membershipTier !== "free",
      },
      topArtworks: topArtworks.map((artwork) => ({
        id: artwork._id,
        title: artwork.title,
        views: artwork.engagement?.views || 0,
        likes: artwork.engagement?.likes || 0,
        image: artwork.images?.[0]?.url || null,
        createdAt: artwork.createdAt,
      })),
      recentActivity: recentActivity.map((artwork) => ({
        id: artwork._id,
        title: artwork.title,
        status: artwork.status,
        updatedAt: artwork.updatedAt,
        views: artwork.engagement?.views || 0,
        likes: artwork.engagement?.likes || 0,
      })),
      monthly: Array.from({ length: 12 }, (_, i) => {
        const month = new Date(now.getFullYear(), i, 1)
        return {
          month: month.toLocaleDateString("en-US", { month: "short" }),
          views: Math.floor(Math.random() * 1000), // Replace with actual monthly data
          likes: Math.floor(Math.random() * 100),
          uploads: Math.floor(Math.random() * 10),
        }
      }),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Artist stats error:", error)
    return NextResponse.json({ error: "Failed to fetch artist statistics" }, { status: 500 })
  }
}
