import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import { uploadImage } from "@/lib/cloudinary"
import Course from "@/models/Course"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    const courses = await Course.find({ instructor: user._id })
      .sort({ createdAt: -1 })
      .select("title description category level duration price status enrollmentCount thumbnail")
      .lean()

    const formattedCourses = courses.map((course) => ({
      id: course._id,
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price,
      status: course.status,
      enrollmentCount: course.enrollmentCount || 0,
      thumbnail: course.thumbnail?.url || null,
    }))

    return NextResponse.json({ courses: formattedCourses })
  } catch (error) {
    console.error("Fetch courses error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    const formData = await request.formData()

    const title = formData.get("title")
    const description = formData.get("description")
    const category = formData.get("category")
    const level = formData.get("level")
    const duration = formData.get("duration")
    const price = formData.get("price")

    if (!title || !description || !category || !level) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let thumbnail = null
    const thumbnailFile = formData.get("thumbnail")
    if (thumbnailFile && thumbnailFile.size > 0) {
      const bytes = await thumbnailFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      thumbnail = await uploadImage(buffer, { folder: "courses/thumbnails" })
    }

    const courseData = {
      title: title.trim(),
      description: description.trim(),
      instructor: user._id,
      category,
      level,
      duration: duration ? Number.parseInt(duration) : null,
      price: price ? Number.parseFloat(price) : 0,
      thumbnail,
      status: "draft",
      enrollmentCount: 0,
    }

    const course = new Course(courseData)
    await course.save()

    return NextResponse.json(
      {
        message: "Course created successfully",
        course: {
          id: course._id,
          title: course.title,
          status: course.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create course error:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
