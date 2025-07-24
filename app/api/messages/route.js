import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { getServerSession } from "@/lib/auth"
import User from "@/models/User"

const mongoose = require("mongoose")

// Message model
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema)

export async function POST(request) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { recipientId, content } = await request.json()

    // Validate input
    if (!recipientId || !content?.trim()) {
      return NextResponse.json({ error: "Recipient and content are required" }, { status: 400 })
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(recipientId)) {
      return NextResponse.json({ error: "Invalid recipient ID" }, { status: 400 })
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId).select("userType membership")
    if (!recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Get sender info
    const sender = await User.findById(session.userId).select("userType membership")
    if (!sender) {
      return NextResponse.json({ error: "Sender not found" }, { status: 404 })
    }

    // Check messaging permissions
    if (sender.userType === "patron" && recipient.userType === "artist") {
      if (sender.membership?.tier === "free") {
        return NextResponse.json({ error: "Upgrade your subscription to message artists" }, { status: 403 })
      }
    }

    // Prevent self-messaging
    if (session.userId === recipientId) {
      return NextResponse.json({ error: "Cannot message yourself" }, { status: 400 })
    }

    // Create message
    const message = new Message({
      sender: session.userId,
      recipient: recipientId,
      content: content.trim(),
    })

    await message.save()

    return NextResponse.json({ message: "Message sent successfully" })
  } catch (error) {
    console.error("Send message error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
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
    const conversationWith = searchParams.get("with")

    let messages = []

    if (conversationWith) {
      // Get conversation with specific user
      if (!mongoose.Types.ObjectId.isValid(conversationWith)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
      }

      messages = await Message.find({
        $or: [
          { sender: session.userId, recipient: conversationWith },
          { sender: conversationWith, recipient: session.userId },
        ],
      })
        .sort({ createdAt: 1 })
        .populate("sender", "name profileImage")
        .populate("recipient", "name profileImage")
        .lean()
    } else {
      // Get all conversations
      messages = await Message.find({
        $or: [{ sender: session.userId }, { recipient: session.userId }],
      })
        .sort({ createdAt: -1 })
        .populate("sender", "name profileImage")
        .populate("recipient", "name profileImage")
        .lean()
    }

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Failed to get messages" }, { status: 500 })
  }
}
