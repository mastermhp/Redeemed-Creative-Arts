import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Artwork from "@/models/Artwork"
import Donation from "@/models/Donation"
import Contest from "@/models/Contest"

export async function GET() {
  try {
    console.log("Admin dashboard API called")
    await connectDB()
    console.log("Database connected")

    // Get basic user statistics first
    const totalUsers = await User.countDocuments()
    const totalArtists = await User.countDocuments({ userType: "artist" })
    const totalPatrons = await User.countDocuments({ userType: "patron" })
    const totalChurches = await User.countDocuments({ userType: "church" })
    const totalAdmins = await User.countDocuments({ userType: "admin" })
    const activeHelpers = await User.countDocuments({ isHelper: true, isActive: true })

    console.log("User stats fetched:", { totalUsers, totalArtists, totalPatrons, totalChurches })

    // Get artwork statistics
    let totalArtworks = 0
    let pendingArtworks = 0
    try {
      totalArtworks = await Artwork.countDocuments()
      pendingArtworks = await Artwork.countDocuments({ status: "pending" })
    } catch (artworkError) {
      console.log("Artwork model not available:", artworkError.message)
    }

    // Get donation statistics
    let totalDonations = 0
    try {
      const donationResult = await Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
      totalDonations = donationResult[0]?.total || 0
    } catch (donationError) {
      console.log("Donation model not available:", donationError.message)
    }

    // Get contest statistics
    let totalContests = 0
    try {
      totalContests = await Contest.countDocuments({ status: "active" })
    } catch (contestError) {
      console.log("Contest model not available:", contestError.message)
    }

    // Get recent activity from users and artworks
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select("name userType createdAt")

    let recentArtworks = []
    try {
      recentArtworks = await Artwork.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("title artist status createdAt")
        .populate("artist", "name")
    } catch (artworkError) {
      console.log("Could not fetch recent artworks:", artworkError.message)
    }

    // Format recent activity
    const recentActivity = [
      ...recentUsers.map((user) => ({
        description: `New ${user.userType} registered: ${user.name}`,
        timestamp: new Date(user.createdAt).toLocaleString(),
        type: "user_registration",
        id: user._id,
      })),
      ...recentArtworks.map((artwork) => ({
        description: `New artwork submitted: "${artwork.title}" by ${artwork.artist?.name || "Unknown Artist"}`,
        timestamp: new Date(artwork.createdAt).toLocaleString(),
        type: "artwork_submission",
        id: artwork._id,
        status: artwork.status,
      })),
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)

    const stats = {
      totalUsers,
      totalArtists,
      totalPatrons,
      totalChurches,
      totalAdmins,
      totalArtworks,
      totalCourses: 0, // Will be implemented later
      totalEvents: 0, // Will be implemented later
      totalProducts: 0, // Will be implemented later
      totalDonations,
      totalContests,
      pendingApprovals: pendingArtworks,
      activeHelpers,
    }

    console.log("Final stats:", stats)

    return NextResponse.json({
      stats,
      recentActivity,
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
        details: error.message,
        stats: {
          totalUsers: 0,
          totalArtists: 0,
          totalPatrons: 0,
          totalChurches: 0,
          totalAdmins: 0,
          totalArtworks: 0,
          totalCourses: 0,
          totalEvents: 0,
          totalProducts: 0,
          totalDonations: 0,
          totalContests: 0,
          pendingApprovals: 0,
          activeHelpers: 0,
        },
        recentActivity: [],
      },
      { status: 500 },
    )
  }
}
