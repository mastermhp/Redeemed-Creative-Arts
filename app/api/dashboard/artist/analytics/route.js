import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Artwork from "@/models/Artwork"
import Transaction from "@/models/Transaction"
import User from "@/models/User"

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

    const userProfile = await User.findById(user._id).select("membership")
    const membershipTier = userProfile?.membership?.tier || "free"

    // Basic analytics for all users
    const basicAnalytics = await getBasicAnalytics(user._id)

    // Advanced analytics for paid subscribers only
    let advancedAnalytics = null
    if (membershipTier !== "free") {
      advancedAnalytics = await getAdvancedAnalytics(user._id)
    }

    return NextResponse.json({
      basic: basicAnalytics,
      advanced: advancedAnalytics,
      subscription: {
        tier: membershipTier,
        hasAdvancedAnalytics: membershipTier !== "free",
      },
    })
  } catch (error) {
    console.error("Fetch analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

async function getBasicAnalytics(artistId) {
  const artworks = await Artwork.find({ artist: artistId }).lean()

  const totalViews = artworks.reduce((sum, artwork) => sum + (artwork.engagement?.views || 0), 0)
  const totalLikes = artworks.reduce((sum, artwork) => sum + (artwork.engagement?.likes || 0), 0)
  const totalShares = artworks.reduce((sum, artwork) => sum + (artwork.engagement?.shares || 0), 0)

  const sales = await Transaction.find({
    recipient: artistId,
    type: { $in: ["sale", "commission"] },
    status: "completed",
  }).lean()

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0)

  return {
    totalArtworks: artworks.length,
    totalViews,
    totalLikes,
    totalShares,
    totalSales: sales.length,
    totalRevenue,
    averageViews: artworks.length > 0 ? Math.round(totalViews / artworks.length) : 0,
    averageLikes: artworks.length > 0 ? Math.round(totalLikes / artworks.length) : 0,
    engagementRate: totalViews > 0 ? Math.round(((totalLikes + totalShares) / totalViews) * 100) : 0,
  }
}

async function getAdvancedAnalytics(artistId) {
  // Performance by category
  const categoryPerformance = await Artwork.aggregate([
    { $match: { artist: artistId } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        totalViews: { $sum: "$engagement.views" },
        totalLikes: { $sum: "$engagement.likes" },
        avgViews: { $avg: "$engagement.views" },
        avgLikes: { $avg: "$engagement.likes" },
      },
    },
  ])

  // Monthly performance
  const monthlyPerformance = await Artwork.aggregate([
    { $match: { artist: artistId } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        uploads: { $sum: 1 },
        views: { $sum: "$engagement.views" },
        likes: { $sum: "$engagement.likes" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ])

  // Revenue analytics
  const revenueAnalytics = await Transaction.aggregate([
    {
      $match: {
        recipient: artistId,
        type: { $in: ["sale", "commission", "tip"] },
        status: "completed",
      },
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
        totalAmount: { $sum: "$amount" },
        avgAmount: { $avg: "$amount" },
      },
    },
  ])

  // Top performing artworks
  const topArtworks = await Artwork.find({ artist: artistId })
    .sort({ "engagement.views": -1, "engagement.likes": -1 })
    .limit(5)
    .select("title engagement.views engagement.likes images")
    .lean()

  return {
    categoryPerformance,
    monthlyPerformance,
    revenueAnalytics,
    topArtworks: topArtworks.map((artwork) => ({
      id: artwork._id,
      title: artwork.title,
      views: artwork.engagement?.views || 0,
      likes: artwork.engagement?.likes || 0,
      image: artwork.images?.[0]?.url || null,
    })),
  }
}
