import mongoose from "mongoose"

const engagementRewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["like", "comment", "share", "vote", "donate", "attend_event", "complete_profile", "daily_login"],
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 0,
    },
    relatedEntity: {
      entityType: {
        type: String,
        enum: ["artwork", "event", "donation", "contest", "comment", "user"],
      },
      entityId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    multiplier: {
      type: Number,
      default: 1,
      min: 1,
    },
    description: String,
    isProcessed: {
      type: Boolean,
      default: false,
    },
    processedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
engagementRewardSchema.index({ user: 1, createdAt: -1 })
engagementRewardSchema.index({ action: 1 })
engagementRewardSchema.index({ isProcessed: 1 })

export default mongoose.models.EngagementReward || mongoose.model("EngagementReward", engagementRewardSchema)
