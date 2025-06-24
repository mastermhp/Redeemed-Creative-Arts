import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import { withAuth } from "@/lib/middleware"

// GET - Fetch single artwork
export async function GET(request, { params }) {
  try {
    await connectDB()

    const artwork = await Artwork.findById(params.id).populate("artist", "name profileImage bio location").lean()

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Increment view count
    await Artwork.findByIdAndUpdate(params.id, {
      $inc: { "engagement.views": 1 },
    })

    return NextResponse.json({ artwork })
  } catch (error) {
    console.error("Fetch artwork error:", error)
    return NextResponse.json({ error: "Failed to fetch artwork" }, { status: 500 })
  }
}

// PUT - Update artwork (artist only)
export const PUT = withAuth(async (request, { params }) => {
  try {
    await connectDB()

    const artwork = await Artwork.findById(params.id)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user owns this artwork
    if (artwork.artist.toString() !== request.user.userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const updates = await request.json()

    // Update allowed fields
    const allowedFields = ["title", "description", "tags", "pricing", "dimensions"]
    const updateData = {}

    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field]
      }
    })

    const updatedArtwork = await Artwork.findByIdAndUpdate(params.id, updateData, { new: true }).populate(
      "artist",
      "name profileImage",
    )

    return NextResponse.json({
      message: "Artwork updated successfully",
      artwork: updatedArtwork,
    })
  } catch (error) {
    console.error("Update artwork error:", error)
    return NextResponse.json({ error: "Failed to update artwork" }, { status: 500 })
  }
})

// DELETE - Delete artwork (artist only)
export const DELETE = withAuth(async (request, { params }) => {
  try {
    await connectDB()

    const artwork = await Artwork.findById(params.id)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Check if user owns this artwork
    if (artwork.artist.toString() !== request.user.userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Delete images from Cloudinary
    const { deleteImage } = await import("@/lib/cloudinary")
    for (const image of artwork.images) {
      try {
        await deleteImage(image.publicId)
      } catch (error) {
        console.error("Failed to delete image:", error)
      }
    }

    // Delete artwork
    await Artwork.findByIdAndDelete(params.id)

    return NextResponse.json({
      message: "Artwork deleted successfully",
    })
  } catch (error) {
    console.error("Delete artwork error:", error)
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 })
  }
})
