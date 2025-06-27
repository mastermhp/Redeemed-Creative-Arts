import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Helper from "@/models/Helper"
import { getServerSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "church") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const helpers = await Helper.find({
      isActive: true,
      availability: { $in: ["available", "busy"] },
    }).populate("userId", "name profileImage location")

    const formattedHelpers = helpers.map((helper) => ({
      id: helper._id,
      name: helper.userId.name,
      skills: helper.skills,
      rating: helper.rating.average,
      completedJobs: helper.completedJobs,
      availability: helper.availability,
      hourlyRate: helper.hourlyRate,
      avatar: helper.userId.profileImage || "/placeholder.svg?height=50&width=50",
      distance: "2.3 miles", // You can calculate this based on coordinates
      lastWorked: helper.lastJobDate?.toISOString().split("T")[0] || "2024-01-20",
      tier: helper.tier || "tier1",
      specialties: helper.specialties || [],
    }))

    return NextResponse.json({ helpers: formattedHelpers })
  } catch (error) {
    console.error("Church helpers error:", error)
    return NextResponse.json({ error: "Failed to fetch helpers" }, { status: 500 })
  }
}
