import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Helper from "@/models/Helper"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId)
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Artist access required" }, { status: 403 })
    }

    // Get helper bookings for this artist
    const bookings = await Helper.find({
      helperId: session.userId,
    })
      .populate("clientId", "name email profileImage")
      .sort({ createdAt: -1 })

    // Calculate helper stats
    const totalBookings = bookings.length
    const completedBookings = bookings.filter((b) => b.status === "completed").length
    const totalEarnings = bookings
      .filter((b) => b.status === "completed")
      .reduce((sum, booking) => sum + (booking.amount || 0), 0)

    const avgRating = user.helperInfo?.rating?.average || 0
    const totalReviews = user.helperInfo?.rating?.count || 0

    return NextResponse.json({
      bookings,
      stats: {
        totalBookings,
        completedBookings,
        totalEarnings,
        avgRating,
        totalReviews,
      },
      helperInfo: user.helperInfo,
      isHelper: user.isHelper,
    })
  } catch (error) {
    console.error("Artist helper API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId)
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Artist access required" }, { status: 403 })
    }

    const data = await request.json()
    const { isHelper, skills, hourlyRate, availability } = data

    // Update helper status and info
    user.isHelper = isHelper
    user.helperInfo = user.helperInfo || {}

    if (isHelper) {
      user.helperInfo.skills = skills || []
      user.helperInfo.hourlyRate = hourlyRate || 0
      user.helperInfo.availability = availability || ""
    }

    await user.save()

    return NextResponse.json({
      message: "Helper settings updated successfully",
      isHelper: user.isHelper,
      helperInfo: user.helperInfo,
    })
  } catch (error) {
    console.error("Update helper settings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
