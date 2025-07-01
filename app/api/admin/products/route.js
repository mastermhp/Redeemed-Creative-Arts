import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Product from "@/models/Product"

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
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    if (status) {
      filter.status = status
    }

    if (category) {
      filter.category = category
    }

    const products = await Product.find(filter)
      .populate("seller", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Product.countDocuments(filter)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, description, category, price, seller, imageUrl, stock, status = "pending" } = body

    const product = new Product({
      name,
      description,
      category,
      price,
      seller,
      imageUrl,
      stock,
      status,
      createdAt: new Date(),
    })

    await product.save()
    await product.populate("seller", "name email")

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
