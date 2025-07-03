import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import User from "@/models/User"
import PointTransaction from "@/models/PointTransaction"
import Notification from "@/models/Notification"

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { recipientId, amount, message } = await request.json()

    if (!recipientId || !amount) {
      return NextResponse.json({ error: "Recipient ID and amount are required" }, { status: 400 })
    }

    if (amount < 1 || amount > 1000) {
      return NextResponse.json({ error: "Amount must be between 1 and 1000 points" }, { status: 400 })
    }

    if (recipientId === authResult.user._id.toString()) {
      return NextResponse.json({ error: "Cannot gift points to yourself" }, { status: 400 })
    }

    // Check if sender has enough points
    const sender = await User.findById(authResult.user._id)
    if (sender.points.current < amount) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId)
    if (!recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Create transaction record
    const transaction = new PointTransaction({
      from: authResult.user._id,
      to: recipientId,
      amount,
      type: "gift",
      description: message || `Points gift from ${sender.name}`,
      status: "completed",
    })

    await transaction.save()

    // Update points
    await User.findByIdAndUpdate(authResult.user._id, {
      $inc: { "points.current": -amount },
    })

    await User.findByIdAndUpdate(recipientId, {
      $inc: {
        "points.current": amount,
        "points.total": amount,
      },
    })

    // Create notification
    await Notification.create({
      recipient: recipientId,
      type: "points_received",
      title: "Points Gift Received",
      message: `${sender.name} gifted you ${amount} points${message ? ": " + message : ""}`,
      data: {
        senderId: authResult.user._id,
        senderName: sender.name,
        amount,
        transactionId: transaction._id,
      },
    })

    return NextResponse.json({
      message: "Points gifted successfully",
      transaction: {
        id: transaction._id,
        amount,
        recipient: recipient.name,
        createdAt: transaction.createdAt,
      },
    })
  } catch (error) {
    console.error("Gift points error:", error)
    return NextResponse.json({ error: "Failed to gift points" }, { status: 500 })
  }
}
