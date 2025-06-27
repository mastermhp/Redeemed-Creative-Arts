import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || session.userId
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 12
    const status = searchParams.get("status")
    const sortBy = searchParams.get("sortBy") || "newest"

    // Verify user access
    const user = await User.findById(userId)
    if (!user || (user.userType !== "artist" && session.userType !== "admin")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Build filter
    const filter = { artist: user._id }
    if (status && status !== "all") {
      filter.status = status
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
      default:
        sort = { createdAt: -1 }
    }

    const skip = (page - 1) * limit

    const artworks = await Artwork.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("artist", "name email profileImage")

    const total = await Artwork.countDocuments(filter)

    // Transform artworks for frontend
    const transformedArtworks = artworks.map((artwork) => ({
      id: artwork._id,
      title: artwork.title,
      description: artwork.description,
      category: artwork.category,
      status: artwork.status,
      views: artwork.engagement.views,
      likes: artwork.engagement.likes,
      earnings: artwork.pointsEarned.total,
      image: artwork.images[0]?.url || "/placeholder.svg?height=200&width=300",
      createdAt: artwork.createdAt.toISOString().split("T")[0],
      isFeatured: artwork.isFeatured,
      price: artwork.pricing?.price || 0,
      tags: artwork.tags,
    }))

    return NextResponse.json({
      artworks: transformedArtworks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Artist artworks API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
