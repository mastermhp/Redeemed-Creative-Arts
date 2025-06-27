import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Event from "@/models/Event"
import Donation from "@/models/Donation"
import Helper from "@/models/Helper"
import { getServerSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get church user data
    const church = await User.findById(session.userId)
    if (!church) {
      return NextResponse.json({ error: "Church not found" }, { status: 404 })
    }

    // Get events created by this church
    const events = await Event.find({ createdBy: session.userId })
    const upcomingEvents = events.filter((event) => new Date(event.date) > new Date())
    const eventsThisMonth = events.filter((event) => {
      const eventDate = new Date(event.date)
      const now = new Date()
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()
    })

    // Get helpers available in the church's area
    const availableHelpers = await Helper.find({
      availability: "available",
      isActive: true,
    }).populate("userId", "name location")

    // Get donations related to church campaigns
    const donations = await Donation.find({
      recipientId: session.userId,
      status: "completed",
    })
    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0)

    // Calculate community reach (estimated based on events and attendees)
    const communityReach = events.reduce((sum, event) => sum + (event.expectedAttendees || 0), 0)

    // Get active campaigns count
    const activeCampaigns = await Donation.distinct("campaignId", {
      recipientId: session.userId,
      status: { $in: ["pending", "active"] },
    })

    const stats = {
      upcomingEvents: upcomingEvents.length,
      totalHelpers: availableHelpers.length,
      activeCampaigns: activeCampaigns.length,
      totalRaised: Math.round(totalRaised),
      eventsThisMonth: eventsThisMonth.length,
      helpersBooked: events.reduce((sum, event) => sum + (event.helpersBooked || 0), 0),
      communityReach: communityReach,
      artworksCommissioned: events.filter((event) => event.category === "artwork").length,
    }

    // Get recent activity
    const recentActivity = [
      ...events.slice(-5).map((event) => ({
        description: `Event "${event.title}" scheduled for ${new Date(event.date).toLocaleDateString()}`,
        timestamp: event.createdAt,
        type: "event",
      })),
      ...donations.slice(-5).map((donation) => ({
        description: `Received $${donation.amount} donation`,
        timestamp: donation.createdAt,
        type: "donation",
      })),
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)

    return NextResponse.json({
      stats,
      recentActivity: recentActivity.map((activity) => ({
        ...activity,
        timestamp: new Date(activity.timestamp).toLocaleDateString(),
      })),
    })
  } catch (error) {
    console.error("Church stats error:", error)
    return NextResponse.json({ error: "Failed to fetch church stats" }, { status: 500 })
  }
}
