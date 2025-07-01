import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const category = searchParams.get("category") || ""

    const skip = (page - 1) * limit

    // Build filter query
    const filter = {}

    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    if (status) {
      filter.status = status
    }

    if (category) {
      filter.category = category
    }

    const artworks = await Artwork.find(filter)
      .populate("artist", "name email")
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
    console.error("Error fetching artworks:", error)
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, category, imageUrl, artist, price, status = "pending" } = body

    const artwork = new Artwork({
      title,
      description,
      category,
      imageUrl,
      artist,
      price,
      status,
      createdAt: new Date(),
    })

    await artwork.save()
    await artwork.populate("artist", "name email")

    return NextResponse.json(artwork, { status: 201 })
  } catch (error) {
    console.error("Error creating artwork:", error)
    return NextResponse.json({ error: "Failed to create artwork" }, { status: 500 })
  }
}
