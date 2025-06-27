import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Notification from "@/models/Notification"

export async function POST(request) {
  try {
    await connectDB()

    const { userId, points, reason, type } = await request.json()

    if (!userId || !points || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Award points
    const previousLevel = user.points.level
    user.points.current += points
    user.points.total += points

    // Update level based on total points
    let newLevel = "bronze"
    if (user.points.total >= 10000) newLevel = "diamond"
    else if (user.points.total >= 5000) newLevel = "platinum"
    else if (user.points.total >= 2500) newLevel = "gold"
    else if (user.points.total >= 1000) newLevel = "silver"

    user.points.level = newLevel

    await user.save()

    // Create notification
    const notification = new Notification({
      recipient: userId,
      type: "points_earned",
      title: "Points Earned!",
      message: `You earned ${points} points for ${reason}`,
      data: {
        points,
        reason,
        type,
        newTotal: user.points.total,
      },
      priority: "medium",
    })

    await notification.save()

    // Check for level up
    if (newLevel !== previousLevel) {
      const levelUpNotification = new Notification({
        recipient: userId,
        type: "level_up",
        title: "Level Up!",
        message: `Congratulations! You've reached ${newLevel.charAt(0).toUpperCase() + newLevel.slice(1)} level!`,
        data: {
          previousLevel,
          newLevel,
          totalPoints: user.points.total,
        },
        priority: "high",
      })

      await levelUpNotification.save()
    }

    return NextResponse.json({
      message: "Points awarded successfully",
      user: {
        points: user.points,
        leveledUp: newLevel !== previousLevel,
        previousLevel,
        newLevel,
      },
    })
  } catch (error) {
    console.error("Points award error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
