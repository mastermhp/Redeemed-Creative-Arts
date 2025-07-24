import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { getServerSession } from "@/lib/auth"
import User from "@/models/User"

const mongoose = require("mongoose")

// Commission model
const CommissionSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true, min: 0 },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ["pending", "accepted", "in_progress", "completed", "cancelled", "rejected"],
    default: "pending",
  },
  attachments: [
    {
      url: String,
      filename: String,
      fileType: String,
    },
  ],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  finalDelivery: {
    url: String,
    filename: String,
    deliveredAt: Date,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "refunded"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Commission = mongoose.models.Commission || mongoose.model("Commission", CommissionSchema)

export async function POST(request) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { artistId, title, description, budget, deadline } = await request.json()

    // Validate input
    if (!artistId || !title?.trim() || !description?.trim() || !budget || budget <= 0) {
      return NextResponse.json(
        { error: "Artist ID, title, description, and valid budget are required" },
        { status: 400 },
      )
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

    // Prevent self-commissioning
    if (session.userId === artistId) {
      return NextResponse.json({ error: "Cannot commission yourself" }, { status: 400 })
    }

    // Create commission request
    const commission = new Commission({
      client: session.userId,
      artist: artistId,
      title: title.trim(),
      description: description.trim(),
      budget: Number.parseFloat(budget),
      deadline: deadline ? new Date(deadline) : undefined,
    })

    await commission.save()

    return NextResponse.json({
      message: "Commission request sent successfully",
      commissionId: commission._id,
    })
  } catch (error) {
    console.error("Create commission error:", error)
    return NextResponse.json({ error: "Failed to create commission request" }, { status: 500 })
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
    const status = searchParams.get("status")

    let query = {}
    if (type === "sent") {
      query.client = session.userId
    } else if (type === "received") {
      query.artist = session.userId
    } else {
      query = {
        $or: [{ client: session.userId }, { artist: session.userId }],
      }
    }

    if (status) {
      query.status = status
    }

    const commissions = await Commission.find(query)
      .sort({ createdAt: -1 })
      .populate("client", "name profileImage")
      .populate("artist", "name profileImage")
      .lean()

    return NextResponse.json({ commissions })
  } catch (error) {
    console.error("Get commissions error:", error)
    return NextResponse.json({ error: "Failed to get commissions" }, { status: 500 })
  }
}
