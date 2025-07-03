import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import CommunityImpact from "@/models/CommunityImpact"
import Event from "@/models/Event"
import Donation from "@/models/Donation"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "monthly"

    // Get current period impact
    const now = new Date()
    let startDate, endDate

    switch (period) {
      case "daily":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
        break
      case "weekly":
        const dayOfWeek = now.getDay()
        startDate = new Date(now.getTime() - dayOfWeek * 24 * 60 * 60 * 1000)
        startDate.setHours(0, 0, 0, 0)
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        break
      case "yearly":
        startDate = new Date(now.getFullYear(), 0, 1)
        endDate = new Date(now.getFullYear() + 1, 0, 1)
        break
      default: // monthly
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    }

    // Calculate real-time metrics
    const events = await Event.find({
      createdBy: session.userId,
      createdAt: { $gte: startDate, $lt: endDate },
    })

    const donations = await Donation.find({
      recipientId: session.userId,
      createdAt: { $gte: startDate, $lt: endDate },
      status: "completed",
    })

    const helpersBooked = await Event.aggregate([
      {
        $match: {
          createdBy: session.userId,
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalHelpers: { $sum: { $size: "$helpersBooked" } },
        },
      },
    ])

    const metrics = {
      eventsHosted: events.length,
      attendeesReached: events.reduce((sum, event) => sum + (event.currentAttendees || 0), 0),
      artistsSupported: new Set(donations.map((d) => d.donorId?.toString())).size,
      donationsReceived: donations.length,
      totalDonationAmount: donations.reduce((sum, donation) => sum + donation.amount, 0),
      helpersBooked: helpersBooked[0]?.totalHelpers || 0,
      campaignsCreated: await Donation.distinct("campaignId", {
        recipientId: session.userId,
        createdAt: { $gte: startDate, $lt: endDate },
      }).length,
      communityEngagement: events.reduce((sum, event) => sum + (event.expectedAttendees || 0), 0),
      artworksCommissioned: events.filter((event) => event.categories?.includes("Exhibition")).length,
      volunteerHours: helpersBooked[0]?.totalHelpers * 4 || 0, // Estimate 4 hours per helper
    }

    // Get or create impact record
    let impact = await CommunityImpact.findOne({
      church: session.userId,
      period,
      date: startDate,
    })

    if (!impact) {
      impact = new CommunityImpact({
        church: session.userId,
        period,
        date: startDate,
        metrics,
      })
      await impact.save()
    } else {
      impact.metrics = metrics
      await impact.save()
    }

    // Get historical data for comparison
    const previousPeriodStart = new Date(startDate)
    const previousPeriodEnd = new Date(endDate)

    switch (period) {
      case "daily":
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 1)
        previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 1)
        break
      case "weekly":
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 7)
        previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 7)
        break
      case "yearly":
        previousPeriodStart.setFullYear(previousPeriodStart.getFullYear() - 1)
        previousPeriodEnd.setFullYear(previousPeriodEnd.getFullYear() - 1)
        break
      default: // monthly
        previousPeriodStart.setMonth(previousPeriodStart.getMonth() - 1)
        previousPeriodEnd.setMonth(previousPeriodEnd.getMonth() - 1)
    }

    const previousImpact = await CommunityImpact.findOne({
      church: session.userId,
      period,
      date: previousPeriodStart,
    })

    // Calculate growth percentages
    const growth = {}
    if (previousImpact) {
      Object.keys(metrics).forEach((key) => {
        const current = metrics[key] || 0
        const previous = previousImpact.metrics[key] || 0
        growth[key] = previous > 0 ? ((current - previous) / previous) * 100 : current > 0 ? 100 : 0
      })
    }

    return NextResponse.json({
      impact,
      growth,
      period,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    })
  } catch (error) {
    console.error("Get community impact error:", error)
    return NextResponse.json({ error: "Failed to fetch community impact" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { goals, period } = await request.json()

    const now = new Date()
    let startDate

    switch (period) {
      case "daily":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case "weekly":
        const dayOfWeek = now.getDay()
        startDate = new Date(now.getTime() - dayOfWeek * 24 * 60 * 60 * 1000)
        startDate.setHours(0, 0, 0, 0)
        break
      case "yearly":
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default: // monthly
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    const impact = await CommunityImpact.findOneAndUpdate(
      {
        church: session.userId,
        period,
        date: startDate,
      },
      {
        $set: { goals },
      },
      {
        new: true,
        upsert: true,
      },
    )

    return NextResponse.json({
      message: "Goals updated successfully",
      impact,
    })
  } catch (error) {
    console.error("Update community impact goals error:", error)
    return NextResponse.json({ error: "Failed to update goals" }, { status: 500 })
  }
}
