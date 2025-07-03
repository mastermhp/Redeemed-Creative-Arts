import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import PointTransaction from "@/models/PointTransaction"
import { getServerSession } from "@/lib/auth"

export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { recipientId, amount, message } = await request.json()

    if (!recipientId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Valid recipient and amount are required" }, { status: 400 })
    }

    // Get sender and recipient
    const sender = await User.findById(session.userId)
    const recipient = await User.findById(recipientId)

    if (!sender || !recipient) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if sender has enough points
    if (sender.points.current < amount) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
    }

    // Prevent self-gifting
    if (sender._id.toString() === recipient._id.toString()) {
      return NextResponse.json({ error: "Cannot gift points to yourself" }, { status: 400 })
    }

    // Create transaction
    const transaction = new PointTransaction({
      from: sender._id,
      to: recipient._id,
      amount,
      type: "gift",
      description: message || `Points gift from ${sender.name}`,
    })

    await transaction.save()

    // Update points
    await User.findByIdAndUpdate(sender._id, {
      $inc: { "points.current": -amount },
    })

    await User.findByIdAndUpdate(recipient._id, {
      $inc: {
        "points.current": amount,
        "points.total": amount,
      },
    })

    // Update recipient level if needed
    const updatedRecipient = await User.findById(recipient._id)
    let newLevel = updatedRecipient.points.level
    if (updatedRecipient.points.total >= 10000) newLevel = "diamond"
    else if (updatedRecipient.points.total >= 5000) newLevel = "platinum"
    else if (updatedRecipient.points.total >= 2000) newLevel = "gold"
    else if (updatedRecipient.points.total >= 500) newLevel = "silver"
    else newLevel = "bronze"

    if (newLevel !== updatedRecipient.points.level) {
      await User.findByIdAndUpdate(recipient._id, {
        "points.level": newLevel,
      })
    }

    return NextResponse.json({
      message: "Points gifted successfully",
      transaction: {
        id: transaction._id,
        amount,
        recipient: recipient.name,
        message: transaction.description,
      },
    })
  } catch (error) {
    console.error("Gift points error:", error)
    return NextResponse.json({ error: "Failed to gift points" }, { status: 500 })
  }
}
