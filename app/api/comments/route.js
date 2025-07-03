import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Comment from "@/models/Comment"
import Artwork from "@/models/Artwork"
import User from "@/models/User"
import Notification from "@/models/Notification"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const artworkId = searchParams.get("artworkId")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    if (!artworkId) {
      return NextResponse.json({ error: "Artwork ID is required" }, { status: 400 })
    }

    const skip = (page - 1) * limit

    const comments = await Comment.find({
      artwork: artworkId,
      parentComment: null,
      status: "active",
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
      .lean()

    const totalComments = await Comment.countDocuments({
      artwork: artworkId,
      parentComment: null,
      status: "active",
    })

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({
          parentComment: comment._id,
          status: "active",
        })
          .populate("author", "name profileImage userType")
          .sort({ createdAt: 1 })
          .limit(5)
          .lean()

        return {
          ...comment,
          replies,
          likeCount: comment.likes?.length || 0,
          replyCount: await Comment.countDocuments({ parentComment: comment._id, status: "active" }),
        }
      }),
    )

    return NextResponse.json({
      comments: commentsWithReplies,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalComments / limit),
        totalComments,
        hasNextPage: page < Math.ceil(totalComments / limit),
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Fetch comments error:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { content, artworkId, parentCommentId } = await request.json()

    if (!content || !artworkId) {
      return NextResponse.json({ error: "Content and artwork ID are required" }, { status: 400 })
    }

    if (content.trim().length < 1 || content.trim().length > 1000) {
      return NextResponse.json({ error: "Comment must be between 1 and 1000 characters" }, { status: 400 })
    }

    // Verify artwork exists
    const artwork = await Artwork.findById(artworkId).populate("artist", "name")
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    // If replying to a comment, verify parent comment exists
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId)
      if (!parentComment) {
        return NextResponse.json({ error: "Parent comment not found" }, { status: 404 })
      }
    }

    const comment = new Comment({
      content: content.trim(),
      author: authResult.user._id,
      artwork: artworkId,
      parentComment: parentCommentId || null,
    })

    await comment.save()

    // Populate author info
    await comment.populate("author", "name profileImage userType")

    // Update artwork comment count
    await Artwork.findByIdAndUpdate(artworkId, {
      $inc: { "engagement.comments": 1 },
    })

    // Create notification for artwork owner (if not commenting on own artwork)
    if (artwork.artist._id.toString() !== authResult.user._id.toString()) {
      await Notification.create({
        recipient: artwork.artist._id,
        type: "comment_received",
        title: "New Comment",
        message: `${authResult.user.name} commented on your artwork "${artwork.title}"`,
        data: {
          artworkId: artwork._id,
          commentId: comment._id,
          commenterName: authResult.user.name,
        },
      })
    }

    // Award points for commenting
    await User.findByIdAndUpdate(authResult.user._id, {
      $inc: {
        "points.current": 2,
        "points.total": 2,
      },
    })

    return NextResponse.json(
      {
        message: "Comment posted successfully",
        comment: {
          _id: comment._id,
          content: comment.content,
          author: comment.author,
          createdAt: comment.createdAt,
          likeCount: 0,
          replyCount: 0,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Post comment error:", error)
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 })
  }
}
