import mongoose from "mongoose"

const engagementRewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "daily_login",
        "artwork_like",
        "comment_posted",
        "donation_made",
        "event_attended",
        "course_completed",
        "milestone_reached",
      ],
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    relatedItem: {
      itemType: {
        type: String,
        enum: ["artwork", "course", "product", "event", "contest", "donation"],
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    milestone: {
      name: String,
      level: Number,
      requirement: Number,
      achieved: {
        type: Boolean,
        default: false,
      },
    },
    streak: {
      current: {
        type: Number,
        default: 0,
      },
      best: {
        type: Number,
        default: 0,
      },
    },
    claimed: {
      type: Boolean,
      default: false,
    },
    claimedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
engagementRewardSchema.index({ user: 1, createdAt: -1 })
engagementRewardSchema.index({ type: 1, createdAt: -1 })
engagementRewardSchema.index({ claimed: 1 })

export default mongoose.models.EngagementReward || mongoose.model("EngagementReward", engagementRewardSchema)
