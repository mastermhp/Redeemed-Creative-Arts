import mongoose from "mongoose"

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["painting", "sculpture", "photography", "digital", "mixed-media", "drawing", "printmaking", "other"],
    },
    medium: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        width: Number,
        height: Number,
        format: String,
        bytes: Number,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    pricing: {
      isForSale: { type: Boolean, default: false },
      price: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "archived"],
      default: "pending",
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    engagement: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      saves: { type: Number, default: 0 },
    },
    metadata: {
      dimensions: {
        width: Number,
        height: Number,
        depth: Number,
        unit: { type: String, default: "inches" },
      },
      weight: Number,
      yearCreated: Number,
      location: String,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
artworkSchema.index({ artist: 1, status: 1 })
artworkSchema.index({ category: 1, status: 1 })
artworkSchema.index({ tags: 1 })
artworkSchema.index({ "engagement.likes": -1 })
artworkSchema.index({ "engagement.views": -1 })
artworkSchema.index({ createdAt: -1 })

export default mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema)
