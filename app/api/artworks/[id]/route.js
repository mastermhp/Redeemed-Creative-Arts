import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import { getServerSession } from "@/lib/auth"
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const artwork = await Artwork.findById(params.id).populate("artist", "name email profileImage")

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Increment view count
    artwork.engagement.views += 1
    await artwork.save()

    return NextResponse.json({ artwork })
  } catch (error) {
    console.error("Get artwork error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const artwork = await Artwork.findById(params.id)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user owns this artwork
    if (artwork.artist.toString() !== session.userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const formData = await request.formData()
    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")
    const medium = formData.get("medium")
    const tags = formData.get("tags")
    const isForSale = formData.get("isForSale") === "true"
    const price = formData.get("price")
    const removeImageIds = formData.get("removeImageIds")

    const newImages = formData.getAll("newImages")

    // Remove specified images
    if (removeImageIds) {
      const idsToRemove = removeImageIds.split(",")
      for (const publicId of idsToRemove) {
        try {
          await deleteFromCloudinary(publicId)
        } catch (error) {
          console.error("Failed to delete image:", error)
        }
      }
      artwork.images = artwork.images.filter((img) => !idsToRemove.includes(img.publicId))
    }

    // Upload new images
    if (newImages.length > 0) {
      for (const image of newImages) {
        try {
          const result = await uploadToCloudinary(image, "artworks")
          artwork.images.push({
            url: result.secure_url,
            publicId: result.public_id,
            isPrimary: artwork.images.length === 0,
          })
        } catch (uploadError) {
          console.error("Image upload error:", uploadError)
        }
      }
    }

    // Update artwork fields
    artwork.title = title
    artwork.description = description
    artwork.category = category
    artwork.medium = medium
    artwork.tags = tags ? tags.split(",").map((tag) => tag.trim()) : []
    artwork.pricing = {
      isForSale,
      price: isForSale ? Number.parseFloat(price) || 0 : 0,
    }

    await artwork.save()

    return NextResponse.json({
      message: "Artwork updated successfully",
      artwork,
    })
  } catch (error) {
    console.error("Update artwork error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const artwork = await Artwork.findById(params.id)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user owns this artwork
    if (artwork.artist.toString() !== session.userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Delete images from Cloudinary
    for (const image of artwork.images) {
      try {
        await deleteFromCloudinary(image.publicId)
      } catch (error) {
        console.error("Failed to delete image:", error)
      }
    }

    await Artwork.findByIdAndDelete(params.id)

    return NextResponse.json({
      message: "Artwork deleted successfully",
    })
  } catch (error) {
    console.error("Delete artwork error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
