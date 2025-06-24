import mongoose from "mongoose"

const VoteSchema = new mongoose.Schema(
  {
    // Voter Information
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Vote Target
    targetType: {
      type: String,
      enum: ["artwork", "contest_submission"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Vote Details
    voteType: {
      type: String,
      enum: ["like", "contest_vote"],
      required: true,
    },

    // Contest-specific
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
    },

    // Tracking
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  },
)

// Compound indexes to prevent duplicate votes
VoteSchema.index({ voter: 1, targetId: 1, voteType: 1 }, { unique: true })
VoteSchema.index({ voter: 1, contest: 1 }, { unique: true, sparse: true })

export default mongoose.models.Vote || mongoose.model("Vote", VoteSchema)
