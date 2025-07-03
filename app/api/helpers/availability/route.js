import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Helper from "@/models/Helper"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const helper = await Helper.findOne({ user: authResult.user._id }).populate("user", "name email profileImage")

    if (!helper) {
      return NextResponse.json({ error: "Helper profile not found" }, { status: 404 })
    }

    return NextResponse.json({ helper })
  } catch (error) {
    console.error("Fetch helper availability error:", error)
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

    const { availability, skills, hourlyRate, isAvailable } = await request.json()

    const helper = await Helper.findOneAndUpdate(
      { user: authResult.user._id },
      {
        availability,
        skills,
        hourlyRate,
        isAvailable,
        updatedAt: new Date(),
      },
      { new: true, upsert: true },
    ).populate("user", "name email profileImage")

    return NextResponse.json({
      message: "Helper availability updated successfully",
      helper,
    })
  } catch (error) {
    console.error("Update helper availability error:", error)
    return NextResponse.json({ error: "Failed to update helper availability" }, { status: 500 })
  }
}
