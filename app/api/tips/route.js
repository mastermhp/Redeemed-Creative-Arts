import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { getServerSession } from "@/lib/auth"
import User from "@/models/User"

const mongoose = require("mongoose")

// Tip model
const TipSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true, min: 0.01 },
  message: { type: String, default: "" },
  isAnonymous: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  paymentIntentId: String, // For Stripe integration
  createdAt: { type: Date, default: Date.now },
})

TipSchema.index({ recipient: 1, createdAt: -1 })
TipSchema.index({ sender: 1, createdAt: -1 })

const Tip = mongoose.models.Tip || mongoose.model("Tip", TipSchema)

export async function POST(request) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { artistId, amount, message, isAnonymous } = await request.json()

    // Validate input
    if (!artistId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Artist ID and valid amount are required" }, { status: 400 })
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return NextResponse.json({ error: "Invalid artist ID" }, { status: 400 })
    }

    // Check if artist exists
    const artist = await User.findById(artistId).select("userType")
    if (!artist || artist.userType !== "artist") {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 })
    }

    // Prevent self-tipping
    if (session.userId === artistId) {
      return NextResponse.json({ error: "Cannot tip yourself" }, { status: 400 })
    }

    // Create tip record
    const tip = new Tip({
      sender: session.userId,
      recipient: artistId,
      amount: Number.parseFloat(amount),
      message: message || "",
      isAnonymous: isAnonymous || false,
      status: "completed", // For now, mark as completed (integrate with payment processor later)
    })

    await tip.save()

    // TODO: Integrate with payment processor (Stripe, PayPal, etc.)
    // For now, we'll just create the record

    return NextResponse.json({
      message: "Tip sent successfully",
      tipId: tip._id,
    })
  } catch (error) {
    console.error("Send tip error:", error)
    return NextResponse.json({ error: "Failed to send tip" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // 'sent' or 'received'

    let query = {}
    if (type === "sent") {
      query.sender = session.userId
    } else if (type === "received") {
      query.recipient = session.userId
    } else {
      query = {
        $or: [{ sender: session.userId }, { recipient: session.userId }],
      }
    }

    const tips = await Tip.find(query)
      .sort({ createdAt: -1 })
      .populate("sender", "name profileImage")
      .populate("recipient", "name profileImage")
      .lean()

    return NextResponse.json({ tips })
  } catch (error) {
    console.error("Get tips error:", error)
    return NextResponse.json({ error: "Failed to get tips" }, { status: 500 })
  }
}
