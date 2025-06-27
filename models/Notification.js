import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema(
  {
    // Recipient
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Notification Details
    type: {
      type: String,
      enum: [
        "artwork_liked",
        "artwork_commented",
        "artwork_sold",
        "contest_entry",
        "contest_winner",
        "points_earned",
        "level_up",
        "new_follower",
        "commission_request",
        "system_announcement",
        "donation_received",
        "commission_completed"
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    // Related Data
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedArtwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
    relatedContest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
    },

    // Status
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,

    // Delivery
    channels: {
      inApp: { type: Boolean, default: true },
      email: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
    },

    // Priority
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
NotificationSchema.index({ recipient: 1, isRead: 1 })
NotificationSchema.index({ createdAt: -1 })

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema)
