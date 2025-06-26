import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import MatchingCampaign from "@/models/MatchingCampaign"
import ChallengeCampaign from "@/models/ChallengeCampaign"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")
    const skip = (page - 1) * limit

    // Build query
    const query = {}
    if (status) query.status = status
    if (userId) {
      query.$or = [{ donorId: userId }, { recipientId: userId }]
    }

    const donations = await Donation.find(query)
      .populate("donorId", "name email profile")
      .populate("recipientId", "name email profile")
      .populate("matchingCampaignId", "title matchRatio")
      .populate("challengeCampaignId", "title targetAmount")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Donation.countDocuments(query)

    // Calculate totals
    const totals = await Donation.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalMatched: { $sum: "$matchedAmount" },
          count: { $sum: 1 },
        },
      },
    ])

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      totals: totals[0] || { totalAmount: 0, totalMatched: 0, count: 0 },
    })
  } catch (error) {
    console.error("Donations fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    const donor = await User.findById(decoded.userId)

    if (!donor) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 })
    }

    const { recipientId, amount, message, isAnonymous, matchingCampaignId, challengeCampaignId } = await request.json()

    // Validate required fields
    if (!recipientId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Recipient and valid amount are required" }, { status: 400 })
    }

    // Verify recipient exists
    const recipient = await User.findById(recipientId)
    if (!recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Cannot donate to yourself
    if (donor._id.toString() === recipient._id.toString()) {
      return NextResponse.json({ error: "Cannot donate to yourself" }, { status: 400 })
    }

    let matchedAmount = 0
    let matchingCampaign = null
    let challengeCampaign = null

    // Handle matching campaign
    if (matchingCampaignId) {
      matchingCampaign = await MatchingCampaign.findById(matchingCampaignId)
      if (matchingCampaign && matchingCampaign.isCurrentlyActive()) {
        const availableMatch = matchingCampaign.remainingMatch
        const potentialMatch = amount * matchingCampaign.matchRatio
        matchedAmount = Math.min(potentialMatch, availableMatch)
      }
    }

    // Handle challenge campaign
    if (challengeCampaignId) {
      challengeCampaign = await ChallengeCampaign.findById(challengeCampaignId)
      if (challengeCampaign && challengeCampaign.isCurrentlyActive()) {
        // Challenge campaigns don't provide immediate matching, but track progress
      }
    }

    // Create donation record
    const donation = new Donation({
      donorId: donor._id,
      recipientId: recipient._id,
      amount,
      message: message || "",
      isAnonymous: isAnonymous || false,
      matchingCampaignId: matchingCampaign?._id,
      challengeCampaignId: challengeCampaign?._id,
      matchedAmount,
      status: "completed", // In real app, this would be 'pending' until payment processing
    })

    await donation.save()

    // Update matching campaign if applicable
    if (matchingCampaign && matchedAmount > 0) {
      matchingCampaign.currentMatched += matchedAmount
      matchingCampaign.totalDonations += amount
      matchingCampaign.donationCount += 1
      await matchingCampaign.save()
    }

    // Update challenge campaign if applicable
    if (challengeCampaign) {
      challengeCampaign.currentAmount += amount
      challengeCampaign.donationCount += 1

      // Check if challenge is met
      if (!challengeCampaign.isCompleted && challengeCampaign.currentAmount >= challengeCampaign.targetAmount) {
        challengeCampaign.isCompleted = true
        challengeCampaign.completedAt = new Date()

        // In a real app, you would trigger the bonus distribution here
      }

      await challengeCampaign.save()
    }

    // Award points to donor
    try {
      await fetch(`${process.env.NEXTAUTH_URL}/api/points/award`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "DONATION",
          userId: donor._id.toString(),
          customPoints: Math.floor(amount / 5), // 1 point per $5 donated
          metadata: {
            donationId: donation._id.toString(),
            amount,
            recipient: recipient.name,
          },
        }),
      })
    } catch (pointsError) {
      console.error("Failed to award donation points:", pointsError)
    }

    // Populate donation for response
    await donation.populate([
      { path: "donorId", select: "name email profile" },
      { path: "recipientId", select: "name email profile" },
      { path: "matchingCampaignId", select: "title matchRatio" },
      { path: "challengeCampaignId", select: "title targetAmount" },
    ])

    return NextResponse.json(
      {
        donation,
        matchedAmount,
        totalImpact: amount + matchedAmount,
        message:
          matchedAmount > 0
            ? `Your $${amount} donation was matched with an additional $${matchedAmount}!`
            : `Thank you for your $${amount} donation!`,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Donation creation error:", error)
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 })
  }
}
