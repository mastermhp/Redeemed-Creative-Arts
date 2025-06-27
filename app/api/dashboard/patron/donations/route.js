import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import User from "@/models/User"
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
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10

    // Verify user access
    const user = await User.findById(userId)
    if (!user || (user.userType !== "patron" && session.userType !== "admin")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const skip = (page - 1) * limit

    const donations = await Donation.find({ donorId: user._id })
      .populate("recipientId", "name email userType")
      .populate("matchingCampaignId", "title")
      .populate("challengeCampaignId", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Donation.countDocuments({ donorId: user._id })

    // Transform donations for frontend
    const transformedDonations = donations.map((donation) => ({
      id: donation._id,
      recipient: donation.recipientId?.name || "Unknown",
      recipientType: donation.recipientId?.userType || "unknown",
      amount: donation.amount,
      campaign: donation.challengeCampaignId?.title || donation.matchingCampaignId?.title || "Direct Support",
      date: donation.createdAt.toISOString().split("T")[0],
      status: donation.status,
      matchingFunds: donation.matchedAmount || 0,
      impact: donation.status === "completed" ? "Donation completed successfully" : "Processing",
      artwork: "General Support", // Would need to link to specific artwork
    }))

    return NextResponse.json({
      donations: transformedDonations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Patron donations API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
