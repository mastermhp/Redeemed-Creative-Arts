import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { getServerSession } from "@/lib/auth"
import User from "@/models/User"

const mongoose = require("mongoose")

// Follow model
const FollowSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

// Add compound index to prevent duplicate follows
FollowSchema.index({ follower: 1, following: 1 }, { unique: true })

const Follow = mongoose.models.Follow || mongoose.model("Follow", FollowSchema)

export async function POST(request, { params }) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { id: artistId } = params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return NextResponse.json({ error: "Invalid artist ID" }, { status: 400 })
    }

    // Check if artist exists
    const artist = await User.findById(artistId).select("_id userType")
    if (!artist || artist.userType !== "artist") {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 })
    }

    // Prevent self-following
    if (session.userId === artistId) {
      return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 })
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: session.userId,
      following: artistId,
    })

    if (existingFollow) {
      return NextResponse.json({ error: "Already following this artist" }, { status: 400 })
    }

    // Create follow relationship
    const follow = new Follow({
      follower: session.userId,
      following: artistId,
    })

    await follow.save()

    return NextResponse.json({ message: "Successfully followed artist" })
  } catch (error) {
    console.error("Follow artist error:", error)
    return NextResponse.json({ error: "Failed to follow artist" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { id: artistId } = params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return NextResponse.json({ error: "Invalid artist ID" }, { status: 400 })
    }

    // Remove follow relationship
    const result = await Follow.deleteOne({
      follower: session.userId,
      following: artistId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not following this artist" }, { status: 400 })
    }

    return NextResponse.json({ message: "Successfully unfollowed artist" })
  } catch (error) {
    console.error("Unfollow artist error:", error)
    return NextResponse.json({ error: "Failed to unfollow artist" }, { status: 500 })
  }
}
