import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import { uploadMultipleImages } from "@/lib/cloudinary"
import Artwork from "@/models/Artwork"
import Notification from "@/models/Notification"
import User from "@/models/User"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "all"
    const category = searchParams.get("category")
    const sortBy = searchParams.get("sortBy") || "newest"
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    // Build query
    const query = { artist: user._id }
    if (status !== "all") {
      query.status = status
    }
    if (category) {
      query.category = category
    }

    // Build sort
    let sort = {}
    switch (sortBy) {
      case "oldest":
        sort = { createdAt: 1 }
        break
      case "popular":
        sort = { "engagement.likes": -1, "engagement.views": -1 }
        break
      case "views":
        sort = { "engagement.views": -1 }
        break
      case "newest":
      default:
        sort = { createdAt: -1 }
        break
    }

    // Execute query with pagination
    const skip = (page - 1) * limit
    const artworks = await Artwork.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select("title description category medium tags pricing engagement status isFeatured images createdAt updatedAt")
      .lean()

    // Get total count for pagination
    const totalCount = await Artwork.countDocuments(query)
    const totalPages = Math.ceil(totalCount / limit)

    // Format response
    const formattedArtworks = artworks.map((artwork) => ({
      id: artwork._id,
      title: artwork.title,
      description: artwork.description,
      category: artwork.category,
      medium: artwork.medium,
      tags: artwork.tags || [],
      price: artwork.pricing?.price || 0,
      isForSale: artwork.pricing?.isForSale || false,
      views: artwork.engagement?.views || 0,
      likes: artwork.engagement?.likes || 0,
      shares: artwork.engagement?.shares || 0,
      status: artwork.status,
      isFeatured: artwork.isFeatured || false,
      images: artwork.images || [],
      image: artwork.images?.[0]?.url || null,
      imageCount: artwork.images?.length || 0,
      createdAt: artwork.createdAt?.toLocaleDateString() || "",
      updatedAt: artwork.updatedAt,
    }))

    return NextResponse.json({
      artworks: formattedArtworks,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Fetch artworks error:", error)
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    const formData = await request.formData()

    // Extract form fields
    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")
    const medium = formData.get("medium") || "Mixed Media"
    const tags = formData.get("tags")
    const isForSale = formData.get("isForSale") === "true"
    const price = formData.get("price")

    // Validation
    if (!title || !description || !category) {
      return NextResponse.json({ error: "Missing required fields: title, description, category" }, { status: 400 })
    }

    // Get uploaded images
    const imageFiles = formData.getAll("images")
    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 })
    }

    if (imageFiles.length > 5) {
      return NextResponse.json({ error: "Maximum 5 images allowed" }, { status: 400 })
    }

    // Convert files to buffers for Cloudinary upload
    const imageBuffers = []
    for (const file of imageFiles) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        return NextResponse.json({ error: "Image file size must be less than 10MB" }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      imageBuffers.push(buffer)
    }

    // Upload images to Cloudinary
    const uploadedImages = await uploadMultipleImages(imageBuffers, "artworks")

    // Process tags
    const processedTags = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag.length > 0)
      : []

    // Create artwork document
    const artworkData = {
      title: title.trim(),
      description: description.trim(),
      artist: user._id,
      category,
      medium: medium.trim(),
      tags: processedTags,
      images: uploadedImages.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        width: img.width,
        height: img.height,
        format: img.format,
        bytes: img.bytes,
        isPrimary: index === 0,
      })),
      pricing: {
        isForSale,
        price: isForSale ? Number.parseFloat(price) || 0 : 0,
        currency: "USD",
      },
      status: "pending",
      engagement: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        saves: 0,
      },
    }

    const artwork = new Artwork(artworkData)
    await artwork.save()

    // Create notification for admin review
    await Notification.create({
      recipient: "admin",
      type: "artwork_submitted",
      title: "New Artwork Submitted",
      message: `${user.name} submitted "${title}" for review`,
      data: {
        artworkId: artwork._id,
        artistId: user._id,
        artistName: user.name,
      },
    })

    // Award points for artwork submission
    const pointsAwarded = 10
    await User.findByIdAndUpdate(user._id, {
      $inc: {
        "points.current": pointsAwarded,
        "points.total": pointsAwarded,
      },
    })

    return NextResponse.json(
      {
        message: "Artwork uploaded successfully and submitted for review",
        artwork: {
          id: artwork._id,
          title: artwork.title,
          status: artwork.status,
          imageCount: artwork.images.length,
        },
        pointsAwarded,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Upload artwork error:", error)
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 })
  }
}
