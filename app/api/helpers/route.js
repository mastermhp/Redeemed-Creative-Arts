import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const skills = searchParams.get("skills")?.split(",") || []
    const location = searchParams.get("location")
    const radius = Number.parseInt(searchParams.get("radius")) || 50
    const isPaid = searchParams.get("isPaid") === "true"
    const badge = searchParams.get("badge") // none, silver, gold
    const sort = searchParams.get("sort") || "rating" // rating, distance, recent
    const limit = Number.parseInt(searchParams.get("limit")) || 20
    const page = Number.parseInt(searchParams.get("page")) || 1

    // Build query
    const query = {
      isHelper: true,
      isActive: true,
    }

    if (skills.length > 0) {
      query["helperInfo.skills"] = { $in: skills }
    }

    if (isPaid !== undefined) {
      query["helperInfo.isPaid"] = isPaid
    }

    if (badge && badge !== "none") {
      query["helperInfo.badge"] = badge
    }

    // Build sort
    let sortQuery = {}
    switch (sort) {
      case "rating":
        sortQuery = { "helperInfo.rating.average": -1, "helperInfo.rating.count": -1 }
        break
      case "recent":
        sortQuery = { updatedAt: -1 }
        break
      default:
        sortQuery = { "helperInfo.rating.average": -1 }
    }

    const helpers = await User.find(query)
      .select("name profileImage location helperInfo userType createdAt")
      .sort(sortQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    // TODO: Add distance calculation if location is provided

    const total = await User.countDocuments(query)

    return NextResponse.json({
      helpers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Helpers fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

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

    const { skills, availability, isPaid, rates, willingToTravel, travelDistance } = await request.json()

    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user has accepted helper agreement
    if (!user.agreements.helperAgreement) {
      return NextResponse.json(
        {
          error: "Helper agreement must be accepted first",
        },
        { status: 400 },
      )
    }

    // Update helper info
    user.isHelper = true
    user.helperInfo = {
      ...user.helperInfo,
      skills: skills || [],
      availability: {
        hoursPerWeek: availability?.hoursPerWeek || "none",
        days: availability?.days || [],
        hours: availability?.hours || "",
        willingToTravel: willingToTravel || false,
        travelDistance: travelDistance || 0,
      },
      isPaid: isPaid || false,
      rates: rates || {},
    }

    // Set badge based on membership tier
    if (user.membership.tier === "tier_2" || user.membership.tier === "pro_plus") {
      user.helperInfo.badge = "gold"
    } else if (user.membership.tier === "tier_1" || user.membership.tier === "pro") {
      user.helperInfo.badge = "silver"
    } else {
      user.helperInfo.badge = "none"
    }

    await user.save()

    return NextResponse.json({
      success: true,
      helper: {
        id: user._id,
        name: user.name,
        profileImage: user.profileImage,
        helperInfo: user.helperInfo,
        userType: user.userType,
      },
    })
  } catch (error) {
    console.error("Helper registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
