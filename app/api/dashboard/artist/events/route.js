import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import { uploadImage } from "@/lib/cloudinary"
import Event from "@/models/Event"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    const events = await Event.find({ organizer: user._id })
      .sort({ createdAt: -1 })
      .select("title description type date endDate location status maxAttendees currentAttendees images")
      .lean()

    const formattedEvents = events.map((event) => ({
      id: event._id,
      title: event.title,
      description: event.description,
      type: event.type,
      startDate: event.date,
      endDate: event.endDate,
      location: event.location,
      status: event.status,
      attendeeCount: event.currentAttendees || 0,
      maxAttendees: event.maxAttendees,
      banner: event.images?.[0] || null,
    }))

    return NextResponse.json({ events: formattedEvents })
  } catch (error) {
    console.error("Fetch events error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    const formData = await request.formData()

    const title = formData.get("title")
    const description = formData.get("description")
    const type = formData.get("type")
    const startDate = formData.get("startDate")
    const endDate = formData.get("endDate")
    const location = formData.get("location")

    if (!title || !description || !type || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let banner = null
    const bannerFile = formData.get("banner")
    if (bannerFile && bannerFile.size > 0) {
      const bytes = await bannerFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      banner = await uploadImage(buffer, { folder: "events/banners" })
    }

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      organizer: user._id,
      categories: [type],
      date: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      location: location?.trim() || "Online",
      images: banner ? [banner.url] : [],
      status: "draft",
      currentAttendees: 0,
      maxAttendees: 100,
      isPublic: true,
    }

    const event = new Event(eventData)
    await event.save()

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: {
          id: event._id,
          title: event.title,
          status: event.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create event error:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
