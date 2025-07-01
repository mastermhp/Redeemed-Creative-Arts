import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import Course from "@/models/Course"
import Event from "@/models/Event"
import Product from "@/models/Product"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "all"
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10

    const skip = (page - 1) * limit

    let approvals = []
    let total = 0

    if (type === "all" || type === "artworks") {
      const artworks = await Artwork.find({ status: "pending" })
        .populate("artist", "name email")
        .sort({ createdAt: -1 })
        .skip(type === "artworks" ? skip : 0)
        .limit(type === "artworks" ? limit : 100)

      approvals.push(
        ...artworks.map((item) => ({
          ...item.toObject(),
          type: "artwork",
          submitter: item.artist,
        })),
      )
    }

    if (type === "all" || type === "courses") {
      const courses = await Course.find({ status: "pending" })
        .populate("instructor", "name email")
        .sort({ createdAt: -1 })
        .skip(type === "courses" ? skip : 0)
        .limit(type === "courses" ? limit : 100)

      approvals.push(
        ...courses.map((item) => ({
          ...item.toObject(),
          type: "course",
          submitter: item.instructor,
        })),
      )
    }

    if (type === "all" || type === "events") {
      const events = await Event.find({ status: "pending" })
        .populate("organizer", "name email")
        .sort({ createdAt: -1 })
        .skip(type === "events" ? skip : 0)
        .limit(type === "events" ? limit : 100)

      approvals.push(
        ...events.map((item) => ({
          ...item.toObject(),
          type: "event",
          submitter: item.organizer,
        })),
      )
    }

    if (type === "all" || type === "products") {
      const products = await Product.find({ status: "pending" })
        .populate("seller", "name email")
        .sort({ createdAt: -1 })
        .skip(type === "products" ? skip : 0)
        .limit(type === "products" ? limit : 100)

      approvals.push(
        ...products.map((item) => ({
          ...item.toObject(),
          type: "product",
          submitter: item.seller,
        })),
      )
    }

    // Sort by creation date
    approvals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    if (type === "all") {
      total = approvals.length
      approvals = approvals.slice(skip, skip + limit)
    } else {
      total = approvals.length
    }

    return NextResponse.json({
      approvals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching approvals:", error)
    return NextResponse.json({ error: "Failed to fetch approvals" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { id, type, action, reason } = body

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    let Model
    switch (type) {
      case "artwork":
        Model = Artwork
        break
      case "course":
        Model = Course
        break
      case "event":
        Model = Event
        break
      case "product":
        Model = Product
        break
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    const updateData = {
      status: action === "approve" ? "approved" : "rejected",
      updatedAt: new Date(),
    }

    if (action === "reject" && reason) {
      updateData.rejectionReason = reason
    }

    const item = await Model.findByIdAndUpdate(id, updateData, { new: true })

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: `${type} ${action}d successfully`,
      item,
    })
  } catch (error) {
    console.error("Error processing approval:", error)
    return NextResponse.json({ error: "Failed to process approval" }, { status: 500 })
  }
}
