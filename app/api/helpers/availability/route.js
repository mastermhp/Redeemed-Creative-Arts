import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = await User.findById(authResult.user._id)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      helper: {
        isAvailable: user.isHelper,
        skills: user.helperInfo?.skills || [],
        hourlyRate: user.helperInfo?.hourlyRate || "",
        availability: user.helperInfo?.availability || {
          monday: { available: false, hours: "" },
          tuesday: { available: false, hours: "" },
          wednesday: { available: false, hours: "" },
          thursday: { available: false, hours: "" },
          friday: { available: false, hours: "" },
          saturday: { available: false, hours: "" },
          sunday: { available: false, hours: "" },
        },
      },
    })
  } catch (error) {
    console.error("Helper availability GET error:", error)
    return NextResponse.json({ error: "Failed to fetch helper availability" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { isAvailable, skills, hourlyRate, availability } = await request.json()

    const user = await User.findByIdAndUpdate(
      authResult.user._id,
      {
        isHelper: isAvailable,
        helperInfo: {
          skills: skills || [],
          hourlyRate: hourlyRate || 0,
          availability: availability || {},
          rating: {
            average: 0,
            count: 0,
          },
        },
      },
      { new: true },
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Helper availability updated successfully",
      helper: {
        isAvailable: user.isHelper,
        skills: user.helperInfo?.skills || [],
        hourlyRate: user.helperInfo?.hourlyRate || "",
        availability: user.helperInfo?.availability || {},
      },
    })
  } catch (error) {
    console.error("Helper availability PUT error:", error)
    return NextResponse.json({ error: "Failed to update helper availability" }, { status: 500 })
  }
}
