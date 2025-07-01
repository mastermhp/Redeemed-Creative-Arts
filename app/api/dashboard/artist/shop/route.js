import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import { uploadMultipleImages } from "@/lib/cloudinary"
import Product from "@/models/Product"

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

    const products = await Product.find({ seller: user._id })
      .sort({ createdAt: -1 })
      .select("title description category price stock status sales images")
      .lean()

    const formattedProducts = products.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      sales: product.sales || 0,
      image: product.images?.[0]?.url || null,
      images: product.images || [],
    }))

    return NextResponse.json({ products: formattedProducts })
  } catch (error) {
    console.error("Fetch products error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
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

    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")
    const price = formData.get("price")
    const stock = formData.get("stock")

    if (!title || !description || !category || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const imageFiles = formData.getAll("images")
    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 })
    }

    const imageBuffers = []
    for (const file of imageFiles) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      imageBuffers.push(buffer)
    }

    const uploadedImages = await uploadMultipleImages(imageBuffers, "products")

    const productData = {
      title: title.trim(),
      description: description.trim(),
      seller: user._id,
      category,
      price: Number.parseFloat(price),
      stock: stock ? Number.parseInt(stock) : 0,
      images: uploadedImages.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        width: img.width,
        height: img.height,
        format: img.format,
        bytes: img.bytes,
        isPrimary: index === 0,
      })),
      status: "active",
      sales: 0,
    }

    const product = new Product(productData)
    await product.save()

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: {
          id: product._id,
          title: product.title,
          status: product.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
