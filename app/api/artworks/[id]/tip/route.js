import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Transaction from "@/models/Transaction"
import User from "@/models/User"
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
    const { amount, message, isAnonymous } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid tip amount" }, { status: 400 })
    }

    // Get artwork and artist
    const artwork = await Artwork.findById(artworkId).populate("artist", "name email")
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    if (artwork.artist._id.toString() === user._id.toString()) {
      return NextResponse.json({ error: "Cannot tip your own artwork" }, { status: 400 })
    }

    // Create tip transaction
    const tipTransaction = new Transaction({
      sender: user._id,
      recipient: artwork.artist._id,
      type: "tip",
      amount: Number.parseFloat(amount),
      status: "completed", // Tips are processed immediately
      message: message || "",
      isAnonymous: isAnonymous || false,
      metadata: {
        artworkId: artwork._id,
        artworkTitle: artwork.title,
      },
    })

    await tipTransaction.save()

    // Award points to artist (50 points for receiving a tip)
    const artistProfile = await User.findById(artwork.artist._id).select("membership")
    const membershipTier = artistProfile?.membership?.tier || "free"
    const pointMultiplier = membershipTier === "free" ? 1 : membershipTier === "tier1" ? 2 : 3
    const pointsAwarded = 50 * pointMultiplier

    await User.findByIdAndUpdate(artwork.artist._id, {
      $inc: {
        "points.current": pointsAwarded,
        "points.total": pointsAwarded,
      },
    })

    // Create notification for artist
    await Notification.create({
      recipient: artwork.artist._id,
      type: "tip_received",
      title: "New Tip Received!",
      message: isAnonymous
        ? `You received a $${amount} tip for "${artwork.title}"`
        : `${user.name} tipped you $${amount} for "${artwork.title}"`,
      data: {
        artworkId: artwork._id,
        tipAmount: amount,
        senderId: isAnonymous ? null : user._id,
        senderName: isAnonymous ? null : user.name,
        message: message || "",
      },
    })

    return NextResponse.json({
      message: "Tip sent successfully!",
      tip: {
        id: tipTransaction._id,
        amount,
        artistName: artwork.artist.name,
        artworkTitle: artwork.title,
      },
      pointsAwarded,
    })
  } catch (error) {
    console.error("Send tip error:", error)
    return NextResponse.json({ error: "Failed to send tip" }, { status: 500 })
  }
}
