import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Event from "@/models/Event"
import { getServerSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const events = await Event.find({ createdBy: session.userId })
      .populate("helpersBooked.helper", "name profileImage")
      .sort({ date: 1 })

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Church events error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const eventData = await request.json()
    await connectDB()

    const event = new Event({
      ...eventData,
      createdBy: session.userId,
      status: "active",
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
