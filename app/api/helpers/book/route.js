import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Event from "@/models/Event"
import Notification from "@/models/Notification"
import { getServerSession } from "@/lib/auth"

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { helperId, eventId, message, role } = await request.json()

    if (!helperId || !eventId) {
      return NextResponse.json({ error: "Helper ID and Event ID are required" }, { status: 400 })
    }

    // Verify helper exists and is active
    const helper = await User.findById(helperId)
    if (!helper || !helper.isHelper || !helper.isActive) {
      return NextResponse.json({ error: "Helper not found or inactive" }, { status: 404 })
    }

    // Verify event exists and user is organizer
    const event = await Event.findById(eventId)
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    if (event.organizer.toString() !== session.userId) {
      return NextResponse.json({ error: "Only event organizer can book helpers" }, { status: 403 })
    }

    // Check if helper is already booked for this event
    const isAlreadyBooked = event.helpers.some((h) => h.helperId && h.helperId.toString() === helperId)

    if (isAlreadyBooked) {
      return NextResponse.json({ error: "Helper is already booked for this event" }, { status: 400 })
    }

    // Add helper to event
    event.helpers.push({
      helperId,
      role: role || "assistant",
      status: "pending",
      bookedAt: new Date(),
      message,
    })

    await event.save()

    // Create notification for helper
    const notification = new Notification({
      recipient: helperId,
      type: "helper_booking",
      title: "New Helper Booking Request",
      message: `You've been requested to help with "${event.title}"`,
      relatedUser: session.userId,
      data: {
        eventId,
        eventTitle: event.title,
        role: role || "assistant",
        message,
      },
      priority: "high",
    })

    await notification.save()

    return NextResponse.json({
      message: "Helper booking request sent successfully",
    })
  } catch (error) {
    console.error("Helper booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
