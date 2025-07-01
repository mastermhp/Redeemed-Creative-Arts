import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const artistId = searchParams.get("artistId")
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 12

    const filter = {}

    if (artistId) {
      filter.artist = artistId
    }

    if (status && status !== "all") {
      filter.status = status
    } else if (status === "all" && artistId) {
      // For artist's own artworks, show all statuses
      // No status filter needed
    } else {
      // For public viewing, only show approved artworks
      filter.status = "approved"
    }

    if (category) {
      filter.category = category
    }

    const skip = (page - 1) * limit

    const artworks = await Artwork.find(filter)
      .populate("artist", "name email profileImage")
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

    const user = await User.findById(session.userId)
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Artist access required" }, { status: 403 })
    }

    const formData = await request.formData()
    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")
    const medium = formData.get("medium")
    const tags = formData.get("tags")
    const isForSale = formData.get("isForSale") === "true"
    const price = formData.get("price")

    const images = formData.getAll("images")

    if (!title || !description || !category || !medium || images.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upload images to Cloudinary
    const uploadedImages = []
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      try {
        const result = await uploadToCloudinary(image, "artworks")
        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
          isPrimary: i === 0,
        })
      } catch (uploadError) {
        console.error("Image upload error:", uploadError)
        return NextResponse.json({ error: "Failed to upload images" }, { status: 500 })
      }
    }

    const artwork = new Artwork({
      title,
      description,
      artist: session.userId,
      category,
      medium,
      images: uploadedImages,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      pricing: {
        isForSale,
        price: isForSale ? Number.parseFloat(price) || 0 : 0,
      },
      status: "pending",
    })

    await artwork.save()

    // Award points for uploading artwork
    user.updatePoints(50)
    await user.save()

    return NextResponse.json({
      message: "Artwork uploaded successfully",
      artwork,
      pointsEarned: 50,
    })
  } catch (error) {
    console.error("Upload artwork error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
