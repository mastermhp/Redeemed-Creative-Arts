import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import User from "@/models/User"
import MatchingCampaign from "@/models/MatchingCampaign"
import ChallengeCampaign from "@/models/ChallengeCampaign"
import Notification from "@/models/Notification"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const userId = searchParams.get("userId")
    const type = searchParams.get("type") // 'sent' or 'received'

    const filter = { status: "completed" }

    if (userId && type === "sent") {
      filter.donorId = userId
    } else if (userId && type === "received") {
      filter.recipientId = userId
    }

    const skip = (page - 1) * limit

    const donations = await Donation.find(filter)
      .populate("donorId", "name email userType")
      .populate("recipientId", "name email userType")
      .populate("matchingCampaignId", "title matchRatio")
      .populate("challengeCampaignId", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Donation.countDocuments(filter)

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Donations API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { recipientId, amount, message, isAnonymous, matchingCampaignId, challengeCampaignId } = await request.json()

    if (!recipientId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid donation data" }, { status: 400 })
    }

    // Verify recipient exists
    const recipient = await User.findById(recipientId)
    if (!recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Calculate matching if applicable
    let matchedAmount = 0
    let matchingCampaign = null

    if (matchingCampaignId) {
      matchingCampaign = await MatchingCampaign.findById(matchingCampaignId)
      if (matchingCampaign && matchingCampaign.isCurrentlyActive()) {
        matchedAmount = matchingCampaign.calculateMatch(amount)
      }
    }

    // Create donation
    const donation = new Donation({
      donorId: session.userId,
      recipientId,
      amount,
      message: message || "",
      isAnonymous: isAnonymous || false,
      matchingCampaignId: matchingCampaignId || null,
      challengeCampaignId: challengeCampaignId || null,
      matchedAmount,
      status: "completed", // In real app, this would be 'pending' until payment processed
      paymentMethod: "credit_card",
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      netAmount: amount,
    })

    await donation.save()

    // Update matching campaign if applicable
    if (matchingCampaign && matchedAmount > 0) {
      await matchingCampaign.processMatch(amount, matchedAmount)
    }

    // Update challenge campaign if applicable
    if (challengeCampaignId) {
      const challengeCampaign = await ChallengeCampaign.findById(challengeCampaignId)
      if (challengeCampaign && challengeCampaign.isCurrentlyActive()) {
        challengeCampaign.currentAmount += amount
        challengeCampaign.donationCount += 1

        // Check if challenge is met
        if (challengeCampaign.isChallengeMet() && !challengeCampaign.isCompleted) {
          challengeCampaign.isCompleted = true
          challengeCampaign.completedAt = new Date()
        }

        await challengeCampaign.save()
      }
    }

    // Award points to donor
    const donor = await User.findById(session.userId)
    if (donor) {
      const pointsEarned = Math.floor(amount) // 1 point per dollar
      donor.points.current += pointsEarned
      donor.points.total += pointsEarned
      await donor.save()
    }

    // Create notification for recipient
    if (!isAnonymous) {
      const notification = new Notification({
        recipient: recipientId,
        type: "donation_received",
        title: "New Donation Received!",
        message: `You received a $${amount} donation${matchedAmount > 0 ? ` (+ $${matchedAmount} match)` : ""}`,
        relatedUser: session.userId,
        data: {
          donationId: donation._id,
          amount,
          matchedAmount,
          totalImpact: amount + matchedAmount,
        },
        priority: "high",
      })
      await notification.save()
    }

    return NextResponse.json({
      message: "Donation processed successfully",
      donation: {
        ...donation.toObject(),
        totalImpact: amount + matchedAmount,
      },
    })
  } catch (error) {
    console.error("Donation processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
