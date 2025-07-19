import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import User from "@/models/User"
import PointTransaction from "@/models/PointTransaction"
import { extractTokenFromHeaders, extractTokenFromCookies, getUserFromToken } from "@/lib/auth"

export async function POST(request) {
  try {
    await connectDB()

    // Get user from token
    const token = extractTokenFromHeaders(request) || extractTokenFromCookies(request)
    const user = await getUserFromToken(token)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { recipientId, amount, points, message } = body

    // Handle both 'amount' and 'points' field names
    const pointsToGift = amount || points

    if (!recipientId || !pointsToGift) {
      return NextResponse.json({ error: "Recipient and points amount are required" }, { status: 400 })
    }

    const pointsAmount = Number.parseInt(pointsToGift)

    if (isNaN(pointsAmount) || pointsAmount <= 0) {
      return NextResponse.json({ error: "Invalid points amount" }, { status: 400 })
    }

    // Check if user has enough points
    if (user.points < pointsAmount) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
    }

    // Find recipient
    const recipient = await User.findById(recipientId)
    if (!recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Create point transactions
    const senderTransaction = new PointTransaction({
      userId: user._id,
      type: "gift_sent",
      points: -pointsAmount,
      description: `Gifted ${pointsAmount} points to ${recipient.name}`,
      relatedUserId: recipient._id,
      message,
    })

    const recipientTransaction = new PointTransaction({
      userId: recipient._id,
      type: "gift_received",
      points: pointsAmount,
      description: `Received ${pointsAmount} points from ${user.name}`,
      relatedUserId: user._id,
      message,
    })

    // Update user points
    await User.findByIdAndUpdate(user._id, {
      $inc: { points: -pointsAmount },
    })

    await User.findByIdAndUpdate(recipient._id, {
      $inc: { points: pointsAmount },
    })

    // Save transactions
    await senderTransaction.save()
    await recipientTransaction.save()

    return NextResponse.json({
      success: true,
      message: "Points gifted successfully",
      pointsGifted: pointsAmount,
      recipient: recipient.name,
    })
  } catch (error) {
    console.error("Error gifting points:", error)
    return NextResponse.json({ error: "Failed to gift points" }, { status: 500 })
  }
}
