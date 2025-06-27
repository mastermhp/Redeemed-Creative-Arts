import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 12
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const artistId = searchParams.get("artistId")
    const sortBy = searchParams.get("sortBy") || "newest"

    // Build filter
    const filter = { status: "approved" }
    if (category && category !== "all") filter.category = category
    if (featured === "true") filter.isFeatured = true
    if (artistId) filter.artist = artistId
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Build sort
    let sort = {}
    switch (sortBy) {
      case "newest":
        sort = { createdAt: -1 }
        break
      case "oldest":
        sort = { createdAt: 1 }
        break
      case "popular":
        sort = { "engagement.likes": -1 }
        break
      case "views":
        sort = { "engagement.views": -1 }
        break
      case "price_low":
        sort = { "pricing.price": 1 }
        break
      case "price_high":
        sort = { "pricing.price": -1 }
        break
      default:
        sort = { createdAt: -1 }
    }

    const skip = (page - 1) * limit

    const artworks = await Artwork.find(filter)
      .populate("artist", "name email userType profileImage location")
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const total = await Artwork.countDocuments(filter)

    return NextResponse.json({
      artworks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Artworks API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const artworkData = await request.json()

    // Verify user is an artist
    const user = await User.findById(session.userId)
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Only artists can upload artwork" }, { status: 403 })
    }

    // Check for AI art confirmation
    if (!user.agreements.noAIConfirmation) {
      return NextResponse.json(
        {
          error: "Please confirm that your artwork is not AI-generated",
          requiresAgreement: true,
        },
        { status: 400 },
      )
    }

    const artwork = new Artwork({
      ...artworkData,
      artist: session.userId,
      status: "pending",
      pointsEarned: {
        upload: 50,
        total: 50,
      },
    })

    await artwork.save()

    // Award upload points to artist
    user.points.current += 50
    user.points.total += 50
    await user.save()

    return NextResponse.json({
      message: "Artwork uploaded successfully",
      artwork,
    })
  } catch (error) {
    console.error("Artwork upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
