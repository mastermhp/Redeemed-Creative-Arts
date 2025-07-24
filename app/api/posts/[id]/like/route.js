import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { getServerSession } from "@/lib/auth"

const mongoose = require("mongoose")

// Post model
const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [
    {
      url: String,
      publicId: String,
      width: Number,
      height: Number,
      isPrimary: { type: Boolean, default: false },
    },
  ],
  visibility: {
    type: String,
    enum: ["public", "patrons", "subscribers"],
    default: "public",
  },
  tags: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  commentsEnabled: { type: Boolean, default: true },
  status: { type: String, enum: ["draft", "published"], default: "published" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)

export async function POST(request, { params }) {
  try {
    await connectDB()

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { id: postId } = params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 })
    }

    // Find the post
    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Check if already liked
    const hasLiked = post.likes?.includes(session.userId)

    if (hasLiked) {
      // Remove like
      post.likes = post.likes.filter((id) => id.toString() !== session.userId)
    } else {
      // Add like
      if (!post.likes) {
        post.likes = []
      }
      post.likes.push(session.userId)
    }

    await post.save()

    return NextResponse.json({
      message: hasLiked ? "Like removed" : "Post liked",
      likes: post.likes.length,
      hasLiked: !hasLiked,
    })
  } catch (error) {
    console.error("Like post error:", error)
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 })
  }
}
