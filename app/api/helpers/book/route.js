import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function POST(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { helperId, eventDate, eventTime, duration, description, location, requirements, budget, isPaid } =
      await request.json()

    // Validate input
    if (!helperId || !eventDate || !description) {
      return NextResponse.json({ error: "Helper ID, event date, and description are required" }, { status: 400 })
    }

    // Find church and helper
    const [church, helper] = await Promise.all([User.findById(decoded.userId), User.findById(helperId)])

    if (!church) {
      return NextResponse.json({ error: "Church not found" }, { status: 404 })
    }

    if (church.userType !== "church") {
      return NextResponse.json({ error: "Only churches can book helpers" }, { status: 403 })
    }

    if (!helper || !helper.isHelper) {
      return NextResponse.json({ error: "Helper not found" }, { status: 404 })
    }

    // Check if helper is available for paid work if this is a paid booking
    if (isPaid && !helper.helperInfo.isPaid) {
      return NextResponse.json({ error: "This helper only offers free services" }, { status: 400 })
    }

    // Award experience points to both users
    church.awardExperience(25, "helper_booking")
    helper.awardExperience(50, "helper_booked")

    await Promise.all([church.save(), helper.save()])

    // Create booking record in a separate Booking model
    // For now, we'll create a simplified booking system

    const booking = {
      id: `booking_${Date.now()}`, // Temporary ID
      helperId,
      churchId: church._id,
      eventDate,
      eventTime,
      duration,
      description,
      location,
      requirements,
      budget,
      isPaid,
      status: "pending",
      createdAt: new Date(),
    }

    // TODO: Send notifications to both users
    // TODO: Create calendar events
    // TODO: Handle payment processing if paid

    return NextResponse.json({
      success: true,
      booking,
      message: "Booking request sent successfully",
    })
  } catch (error) {
    console.error("Helper booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
