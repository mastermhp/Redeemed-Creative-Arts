import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import Challenge from "@/models/Challenge"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // "challenge" or "matching" or "all"
    const status = searchParams.get("status") || "active"
    const sort = searchParams.get("sort") || "recent" // "recent", "popular", "ending_soon"
    const limit = Number.parseInt(searchParams.get("limit")) || 20
    const page = Number.parseInt(searchParams.get("page")) || 1

    // Build query
    const query = { status }
    if (type && type !== "all") {
      query.type = type
    }

    // Build sort
    let sortQuery = {}
    switch (sort) {
      case "popular":
        sortQuery = { "stats.uniqueDonors": -1, "stats.totalDonations": -1 }
        break
      case "ending_soon":
        sortQuery = { endDate: 1 }
        break
      case "recent":
      default:
        sortQuery = { createdAt: -1 }
        break
    }

    const challenges = await Challenge.find(query)
      .sort(sortQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("createdBy", "name profileImage userType churchInfo.organizationName")
      .lean()

    // Add computed fields
    const enrichedChallenges = challenges.map((challenge) => ({
      ...challenge,
      progressPercentage:
        challenge.type === "challenge"
          ? Math.min((challenge.currentAmount / challenge.goalAmount) * 100, 100)
          : Math.min((challenge.matchingUsed / challenge.matchingLimit) * 100, 100),
      daysRemaining: Math.max(Math.ceil((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24)), 0),
      remaining:
        challenge.type === "challenge"
          ? Math.max(challenge.goalAmount - challenge.currentAmount, 0)
          : Math.max(challenge.matchingLimit - challenge.matchingUsed, 0),
    }))

    const total = await Challenge.countDocuments(query)

    return NextResponse.json({
      challenges: enrichedChallenges,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Challenges fetch error:", error)
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

    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only churches can create challenges
    if (user.userType !== "church") {
      return NextResponse.json({ error: "Only churches can create challenges" }, { status: 403 })
    }

    const {
      title,
      description,
      type,
      goalAmount,
      matchingRatio,
      matchingLimit,
      sponsorMatchAmount,
      beneficiary,
      category,
      endDate,
      images,
      featuredImage,
    } = await request.json()

    // Validate required fields
    if (!title || !description || !type || !beneficiary || !category || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user can create more challenges this month
    const canCreate = await Challenge.canCreateChallenge(user._id, type)
    if (!canCreate) {
      return NextResponse.json(
        {
          error: "Monthly challenge limit reached for your membership tier",
        },
        { status: 403 },
      )
    }

    // Validate type-specific fields
    if (type === "challenge" && !goalAmount) {
      return NextResponse.json({ error: "Goal amount is required for challenges" }, { status: 400 })
    }

    if (type === "matching" && (!matchingLimit || !matchingRatio)) {
      return NextResponse.json(
        { error: "Matching limit and ratio are required for matching donations" },
        { status: 400 },
      )
    }

    // Create challenge
    const challenge = new Challenge({
      title,
      description,
      type,
      goalAmount: type === "challenge" ? goalAmount : undefined,
      matchingRatio: type === "matching" ? matchingRatio : undefined,
      matchingLimit: type === "matching" ? matchingLimit : undefined,
      sponsorMatchAmount: sponsorMatchAmount || 0,
      createdBy: user._id,
      beneficiary,
      category,
      endDate: new Date(endDate),
      images: images || [],
      featuredImage,
      rewards: {
        experiencePoints: 100,
        faithCoins: 50,
        badges: ["challenge_contributor"],
      },
    })

    await challenge.save()

    // Populate creator info
    await challenge.populate("createdBy", "name profileImage userType churchInfo.organizationName")

    return NextResponse.json({
      success: true,
      challenge,
    })
  } catch (error) {
    console.error("Challenge creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
