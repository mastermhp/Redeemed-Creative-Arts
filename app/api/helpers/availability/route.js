import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Helper from "@/models/Helper"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const helper = await Helper.findOne({ userId: session.userId }).populate("userId", "name email")

    if (!helper) {
      return NextResponse.json({ error: "Helper profile not found" }, { status: 404 })
    }

    return NextResponse.json({ helper })
  } catch (error) {
    console.error("Get helper availability error:", error)
    return NextResponse.json({ error: "Failed to fetch helper availability" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { availability, skills, hourlyRate, serviceRadius, isRemoteAvailable, specializations } = await request.json()

    let helper = await Helper.findOne({ userId: session.userId })

    if (!helper) {
      // Create new helper profile
      helper = new Helper({
        userId: session.userId,
        skills: skills || [],
        availability: availability || "flexible",
        hourlyRate: hourlyRate || 0,
        serviceRadius: serviceRadius || 25,
        isRemoteAvailable: isRemoteAvailable !== undefined ? isRemoteAvailable : true,
        specializations: specializations || [],
      })

      // Update user to mark as helper
      await User.findByIdAndUpdate(session.userId, { isHelper: true })
    } else {
      // Update existing helper profile
      if (availability) helper.availability = availability
      if (skills) helper.skills = skills
      if (hourlyRate !== undefined) helper.hourlyRate = hourlyRate
      if (serviceRadius !== undefined) helper.serviceRadius = serviceRadius
      if (isRemoteAvailable !== undefined) helper.isRemoteAvailable = isRemoteAvailable
      if (specializations) helper.specializations = specializations
    }

    await helper.save()

    return NextResponse.json({
      message: "Helper availability updated successfully",
      helper,
    })
  } catch (error) {
    console.error("Update helper availability error:", error)
    return NextResponse.json({ error: "Failed to update helper availability" }, { status: 500 })
  }
}
