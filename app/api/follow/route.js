import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Follow from "@/models/Follow"
import User from "@/models/User"
import Notification from "@/models/Notification"
import { authenticateRequest } from "@/lib/auth"

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { userId, action } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: "User ID and action are required" }, { status: 400 })
    }

    if (!["follow", "unfollow"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    // Check if target user exists
    const targetUser = await User.findById(userId)
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prevent self-following
    if (authResult.user._id.toString() === userId) {
      return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 })
    }

    if (action === "follow") {
      // Check if already following
      const existingFollow = await Follow.findOne({
        follower: authResult.user._id,
        following: userId,
      })

      if (existingFollow) {
        if (existingFollow.status === "active") {
          return NextResponse.json({ error: "Already following this user" }, { status: 400 })
        } else {
          // Reactivate follow
          existingFollow.status = "active"
          await existingFollow.save()
        }
      } else {
        // Create new follow
        await Follow.create({
          follower: authResult.user._id,
          following: userId,
          status: "active",
        })
      }

      // Award points to both users
      await User.findByIdAndUpdate(authResult.user._id, {
        $inc: { "points.current": 2, "points.total": 2 },
      })

      await User.findByIdAndUpdate(userId, {
        $inc: { "points.current": 5, "points.total": 5 },
      })

      // Create notification
      await Notification.create({
        recipient: userId,
        type: "new_follower",
        title: "New Follower",
        message: `${authResult.user.name} started following you`,
        data: {
          followerId: authResult.user._id,
          followerName: authResult.user.name,
        },
      })

      return NextResponse.json({ message: "Successfully followed user", following: true })
    } else {
      // Unfollow
      const follow = await Follow.findOne({
        follower: authResult.user._id,
        following: userId,
        status: "active",
      })

      if (!follow) {
        return NextResponse.json({ error: "Not following this user" }, { status: 400 })
      }

      follow.status = "blocked"
      await follow.save()

      return NextResponse.json({ message: "Successfully unfollowed user", following: false })
    }
  } catch (error) {
    console.error("Follow/unfollow error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "following" // following, followers
    const userId = searchParams.get("userId") || authResult.user._id
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    const skip = (page - 1) * limit

    let query, populateField
    if (type === "following") {
      query = { follower: userId, status: "active" }
      populateField = "following"
    } else {
      query = { following: userId, status: "active" }
      populateField = "follower"
    }

    const follows = await Follow.find(query)
      .populate(populateField, "name profileImage userType bio location")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Follow.countDocuments(query)

    const users = follows.map((follow) => ({
      ...follow[populateField],
      followedAt: follow.createdAt,
    }))

    return NextResponse.json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Get follows error:", error)
    return NextResponse.json({ error: "Failed to fetch follows" }, { status: 500 })
  }
}
