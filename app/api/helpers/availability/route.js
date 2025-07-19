import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Helper from "@/models/Helper"
import User from "@/models/User"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { user } = authResult
    await connectDB()

    // Get helper availability for the authenticated user
    const helper = await Helper.findOne({ userId: user._id })

    let helperData = null
    if (helper) {
      helperData = {
        ...helper.toObject(),
        availability: typeof helper.availability === "string" ? JSON.parse(helper.availability) : helper.availability,
      }
    }

    return NextResponse.json({
      helper: helperData,
    })
  } catch (error) {
    console.error("Helper availability API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { user } = authResult
    await connectDB()

    const body = await request.json()
    const { isAvailable, skills, hourlyRate, availability } = body

    // Prepare availability data - convert object to JSON string if needed
    let availabilityData = availability
    if (typeof availability === "object" && availability !== null) {
      availabilityData = JSON.stringify(availability)
    }

    // Update or create helper profile
    const helper = await Helper.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id,
        isAvailable: isAvailable || false,
        skills: skills || [],
        hourlyRate: hourlyRate ? Number.parseFloat(hourlyRate) : null,
        availability: availabilityData || "{}",
        updatedAt: new Date(),
      },
      { upsert: true, new: true },
    )

    // Update user helper status
    const userDoc = await User.findById(user._id)
    if (userDoc) {
      userDoc.isHelper = isAvailable
      await userDoc.save()
    }

    return NextResponse.json({
      message: "Helper availability updated successfully",
      helper,
    })
  } catch (error) {
    console.error("Update helper availability API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET_ALL() {
  try {
    await connectDB()

    // Get all available helpers
    const helpers = await Helper.find({
      isAvailable: true,
      isApproved: true,
    })
      .populate("userId", "name email profileImage location")
      .sort({ createdAt: -1 })

    return NextResponse.json({ helpers })
  } catch (error) {
    console.error("Error fetching helpers:", error)
    return NextResponse.json({ error: "Failed to fetch helpers" }, { status: 500 })
  }
}
