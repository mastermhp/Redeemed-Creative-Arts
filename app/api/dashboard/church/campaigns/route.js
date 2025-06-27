import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import { getServerSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get campaigns by grouping donations by campaignId
    const campaignData = await Donation.aggregate([
      { $match: { recipientId: session.userId } },
      {
        $group: {
          _id: "$campaignId",
          title: { $first: "$campaignTitle" },
          goal: { $first: "$campaignGoal" },
          raised: { $sum: "$amount" },
          supporters: { $addToSet: "$donorId" },
          category: { $first: "$category" },
          description: { $first: "$campaignDescription" },
          endDate: { $first: "$campaignEndDate" },
          matchingAvailable: { $first: "$matchingAvailable" },
          matchRatio: { $first: "$matchRatio" },
        },
      },
    ])

    const campaigns = campaignData.map((campaign) => {
      const daysLeft = campaign.endDate
        ? Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24))
        : 30

      return {
        id: campaign._id,
        title: campaign.title || "Untitled Campaign",
        goal: campaign.goal || 5000,
        raised: campaign.raised,
        supporters: campaign.supporters.length,
        daysLeft: Math.max(0, daysLeft),
        description: campaign.description || "No description available",
        status: "active",
        matchingAvailable: campaign.matchingAvailable || false,
        matchRatio: campaign.matchRatio || 0,
        category: campaign.category || "General",
      }
    })

    return NextResponse.json({ campaigns })
  } catch (error) {
    console.error("Church campaigns error:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const campaignData = await request.json()
    await connectDB()

    // Create initial donation record for the campaign
    const campaign = new Donation({
      campaignId: new Date().getTime().toString(),
      campaignTitle: campaignData.title,
      campaignDescription: campaignData.description,
      campaignGoal: campaignData.goal,
      category: campaignData.category,
      recipientId: session.userId,
      amount: 0,
      status: "active",
      campaignEndDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    })

    await campaign.save()

    return NextResponse.json(
      {
        message: "Campaign created successfully",
        campaign,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create campaign error:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
