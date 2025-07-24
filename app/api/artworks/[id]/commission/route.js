import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Transaction from "@/models/Transaction"
import Artwork from "@/models/Artwork"
import Notification from "@/models/Notification"

export async function POST(request, { params }) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    const { id: artworkId } = params
    const { title, description, budget, deadline, contactInfo } = await request.json()

    if (!title || !description || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get artwork and artist
    const artwork = await Artwork.findById(artworkId).populate("artist", "name email")
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    if (artwork.artist._id.toString() === user._id.toString()) {
      return NextResponse.json({ error: "Cannot commission yourself" }, { status: 400 })
    }

    // Check if artist accepts commissions
    if (!artwork.metadata?.commissionAvailable) {
      return NextResponse.json({ error: "This artist is not accepting commissions" }, { status: 400 })
    }

    // Create commission request
    const commissionRequest = new Transaction({
      sender: user._id,
      recipient: artwork.artist._id,
      type: "commission",
      amount: Number.parseFloat(budget),
      status: "pending",
      metadata: {
        title: title.trim(),
        description: description.trim(),
        deadline: deadline || null,
        contactInfo: contactInfo || {},
        artworkReference: artwork._id,
        artworkTitle: artwork.title,
      },
    })

    await commissionRequest.save()

    // Create notification for artist
    await Notification.create({
      recipient: artwork.artist._id,
      type: "commission_request",
      title: "New Commission Request",
      message: `${user.name} requested a commission: "${title}"`,
      data: {
        commissionId: commissionRequest._id,
        clientId: user._id,
        clientName: user.name,
        title,
        budget,
        artworkId: artwork._id,
      },
    })

    return NextResponse.json({
      message: "Commission request sent successfully!",
      commission: {
        id: commissionRequest._id,
        title,
        budget,
        artistName: artwork.artist.name,
        status: "pending",
      },
    })
  } catch (error) {
    console.error("Send commission request error:", error)
    return NextResponse.json({ error: "Failed to send commission request" }, { status: 500 })
  }
}
