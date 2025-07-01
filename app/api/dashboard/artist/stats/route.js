import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
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

    // Get current date and date ranges
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get all artworks for this artist
    const allArtworks = await Artwork.find({ artist: user._id }).lean()

    // Calculate totals
    const totalArtworks = allArtworks.length
    const approvedArtworks = allArtworks.filter((a) => a.status === "approved").length
    const pendingArtworks = allArtworks.filter((a) => a.status === "pending").length
    const rejectedArtworks = allArtworks.filter((a) => a.status === "rejected").length

    const totalViews = allArtworks.reduce((sum, artwork) => sum + (artwork.engagement?.views || 0), 0)
    const totalLikes = allArtworks.reduce((sum, artwork) => sum + (artwork.engagement?.likes || 0), 0)
    const totalShares = allArtworks.reduce((sum, artwork) => sum + (artwork.engagement?.shares || 0), 0)

    // Get this month's stats
    const thisMonthArtworks = allArtworks.filter((a) => new Date(a.createdAt) >= startOfMonth)
    const monthlyViews = thisMonthArtworks.reduce((sum, artwork) => sum + (artwork.engagement?.views || 0), 0)
    const monthlyLikes = thisMonthArtworks.reduce((sum, artwork) => sum + (artwork.engagement?.likes || 0), 0)

    // Get last month's stats for comparison
    const lastMonthArtworks = allArtworks.filter((a) => {
      const createdAt = new Date(a.createdAt)
      return createdAt >= startOfLastMonth && createdAt <= endOfLastMonth
    })
    const lastMonthViews = lastMonthArtworks.reduce((sum, artwork) => sum + (artwork.engagement?.views || 0), 0)
    const lastMonthLikes = lastMonthArtworks.reduce((sum, artwork) => sum + (artwork.engagement?.likes || 0), 0)

    // Calculate growth
    const viewsGrowth = lastMonthViews > 0 ? Math.round(((monthlyViews - lastMonthViews) / lastMonthViews) * 100) : 0
    const likesGrowth = lastMonthLikes > 0 ? Math.round(((monthlyLikes - lastMonthLikes) / lastMonthLikes) * 100) : 0

    // Get category breakdown
    const categoryStats = {}
    allArtworks.forEach((artwork) => {
      const category = artwork.category || "other"
      if (!categoryStats[category]) {
        categoryStats[category] = { count: 0, views: 0, likes: 0 }
      }
      categoryStats[category].count++
      categoryStats[category].views += artwork.engagement?.views || 0
      categoryStats[category].likes += artwork.engagement?.likes || 0
    })

    // Get recent activity
    const recentArtworks = allArtworks
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
      .map((artwork) => ({
        id: artwork._id,
        title: artwork.title,
        status: artwork.status,
        views: artwork.engagement?.views || 0,
        likes: artwork.engagement?.likes || 0,
        image: artwork.images?.[0]?.url || null,
        createdAt: artwork.createdAt,
        updatedAt: artwork.updatedAt,
      }))

    // Get top performing artworks
    const topArtworks = allArtworks
      .sort((a, b) => (b.engagement?.views || 0) - (a.engagement?.views || 0))
      .slice(0, 5)
      .map((artwork) => ({
        id: artwork._id,
        title: artwork.title,
        views: artwork.engagement?.views || 0,
        likes: artwork.engagement?.likes || 0,
        image: artwork.images?.[0]?.url || null,
      }))

    const stats = {
      overview: {
        totalArtworks,
        approvedArtworks,
        pendingArtworks,
        rejectedArtworks,
        totalViews,
        totalLikes,
        totalShares,
        featuredCount: allArtworks.filter((a) => a.isFeatured).length,
      },
      engagement: {
        totalViews,
        totalLikes,
        monthlyViews,
        monthlyLikes,
        viewsGrowth,
        likesGrowth,
        averageViews: totalArtworks > 0 ? Math.round(totalViews / totalArtworks) : 0,
        averageLikes: totalArtworks > 0 ? Math.round(totalLikes / totalArtworks) : 0,
        engagementRate: totalViews > 0 ? Math.round((totalLikes / totalViews) * 100) : 0,
      },
      points: {
        current: user.points?.current || 0,
        total: user.points?.total || 0,
        level: user.points?.level || "bronze",
        thisMonth: monthlyViews + monthlyLikes * 2 + thisMonthArtworks.length * 10,
      },
      categories: Object.entries(categoryStats).map(([category, data]) => ({
        category,
        count: data.count,
        views: data.views,
        likes: data.likes,
        avgViews: data.count > 0 ? Math.round(data.views / data.count) : 0,
        avgLikes: data.count > 0 ? Math.round(data.likes / data.count) : 0,
      })),
      recentActivity: recentArtworks,
      topArtworks,
      monthly: [
        { month: "This Month", uploads: thisMonthArtworks.length, views: monthlyViews, likes: monthlyLikes },
        { month: "Last Month", uploads: lastMonthArtworks.length, views: lastMonthViews, likes: lastMonthLikes },
      ],
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Artist stats error:", error)
    return NextResponse.json({ error: "Failed to fetch artist statistics" }, { status: 500 })
  }
}
