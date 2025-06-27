import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Artwork from "@/models/Artwork"
import Donation from "@/models/Donation"
import Event from "@/models/Event"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function GET(request) {
  try {
    // Get token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token.value, process.env.JWT_SECRET)
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    if (!decoded || decoded.userType !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    await connectDB()

    const [
      totalUsers,
      activeUsers,
      totalArtworks,
      pendingArtworks,
      totalDonations,
      monthlyRevenue,
      totalEvents,
      usersByType,
      recentUsers,
      topArtists,
      platformGrowth,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Artwork.countDocuments(),
      Artwork.countDocuments({ status: "pending" }),
      Donation.countDocuments(),
      Donation.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]),
      Event.countDocuments(),
      User.aggregate([
        {
          $group: {
            _id: "$userType",
            count: { $sum: 1 },
          },
        },
      ]),
      User.find().sort({ createdAt: -1 }).limit(10).select("name email userType createdAt isActive"),
      User.find({ userType: "artist" }).sort({ "points.total": -1 }).limit(5).select("name email points artistInfo"),
      User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 12 },
      ]),
    ])

    const stats = {
      totalUsers,
      activeUsers,
      totalArtworks,
      pendingArtworks,
      totalDonations,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      totalEvents,
      usersByType: usersByType.reduce((acc, item) => {
        acc[item._id] = item.count
        return acc
      }, {}),
      recentUsers,
      topArtists,
      platformGrowth,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Admin stats error:", error)
    return NextResponse.json({ error: "Failed to fetch admin statistics" }, { status: 500 })
  }
}
