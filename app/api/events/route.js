import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Event from "@/models/Event"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 12
    const category = searchParams.get("category")
    const location = searchParams.get("location")
    const upcoming = searchParams.get("upcoming")
    const organizerId = searchParams.get("organizerId")

    // Build filter
    const filter = { isPublic: true, status: "active" }

    if (category && category !== "all") {
      filter.categories = { $in: [category] }
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }
    }

    if (upcoming === "true") {
      filter.date = { $gte: new Date() }
    }

    if (organizerId) {
      filter.organizer = organizerId
    }

    const skip = (page - 1) * limit

    const events = await Event.find(filter)
      .populate("organizer", "name email userType profileImage")
      .populate("helpers.helperId", "name email profileImage")
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit)

    const total = await Event.countDocuments(filter)

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Events API error:", error)
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

    const eventData = await request.json()

    const event = new Event({
      ...eventData,
      organizer: session.userId,
      status: "draft",
    })

    await event.save()

    return NextResponse.json({
      message: "Event created successfully",
      event,
    })
  } catch (error) {
    console.error("Event creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
