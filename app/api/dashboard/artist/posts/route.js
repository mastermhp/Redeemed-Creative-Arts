import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Mock Post model - replace with actual model
const Post = {
  create: async (postData) => {
    // This would be your actual database create operation
    return {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
      likesCount: 0,
      commentsCount: 0,
    }
  },

  findByAuthor: async (authorId, options = {}) => {
    // This would be your actual database query
    return []
  },
}

export async function POST(request) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Only artists can create posts" }, { status: 403 })
    }

    const formData = await request.formData()
    const title = formData.get("title")
    const content = formData.get("content")
    const visibility = formData.get("visibility") || "public"
    const postType = formData.get("postType") || "text"
    const images = formData.getAll("images")

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const postData = {
      title,
      content,
      visibility,
      postType,
      authorId: user._id,
      authorName: user.name,
      authorProfileImage: user.profileImage,
      images: [],
    }

    // Upload images to Cloudinary if provided
    if (images && images.length > 0) {
      const uploadPromises = images.map(async (image) => {
        if (image.size === 0) return null

        try {
          const bytes = await image.arrayBuffer()
          const buffer = Buffer.from(bytes)

          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "image",
                  folder: "redeemed-creative-arts/posts",
                  transformation: [
                    { width: 1200, height: 800, crop: "limit" },
                    { quality: "auto", fetch_format: "auto" },
                  ],
                },
                (error, result) => {
                  if (error) reject(error)
                  else resolve(result)
                },
              )
              .end(buffer)
          })

          return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            width: uploadResult.width,
            height: uploadResult.height,
          }
        } catch (error) {
          console.error("Image upload error:", error)
          return null
        }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      postData.images = uploadedImages.filter((img) => img !== null)
    }

    // Create the post
    const newPost = await Post.create(postData)

    return NextResponse.json({
      message: "Post created successfully",
      post: newPost,
    })
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Only artists can access their posts" }, { status: 403 })
    }

    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page")) || 1
    const limit = Number.parseInt(url.searchParams.get("limit")) || 10
    const postType = url.searchParams.get("postType")

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    }

    if (postType && postType !== "all") {
      options.filter = { postType }
    }

    const posts = await Post.findByAuthor(user._id, options)

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: posts.length,
        hasMore: posts.length === limit,
      },
    })
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
