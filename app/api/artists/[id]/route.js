import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import Artwork from "@/models/Artwork"
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
  postType: {
    type: String,
    enum: ["text", "art", "video", "sculpt", "digital", "photography"],
    default: "text",
  },
})

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)

// Follow model
const FollowSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

const Follow = mongoose.models.Follow || mongoose.model("Follow", FollowSchema)

export async function GET(request, { params }) {
  try {
    await connectDB()

    const { id } = params
    const { searchParams } = new URL(request.url)
    const tab = searchParams.get("tab") || "posts"

    console.log("Fetching artist profile for ID:", id)

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId:", id)
      return NextResponse.json({ error: "Invalid artist ID" }, { status: 400 })
    }

    // Get current user session
    let session = null
    try {
      session = await getServerSession()
    } catch (error) {
      console.log("No session found:", error.message)
    }

    // Get artist profile
    const artist = await User.findById(id)
      .select(
        "name bio profileImage coverImage location socialLinks artistInfo membership createdAt isVerified userType",
      )
      .lean()

    console.log("Found artist:", artist ? artist.name : "Not found")

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 })
    }

    // Check if user is an artist (allow all user types to have profiles)
    if (artist.userType !== "artist") {
      console.log("User is not an artist, userType:", artist.userType)
      return NextResponse.json({ error: "User is not an artist" }, { status: 404 })
    }

    // Check if current user is following this artist
    let isFollowing = false
    if (session && session.userId) {
      try {
        const followRecord = await Follow.findOne({
          follower: session.userId,
          following: id,
        })
        isFollowing = !!followRecord
      } catch (error) {
        console.log("Error checking follow status:", error.message)
      }
    }

    // Get follower count
    let followerCount = 0
    try {
      followerCount = await Follow.countDocuments({ following: id })
    } catch (error) {
      console.log("Error getting follower count:", error.message)
    }

    let content = []
    let posts = []
    const stats = {
      totalArtworks: 0,
      totalPosts: 0,
      totalLikes: 0,
      totalViews: 0,
      totalUpvotes: 0,
      followers: followerCount,
    }

    // Get content based on tab
    if (tab === "posts") {
      try {
        // Get posts
        posts = await Post.find({
          author: id,
          status: "published",
        })
          .sort({ createdAt: -1 })
          .populate("author", "name profileImage")
          .select("title content images visibility tags likes comments commentsEnabled createdAt postType")
          .lean()

        posts = posts.map((post) => ({
          id: post._id.toString(),
          type: "post",
          title: post.title,
          content: post.content,
          images: post.images || [],
          visibility: post.visibility,
          tags: post.tags || [],
          likesCount: post.likes?.length || 0,
          commentsCount: post.comments?.length || 0,
          commentsEnabled: post.commentsEnabled,
          createdAt: post.createdAt,
          postType: post.postType,
        }))

        stats.totalPosts = posts.length
        stats.totalLikes = posts.reduce((sum, post) => sum + (post.likesCount || 0), 0)
      } catch (error) {
        console.log("Error fetching posts:", error.message)
        posts = []
      }
    } else {
      try {
        // Get artworks by category
        const categoryFilter = tab === "art" ? {} : { category: tab }
        const artworks = await Artwork.find({
          artist: id,
          status: "approved",
          ...categoryFilter,
        })
          .sort({ createdAt: -1 })
          .select("title description category images engagement pricing upvotes createdAt")
          .lean()

        content = artworks.map((artwork) => ({
          id: artwork._id.toString(),
          type: "artwork",
          title: artwork.title,
          description: artwork.description,
          category: artwork.category,
          images: artwork.images || [],
          views: artwork.engagement?.views || 0,
          likes: artwork.engagement?.likes || 0,
          upvotes: artwork.upvotes || 0,
          price: artwork.pricing?.price || 0,
          isForSale: artwork.pricing?.isForSale || false,
          createdAt: artwork.createdAt,
        }))

        stats.totalArtworks = artworks.length
        stats.totalViews = artworks.reduce((sum, artwork) => sum + (artwork.engagement?.views || 0), 0)
        stats.totalLikes = artworks.reduce((sum, artwork) => sum + (artwork.engagement?.likes || 0), 0)
        stats.totalUpvotes = artworks.reduce((sum, artwork) => sum + (artwork.upvotes || 0), 0)
      } catch (error) {
        console.log("Error fetching artworks:", error.message)
        content = []
      }
    }

    // Format artist profile
    const formattedArtist = {
      id: artist._id.toString(),
      name: artist.name,
      bio: artist.bio || "",
      profileImage: artist.profileImage || "",
      coverImage: artist.coverImage || "",
      location: artist.location || {},
      socialLinks: artist.socialLinks || {},
      artistInfo: artist.artistInfo || {},
      membershipTier: artist.membership?.tier || "free",
      isVerified: artist.isVerified || false,
      joinedDate: artist.createdAt,
      userType: artist.userType,
      stats,
    }

    console.log("Returning artist data for:", formattedArtist.name)

    return NextResponse.json({
      artist: formattedArtist,
      content,
      posts,
      currentTab: tab,
      isFollowing,
    })
  } catch (error) {
    console.error("Fetch artist profile error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch artist profile",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
