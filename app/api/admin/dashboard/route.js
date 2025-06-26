import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function GET() {
  try {
    await connectDB()

    // Get user statistics
    const totalUsers = await User.countDocuments()
    const totalArtists = await User.countDocuments({ userType: "artist" })
    const totalPatrons = await User.countDocuments({ userType: "patron" })
    const totalChurches = await User.countDocuments({ userType: "church" })
    const activeHelpers = await User.countDocuments({ isHelper: true })
    const pendingApprovals = await User.countDocuments({ isVerified: false })

    // Mock data for now - replace with real data later
    const stats = {
      totalUsers,
      totalArtists,
      totalPatrons,
      totalChurches,
      totalDonations: 15420,
      totalContests: 3,
      pendingApprovals,
      activeHelpers,
    }

    const recentActivity = [
      {
        description: "New artist registered: Sarah Johnson",
        timestamp: "2 hours ago",
      },
      {
        description: "Contest submission received",
        timestamp: "4 hours ago",
      },
      {
        description: "Donation of $100 processed",
        timestamp: "6 hours ago",
      },
    ]

    return NextResponse.json({
      stats,
      recentActivity,
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
