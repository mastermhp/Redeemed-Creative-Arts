import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import ChallengeCampaign from "@/models/ChallengeCampaign"
import MatchingCampaign from "@/models/MatchingCampaign"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit")) || 10

    // Get active challenge campaigns
    const challengeCampaigns = await ChallengeCampaign.find({
      isActive: true,
      endDate: { $gt: new Date() },
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)

    // Get active matching campaigns
    const matchingCampaigns = await MatchingCampaign.find({
      status: "active",
      endDate: { $gt: new Date() },
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)

    // Transform campaigns for frontend
    const transformedCampaigns = [
      ...challengeCampaigns.map((campaign) => ({
        id: campaign._id,
        title: campaign.title,
        organizer: campaign.createdBy?.name || "Anonymous",
        goal: campaign.targetAmount,
        raised: campaign.currentAmount || 0,
        daysLeft: Math.ceil((campaign.endDate - new Date()) / (1000 * 60 * 60 * 24)),
        supporters: campaign.donorCount || 0,
        description: campaign.description,
        image: "/placeholder.svg?height=100&width=150",
        matchingAvailable: false,
        matchRatio: 0,
      })),
      ...matchingCampaigns.map((campaign) => ({
        id: campaign._id,
        title: campaign.title,
        organizer: campaign.createdBy?.name || "Anonymous",
        goal: campaign.maxMatchAmount,
        raised: campaign.currentMatchAmount || 0,
        daysLeft: Math.ceil((campaign.endDate - new Date()) / (1000 * 60 * 60 * 24)),
        supporters: campaign.donorCount || 0,
        description: campaign.description,
        image: "/placeholder.svg?height=100&width=150",
        matchingAvailable: true,
        matchRatio: campaign.matchRatio,
      })),
    ]

    // Sort by creation date and limit
    transformedCampaigns.sort((a, b) => b.daysLeft - a.daysLeft)

    return NextResponse.json({
      campaigns: transformedCampaigns.slice(0, limit),
    })
  } catch (error) {
    console.error("Campaigns API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
