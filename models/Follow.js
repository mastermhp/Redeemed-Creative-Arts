import mongoose from "mongoose"

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate follows and optimize queries
followSchema.index({ follower: 1, following: 1 }, { unique: true })
followSchema.index({ following: 1, status: 1 })
followSchema.index({ follower: 1, status: 1 })

// Virtual for checking if follow is active
followSchema.virtual("isActive").get(function () {
  return this.status === "active"
})

export default mongoose.models.Follow || mongoose.model("Follow", followSchema)
