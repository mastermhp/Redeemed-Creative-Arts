import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId)
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Artist access required" }, { status: 403 })
    }

    // Get donations received by this artist
    const donations = await Donation.find({
      recipientId: session.userId,
      recipientType: "artist",
      status: "completed",
    })
      .populate("donorId", "name email profileImage")
      .sort({ createdAt: -1 })

    // Calculate donation stats
    const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)
    const totalDonors = new Set(donations.map((d) => d.donorId.toString())).size
    const avgDonation = donations.length > 0 ? totalDonations / donations.length : 0

    // Monthly donations data
    const monthlyDonations = {}
    donations.forEach((donation) => {
      const month = donation.createdAt.toISOString().slice(0, 7) // YYYY-MM
      monthlyDonations[month] = (monthlyDonations[month] || 0) + donation.amount
    })

    // Recent donations (last 10)
    const recentDonations = donations.slice(0, 10)

    return NextResponse.json({
      donations: recentDonations,
      stats: {
        totalDonations,
        totalDonors,
        avgDonation,
        monthlyDonations,
      },
    })
  } catch (error) {
    console.error("Artist donations API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
