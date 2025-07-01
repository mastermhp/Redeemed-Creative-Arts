import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["painting", "digital-art", "photography", "sculpture", "drawing", "business", "other"],
    },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
    },
    duration: {
      type: Number, // in minutes
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    thumbnail: {
      url: String,
      publicId: String,
      width: Number,
      height: Number,
      format: String,
      bytes: Number,
    },
    lessons: [
      {
        title: String,
        description: String,
        videoUrl: String,
        duration: Number,
        order: Number,
        isPreview: {
          type: Boolean,
          default: false,
        },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    enrollmentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    tags: [String],
    requirements: [String],
    learningOutcomes: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
courseSchema.index({ instructor: 1, status: 1 })
courseSchema.index({ category: 1, level: 1 })
courseSchema.index({ title: "text", description: "text" })

export default mongoose.models.Course || mongoose.model("Course", courseSchema)
