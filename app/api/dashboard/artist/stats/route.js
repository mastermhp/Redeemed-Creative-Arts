import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Artwork from "@/models/Artwork"
import Contest from "@/models/Contest"
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

    // Verify user is an artist or admin
    const user = await User.findById(userId)
    if (!user || (user.userType !== "artist" && session.userType !== "admin")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get artwork statistics
    const artworkStats = await Artwork.aggregate([
      { $match: { artist: user._id } },
      {
        $group: {
          _id: null,
          totalArtworks: { $sum: 1 },
          totalViews: { $sum: "$engagement.views" },
          totalLikes: { $sum: "$engagement.likes" },
          totalEarnings: { $sum: "$pointsEarned.total" },
          publishedArtworks: {
            $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] },
          },
          pendingArtworks: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
        },
      },
    ])

    const stats = artworkStats[0] || {
      totalArtworks: 0,
      totalViews: 0,
      totalLikes: 0,
      totalEarnings: 0,
      publishedArtworks: 0,
      pendingArtworks: 0,
    }

    // Get active contests
    const activeContests = await Contest.countDocuments({
      status: "active",
      endDate: { $gt: new Date() },
    })

    // Get helper bookings if user is a helper
    let helperBookings = 0
    if (user.isHelper) {
      // This would require a Booking model - for now return 0
      helperBookings = 0
    }

    // Calculate monthly growth (simplified)
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const monthlyArtworks = await Artwork.countDocuments({
      artist: user._id,
      createdAt: { $gte: lastMonth },
    })

    const monthlyGrowth = stats.totalArtworks > 0 ? ((monthlyArtworks / stats.totalArtworks) * 100).toFixed(1) : 0

    return NextResponse.json({
      ...stats,
      activeContests,
      helperBookings,
      monthlyGrowth: Number.parseFloat(monthlyGrowth),
      completedSales: 0, // Would need Order/Sale model
      userInfo: {
        name: user.name,
        email: user.email,
        userType: user.userType,
        tier: user.membership?.tier || "free",
        isHelper: user.isHelper,
        points: user.points,
        helperInfo: user.helperInfo,
      },
    })
  } catch (error) {
    console.error("Artist stats API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
