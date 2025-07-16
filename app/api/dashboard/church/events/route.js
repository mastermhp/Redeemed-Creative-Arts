import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Event from "@/models/Event"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    if (authResult.user.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const events = await Event.find({ organizer: authResult.user._id })
      .populate("helpers", "name profileImage")
      .sort({ date: 1 })

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Church events error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    if (authResult.user.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const eventData = await request.json()
    await connectDB()

    const event = new Event({
      ...eventData,
      organizer: authResult.user._id,
      status: "active",
      date: new Date(eventData.startDate),
      endDate: eventData.endDate ? new Date(eventData.endDate) : null,
    })

    await event.save()

    return NextResponse.json(
      {
        message: "Event created successfully",
        event,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create event error:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
