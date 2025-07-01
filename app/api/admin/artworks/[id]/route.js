import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const artwork = await Artwork.findById(params.id).populate("artist", "name email")

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    return NextResponse.json(artwork)
  } catch (error) {
    console.error("Error fetching artwork:", error)
    return NextResponse.json({ error: "Failed to fetch artwork" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, category, status, featured, price } = body

    const artwork = await Artwork.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        category,
        status,
        featured,
        price,
        updatedAt: new Date(),
      },
      { new: true },
    ).populate("artist", "name email")

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    return NextResponse.json(artwork)
  } catch (error) {
    console.error("Error updating artwork:", error)
    return NextResponse.json({ error: "Failed to update artwork" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const artwork = await Artwork.findByIdAndDelete(params.id)

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Artwork deleted successfully" })
  } catch (error) {
    console.error("Error deleting artwork:", error)
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 })
  }
}
