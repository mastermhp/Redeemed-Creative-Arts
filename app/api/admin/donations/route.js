import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import MatchingCampaign from "@/models/MatchingCampaign"
import ChallengeCampaign from "@/models/ChallengeCampaign"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const status = searchParams.get("status")
    const dateRange = searchParams.get("dateRange")

    // Build filter
    const filter = {}
    if (status && status !== "all") filter.status = status

    if (dateRange) {
      const now = new Date()
      switch (dateRange) {
        case "today":
          filter.createdAt = { $gte: new Date(now.setHours(0, 0, 0, 0)) }
          break
        case "week":
          filter.createdAt = { $gte: new Date(now.setDate(now.getDate() - 7)) }
          break
        case "month":
          filter.createdAt = { $gte: new Date(now.setMonth(now.getMonth() - 1)) }
          break
      }
    }

    const skip = (page - 1) * limit

    const donations = await Donation.find(filter)
      .populate("donorId", "name email userType")
      .populate("recipientId", "name email userType")
      .populate("matchingCampaignId", "title matchRatio")
      .populate("challengeCampaignId", "title targetAmount")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Donation.countDocuments(filter)

    // Get donation statistics
    const stats = await Donation.getStatistics()

    return NextResponse.json({
      donations,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Admin donations API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { type, campaignData } = await request.json()

    let campaign

    if (type === "matching") {
      campaign = new MatchingCampaign({
        ...campaignData,
        createdBy: session.userId,
        status: "active",
      })
    } else if (type === "challenge") {
      campaign = new ChallengeCampaign({
        ...campaignData,
        createdBy: session.userId,
        isActive: true,
      })
    } else {
      return NextResponse.json({ error: "Invalid campaign type" }, { status: 400 })
    }

    await campaign.save()

    return NextResponse.json({
      message: "Campaign created successfully",
      campaign,
    })
  } catch (error) {
    console.error("Admin campaign creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
