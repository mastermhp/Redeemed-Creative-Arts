import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Comment from "@/models/Comment"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import EngagementReward from "@/models/EngagementReward"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const artworkId = searchParams.get("artworkId")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10

    if (!artworkId) {
      return NextResponse.json({ error: "Artwork ID is required" }, { status: 400 })
    }

    const skip = (page - 1) * limit

    const comments = await Comment.find({
      artwork: artworkId,
      isDeleted: false,
      parentComment: null,
    })
      .populate("author", "name profileImage userType")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "name profileImage userType",
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({
          parentComment: comment._id,
          isDeleted: false,
        })
          .populate("author", "name profileImage userType")
          .sort({ createdAt: 1 })

        return {
          ...comment.toObject(),
          replies,
          likesCount: comment.likes.length,
        }
      }),
    )

    const total = await Comment.countDocuments({
      artwork: artworkId,
      isDeleted: false,
      parentComment: null,
    })

    return NextResponse.json({
      comments: commentsWithReplies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get comments error:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { artworkId, content, parentCommentId } = await request.json()

    if (!artworkId || !content) {
      return NextResponse.json({ error: "Artwork ID and content are required" }, { status: 400 })
    }

    // Verify artwork exists
    const artwork = await Artwork.findById(artworkId)
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // Create comment
    const comment = new Comment({
      author: session.userId,
      artwork: artworkId,
      content: content.trim(),
      parentComment: parentCommentId || null,
    })

    await comment.save()

    // Populate author info
    await comment.populate("author", "name profileImage userType")

    // Award engagement points
    const engagementReward = new EngagementReward({
      user: session.userId,
      action: "comment",
      points: 10,
      relatedEntity: {
        entityType: "artwork",
        entityId: artworkId,
      },
      description: "Commented on artwork",
    })

    await engagementReward.save()

    // Update user points
    await User.findByIdAndUpdate(session.userId, {
      $inc: {
        "points.current": 10,
        "points.total": 10,
      },
    })

    return NextResponse.json({
      message: "Comment created successfully",
      comment: {
        ...comment.toObject(),
        likesCount: 0,
        replies: [],
      },
    })
  } catch (error) {
    console.error("Create comment error:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
