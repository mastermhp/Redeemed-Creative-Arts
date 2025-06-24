import mongoose from "mongoose"

const ArtworkSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    // Artist Information
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Artwork Details
    category: {
      type: String,
      enum: ["painting", "digital", "photography", "sculpture", "mixed-media", "drawing", "other"],
      required: true,
    },
    medium: {
      type: String,
      required: true,
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
      unit: { type: String, enum: ["inches", "cm"], default: "inches" },
    },

    // Images
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
      },
    ],

    // Pricing & Availability
    pricing: {
      isForSale: { type: Boolean, default: false },
      price: Number,
      originalPrice: Number,
      currency: { type: String, default: "USD" },
      acceptsOffers: { type: Boolean, default: false },
    },

    // Engagement & Points
    engagement: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      saves: { type: Number, default: 0 },
    },

    // Points earned from this artwork
    pointsEarned: {
      upload: { type: Number, default: 50 },
      engagement: { type: Number, default: 0 },
      sales: { type: Number, default: 0 },
      total: { type: Number, default: 50 },
    },

    // Tags & Keywords
    tags: [String],
    keywords: [String],

    // Status & Moderation
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected", "archived"],
      default: "pending",
    },
    moderationNotes: String,

    // Featured & Contests
    isFeatured: { type: Boolean, default: false },
    featuredDate: Date,
    contests: [
      {
        contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
        submissionDate: Date,
        rank: Number,
      },
    ],

    // AI Verification
    aiVerification: {
      isVerified: { type: Boolean, default: false },
      verificationDate: Date,
      confidence: Number,
      notes: String,
    },

    // SEO & Metadata
    seo: {
      slug: String,
      metaTitle: String,
      metaDescription: String,
      altText: String,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
ArtworkSchema.index({ artist: 1 })
ArtworkSchema.index({ category: 1 })
ArtworkSchema.index({ status: 1 })
ArtworkSchema.index({ isFeatured: 1 })
ArtworkSchema.index({ "engagement.likes": -1 })
ArtworkSchema.index({ createdAt: -1 })

// Generate slug before saving
ArtworkSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }
  next()
})

export default mongoose.models.Artwork || mongoose.model("Artwork", ArtworkSchema)
