import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 12
    const skills = searchParams.get("skills")
    const location = searchParams.get("location")
    const availability = searchParams.get("availability")
    const maxRate = searchParams.get("maxRate")
    const remote = searchParams.get("remote")

    // Build filter
    const filter = { isHelper: true, isActive: true }

    if (skills) {
      const skillsArray = skills.split(",")
      filter["helperInfo.skills"] = { $in: skillsArray }
    }

    if (availability && availability !== "all") {
      filter["helperInfo.availability.days"] = { $in: [availability] }
    }

    if (remote === "true") {
      filter["helperInfo.isRemoteAvailable"] = true
    }

    const skip = (page - 1) * limit

    const helpers = await User.find(filter)
      .select("name email profileImage location helperInfo points membership createdAt")
      .sort({ "helperInfo.rating.average": -1 })
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments(filter)

    // Get unique skills for filtering
    const allHelpers = await User.find({ isHelper: true, isActive: true }).select("helperInfo.skills")

    const uniqueSkills = [...new Set(allHelpers.flatMap((helper) => helper.helperInfo?.skills || []))].sort()

    return NextResponse.json({
      helpers,
      uniqueSkills,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Helpers API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
