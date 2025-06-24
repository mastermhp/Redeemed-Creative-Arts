import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import { withAuth } from "@/lib/middleware"
import { uploadMultipleImages } from "@/lib/cloudinary"

// GET - Fetch artworks with filtering and pagination
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 12
    const category = searchParams.get("category")
    const artist = searchParams.get("artist")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "newest"

    // Build query
    const query = { status: "approved" }

    if (category && category !== "all") {
      query.category = category
    }

    if (artist) {
      query.artist = artist
    }

    if (featured === "true") {
      query.isFeatured = true
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Build sort
    let sortQuery = {}
    switch (sort) {
      case "newest":
        sortQuery = { createdAt: -1 }
        break
      case "oldest":
        sortQuery = { createdAt: 1 }
        break
      case "popular":
        sortQuery = { "engagement.likes": -1 }
        break
      case "price-low":
        sortQuery = { "pricing.price": 1 }
        break
      case "price-high":
        sortQuery = { "pricing.price": -1 }
        break
      default:
        sortQuery = { createdAt: -1 }
    }

    // Execute query
    const skip = (page - 1) * limit
    const artworks = await Artwork.find(query)
      .populate("artist", "name profileImage")
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Artwork.countDocuments(query)

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
    console.error("Fetch artworks error:", error)
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 })
  }
}

// POST - Create new artwork
export const POST = withAuth(async (request) => {
  try {
    await connectDB()

    const formData = await request.formData()
    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")
    const medium = formData.get("medium")
    const tags = JSON.parse(formData.get("tags") || "[]")
    const pricing = JSON.parse(formData.get("pricing") || "{}")
    const dimensions = JSON.parse(formData.get("dimensions") || "{}")

    // Get uploaded files
    const files = formData.getAll("images")

    if (!title || !description || !category || !medium || files.length === 0) {
      return NextResponse.json({ error: "Missing required fields or images" }, { status: 400 })
    }

    // Upload images to Cloudinary
    const imageBuffers = []
    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      imageBuffers.push(`data:${file.type};base64,${buffer.toString("base64")}`)
    }

    const uploadedImages = await uploadMultipleImages(imageBuffers, "artworks")

    // Create artwork
    const artwork = new Artwork({
      title,
      description,
      category,
      medium,
      tags,
      dimensions,
      pricing,
      artist: request.user.userId,
      images: uploadedImages.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        isPrimary: index === 0,
      })),
      status: "pending", // Requires admin approval
    })

    await artwork.save()

    // Award points to artist
    const artist = await User.findById(request.user.userId)
    if (artist) {
      const pointsToAward = 50 // Base points for upload
      artist.points.current += pointsToAward
      artist.points.total += pointsToAward
      await artist.save()

      // Update artwork points
      artwork.pointsEarned.upload = pointsToAward
      artwork.pointsEarned.total = pointsToAward
      await artwork.save()
    }

    return NextResponse.json(
      {
        message: "Artwork uploaded successfully",
        artwork: artwork._id,
        pointsAwarded: 50,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Upload artwork error:", error)
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 })
  }
})
