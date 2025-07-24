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
      enum: [
        "painting",
        "sculpture",
        "photography",
        "digital",
        "mixed-media",
        "drawing",
        "printmaking",
        "video",
        "other",
      ],
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
    // Artist upvoting system
    upvotes: { type: Number, default: 0 },
    upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
    // Comments system
    commentsEnabled: { type: Boolean, default: true },
    allowAds: { type: Boolean, default: false },
    // Contest participation
    contestEntries: [
      {
        contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
        submittedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
      },
    ],
    // Sales tracking
    salesHistory: [
      {
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        price: Number,
        soldAt: { type: Date, default: Date.now },
        platform: String,
      },
    ],
    // Admin fields
    moderationNotes: String,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better performance
artworkSchema.index({ artist: 1, status: 1 })
artworkSchema.index({ category: 1, status: 1 })
artworkSchema.index({ tags: 1 })
artworkSchema.index({ "pricing.isForSale": 1, status: 1 })
artworkSchema.index({ isFeatured: 1, status: 1 })
artworkSchema.index({ createdAt: -1 })
artworkSchema.index({ "engagement.views": -1 })
artworkSchema.index({ "engagement.likes": -1 })
artworkSchema.index({ upvotes: -1 })

// Virtual for primary image
artworkSchema.virtual("primaryImage").get(function () {
  const primary = this.images.find((img) => img.isPrimary)
  return primary || this.images[0] || null
})

// Virtual for engagement score
artworkSchema.virtual("engagementScore").get(function () {
  const { views, likes, shares, comments, saves } = this.engagement
  return views * 1 + likes * 3 + shares * 5 + comments * 4 + saves * 2 + (this.upvotes || 0) * 10
})

// Pre-save middleware
artworkSchema.pre("save", function (next) {
  // Ensure at least one image is marked as primary
  if (this.images.length > 0 && !this.images.some((img) => img.isPrimary)) {
    this.images[0].isPrimary = true
  }

  // Clean up tags
  if (this.tags) {
    this.tags = this.tags.filter((tag) => tag.trim().length > 0).map((tag) => tag.trim().toLowerCase())
  }

  next()
})

// Static methods
artworkSchema.statics.findByArtist = function (artistId, options = {}) {
  const query = { artist: artistId, status: "approved" }
  return this.find(query, null, options).populate("artist", "name profileImage")
}

artworkSchema.statics.findFeatured = function (limit = 10) {
  return this.find({ isFeatured: true, status: "approved" })
    .populate("artist", "name profileImage")
    .sort({ createdAt: -1 })
    .limit(limit)
}

artworkSchema.statics.findByCategory = function (category, options = {}) {
  return this.find({ category, status: "approved" }, null, options).populate("artist", "name profileImage")
}

// Instance methods
artworkSchema.methods.incrementViews = function () {
  this.engagement.views += 1
  return this.save()
}

artworkSchema.methods.toggleLike = function (userId) {
  // This would need to be implemented with a separate likes collection
  // for proper tracking of who liked what
  this.engagement.likes += 1
  return this.save()
}

artworkSchema.methods.canBeEditedBy = function (userId) {
  return this.artist.toString() === userId.toString()
}

artworkSchema.methods.canBeViewedBy = function (user) {
  if (this.visibility === "public" && this.status === "approved") return true
  if (!user) return false
  if (this.artist.toString() === user._id.toString()) return true
  if (user.userType === "admin") return true
  return false
}

const Artwork = mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema)

export default Artwork
