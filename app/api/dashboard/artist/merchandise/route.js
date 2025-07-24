import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import { uploadImage } from "@/lib/cloudinary"
import User from "@/models/User"

const mongoose = require("mongoose")

// Merchandise model
const MerchandiseSchema = new mongoose.Schema({
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  itemType: {
    type: String,
    enum: ["t-shirt", "bookmark", "bible-cover", "fan", "pencil", "mug", "tote-bag", "sticker", "other"],
    required: true,
  },
  basePrice: { type: Number, required: true },
  variants: [
    {
      name: String,
      price: Number,
      stock: { type: Number, default: 0 },
    },
  ],
  images: [
    {
      url: String,
      publicId: String,
      width: Number,
      height: Number,
      isPrimary: { type: Boolean, default: false },
    },
  ],
  artworkReference: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork" },
  status: { type: String, enum: ["draft", "active", "inactive"], default: "draft" },
  sales: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Merchandise = mongoose.models.Merchandise || mongoose.model("Merchandise", MerchandiseSchema)

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

    // Check subscription tier
    const userProfile = await User.findById(user._id).select("membership")
    const membershipTier = userProfile?.membership?.tier || "free"

    if (membershipTier === "free") {
      return NextResponse.json({ error: "Merchandise creation requires a paid subscription" }, { status: 403 })
    }

    const products = await Merchandise.find({ artist: user._id })
      .sort({ createdAt: -1 })
      .select("title description itemType basePrice variants images status sales stock createdAt")
      .lean()

    const formattedProducts = products.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      itemType: product.itemType,
      price: product.basePrice,
      variants: product.variants || [],
      image: product.images?.[0]?.url || null,
      status: product.status,
      sales: product.sales || 0,
      stock: product.stock || 0,
      createdAt: product.createdAt,
    }))

    return NextResponse.json({ products: formattedProducts })
  } catch (error) {
    console.error("Fetch merchandise error:", error)
    return NextResponse.json({ error: "Failed to fetch merchandise" }, { status: 500 })
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

    // Check subscription tier
    const userProfile = await User.findById(user._id).select("membership")
    const membershipTier = userProfile?.membership?.tier || "free"

    if (membershipTier === "free") {
      return NextResponse.json({ error: "Merchandise creation requires a paid subscription" }, { status: 403 })
    }

    const formData = await request.formData()

    const title = formData.get("title")
    const description = formData.get("description")
    const itemType = formData.get("itemType")
    const basePrice = formData.get("basePrice")
    const variants = formData.get("variants")
    const artworkId = formData.get("artworkId")

    if (!title || !description || !itemType || !basePrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Handle image uploads
    const images = []
    const imageFiles = formData.getAll("images")

    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const uploadResult = await uploadImage(buffer, { folder: "merchandise" })
        images.push({
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          width: uploadResult.width,
          height: uploadResult.height,
          isPrimary: images.length === 0,
        })
      }
    }

    const merchandiseData = {
      artist: user._id,
      title: title.trim(),
      description: description.trim(),
      itemType,
      basePrice: Number.parseFloat(basePrice),
      variants: variants ? JSON.parse(variants) : [],
      images,
      artworkReference: artworkId || null,
      status: "draft",
      sales: 0,
      stock: 0,
    }

    const merchandise = new Merchandise(merchandiseData)
    await merchandise.save()

    return NextResponse.json(
      {
        message: "Merchandise created successfully",
        merchandise: {
          id: merchandise._id,
          title: merchandise.title,
          status: merchandise.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create merchandise error:", error)
    return NextResponse.json({ error: "Failed to create merchandise" }, { status: 500 })
  }
}
