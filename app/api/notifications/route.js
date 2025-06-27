import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Notification from "@/models/Notification"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20
    const unreadOnly = searchParams.get("unreadOnly") === "true"

    const filter = { recipient: session.userId }
    if (unreadOnly) filter.isRead = false

    const skip = (page - 1) * limit

    const notifications = await Notification.find(filter)
      .populate("relatedUser", "name email profileImage")
      .populate("relatedArtwork", "title images")
      .populate("relatedContest", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Notification.countDocuments(filter)
    const unreadCount = await Notification.countDocuments({
      recipient: session.userId,
      isRead: false,
    })

    return NextResponse.json({
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Notifications API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { notificationId, action } = await request.json()

    if (action === "markRead") {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: session.userId },
        { isRead: true, readAt: new Date() },
        { new: true },
      )

      if (!notification) {
        return NextResponse.json({ error: "Notification not found" }, { status: 404 })
      }

      return NextResponse.json({
        message: "Notification marked as read",
        notification,
      })
    }

    if (action === "markAllRead") {
      await Notification.updateMany({ recipient: session.userId, isRead: false }, { isRead: true, readAt: new Date() })

      return NextResponse.json({
        message: "All notifications marked as read",
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Notification update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
