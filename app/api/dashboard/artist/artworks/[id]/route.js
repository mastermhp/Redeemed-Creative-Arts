import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import { uploadMultipleImages, deleteMultipleImages } from "@/lib/cloudinary"
import Artwork from "@/models/Artwork"

export async function GET(request, { params }) {
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

    const artwork = await Artwork.findOne({
      _id: params.id,
      artist: user._id,
    }).lean()

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    const formattedArtwork = {
      id: artwork._id,
      title: artwork.title,
      description: artwork.description,
      category: artwork.category,
      medium: artwork.medium,
      tags: artwork.tags || [],
      pricing: artwork.pricing || { isForSale: false, price: 0 },
      images: artwork.images || [],
      status: artwork.status,
      isFeatured: artwork.isFeatured || false,
      engagement: artwork.engagement || { views: 0, likes: 0, shares: 0 },
      createdAt: artwork.createdAt,
      updatedAt: artwork.updatedAt,
    }

    return NextResponse.json(formattedArtwork)
  } catch (error) {
    console.error("Fetch artwork error:", error)
    return NextResponse.json({ error: "Failed to fetch artwork" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
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

    const artwork = await Artwork.findOne({
      _id: params.id,
      artist: user._id,
    })

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    const formData = await request.formData()

    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")
    const medium = formData.get("medium") || "Mixed Media"
    const tags = formData.get("tags")
    const isForSale = formData.get("isForSale") === "true"
    const price = formData.get("price")

    if (!title || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Handle image updates
    const newImageFiles = formData.getAll("newImages")
    const keepImageIds = formData.getAll("keepImageIds")

    let updatedImages = []

    // Keep existing images that are in keepImageIds
    if (keepImageIds.length > 0) {
      updatedImages = artwork.images.filter((img) => keepImageIds.includes(img._id.toString()))
    }

    // Upload new images
    if (newImageFiles.length > 0) {
      const imageBuffers = []
      for (const file of newImageFiles) {
        if (file.size > 0) {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          imageBuffers.push(buffer)
        }
      }

      if (imageBuffers.length > 0) {
        const uploadedImages = await uploadMultipleImages(imageBuffers, "artworks")
        const newImages = uploadedImages.map((img, index) => ({
          url: img.url,
          publicId: img.publicId,
          width: img.width,
          height: img.height,
          format: img.format,
          bytes: img.bytes,
          isPrimary: updatedImages.length === 0 && index === 0,
        }))
        updatedImages = [...updatedImages, ...newImages]
      }
    }

    // Delete removed images from Cloudinary
    const removedImages = artwork.images.filter((img) => !keepImageIds.includes(img._id.toString()))
    if (removedImages.length > 0) {
      const publicIdsToDelete = removedImages.map((img) => img.publicId).filter(Boolean)
      if (publicIdsToDelete.length > 0) {
        await deleteMultipleImages(publicIdsToDelete)
      }
    }

    // Process tags
    const processedTags = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag.length > 0)
      : []

    // Update artwork
    const updateData = {
      title: title.trim(),
      description: description.trim(),
      category,
      medium: medium.trim(),
      tags: processedTags,
      images: updatedImages,
      pricing: {
        isForSale,
        price: isForSale ? Number.parseFloat(price) || 0 : 0,
        currency: "USD",
      },
      status: "pending", // Reset to pending for re-approval
      updatedAt: new Date(),
    }

    await Artwork.findByIdAndUpdate(params.id, updateData)

    return NextResponse.json({
      message: "Artwork updated successfully",
      artwork: {
        id: params.id,
        title: updateData.title,
        status: updateData.status,
      },
    })
  } catch (error) {
    console.error("Update artwork error:", error)
    return NextResponse.json({ error: "Failed to update artwork" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
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

    const artwork = await Artwork.findOne({
      _id: params.id,
      artist: user._id,
    })

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Delete images from Cloudinary
    if (artwork.images && artwork.images.length > 0) {
      const publicIdsToDelete = artwork.images.map((img) => img.publicId).filter(Boolean)
      if (publicIdsToDelete.length > 0) {
        await deleteMultipleImages(publicIdsToDelete)
      }
    }

    // Delete artwork from database
    await Artwork.findByIdAndDelete(params.id)

    return NextResponse.json({
      message: "Artwork deleted successfully",
    })
  } catch (error) {
    console.error("Delete artwork error:", error)
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 })
  }
}
