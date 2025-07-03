import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import CommunityImpact from "@/models/CommunityImpact"
import Donation from "@/models/Donation"
import Event from "@/models/Event"
import Helper from "@/models/Helper"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    if (authResult.user.userType !== "church") {
      return NextResponse.json({ error: "Access denied. Church account required." }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "monthly"
    const year = Number.parseInt(searchParams.get("year")) || new Date().getFullYear()
    const month = Number.parseInt(searchParams.get("month")) || new Date().getMonth() + 1

    // Calculate date range based on period
    let startDate, endDate
    if (period === "monthly") {
      startDate = new Date(year, month - 1, 1)
      endDate = new Date(year, month, 0)
    } else if (period === "yearly") {
      startDate = new Date(year, 0, 1)
      endDate = new Date(year, 11, 31)
    }

    // Get or create community impact record
    let impact = await CommunityImpact.findOne({
      church: authResult.user._id,
      period,
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    })

    if (!impact) {
      // Calculate metrics from actual data
      const donations = await Donation.find({
        church: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      })

      const events = await Event.find({
        organizer: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      })

      const helpers = await Helper.find({
        bookedBy: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      })

      const metrics = {
        artistsSupported: new Set(donations.map((d) => d.artist?.toString())).size,
        totalDonations: donations.reduce((sum, d) => sum + d.amount, 0),
        eventsHosted: events.length,
        helpersBooked: helpers.length,
        communityEngagement: donations.length + events.length + helpers.length,
        artworksPromoted: 0, // This would need to be tracked separately
        coursesSponsored: 0, // This would need to be tracked separately
      }

      impact = new CommunityImpact({
        church: authResult.user._id,
        period,
        startDate,
        endDate,
        metrics,
        goals: {
          artistsSupported: { target: 10, achieved: metrics.artistsSupported },
          totalDonations: { target: 1000, achieved: metrics.totalDonations },
          eventsHosted: { target: 5, achieved: metrics.eventsHosted },
          helpersBooked: { target: 20, achieved: metrics.helpersBooked },
        },
      })

      await impact.save()
    }

    return NextResponse.json({ impact })
  } catch (error) {
    console.error("Fetch community impact error:", error)
    return NextResponse.json({ error: "Failed to fetch community impact" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    if (authResult.user.userType !== "church") {
      return NextResponse.json({ error: "Access denied. Church account required." }, { status: 403 })
    }

    const { impactId, goals, notes } = await request.json()

    const impact = await CommunityImpact.findOneAndUpdate(
      { _id: impactId, church: authResult.user._id },
      { goals, notes },
      { new: true },
    )

    if (!impact) {
      return NextResponse.json({ error: "Community impact record not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Community impact updated successfully",
      impact,
    })
  } catch (error) {
    console.error("Update community impact error:", error)
    return NextResponse.json({ error: "Failed to update community impact" }, { status: 500 })
  }
}
