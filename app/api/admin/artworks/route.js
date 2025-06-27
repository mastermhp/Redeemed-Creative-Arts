import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    // Build filter
    const filter = {}
    if (status && status !== "all") filter.status = status
    if (category && category !== "all") filter.category = category
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    const skip = (page - 1) * limit

    const artworks = await Artwork.find(filter)
      .populate("artist", "name email userType")
      .sort({ createdAt: -1 })
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
    console.error("Admin artworks API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession()

    if (!session || session.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { artworkId, action, data } = await request.json()

    const artwork = await Artwork.findById(artworkId).populate("artist")
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    switch (action) {
      case "approve":
        artwork.status = "approved"
        // Award points to artist
        const artist = await User.findById(artwork.artist._id)
        if (artist) {
          artist.points.current += 50 // Approval bonus
          artist.points.total += 50
          await artist.save()
        }
        break
      case "reject":
        artwork.status = "rejected"
        break
      case "feature":
        artwork.isFeatured = true
        artwork.pointsEarned.featured = 100
        artwork.pointsEarned.total += 100
        break
      case "unfeature":
        artwork.isFeatured = false
        artwork.pointsEarned.featured = 0
        artwork.pointsEarned.total -= 100
        break
      case "archive":
        artwork.status = "archived"
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    await artwork.save()

    return NextResponse.json({
      message: "Artwork updated successfully",
      artwork,
    })
  } catch (error) {
    console.error("Admin artwork update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
