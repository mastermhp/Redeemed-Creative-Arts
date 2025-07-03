import mongoose from "mongoose"

const pointTransactionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ["gift", "reward", "purchase", "refund", "bonus"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    relatedEntity: {
      entityType: {
        type: String,
        enum: ["artwork", "event", "donation", "contest", "comment"],
      },
      entityId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "completed",
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
pointTransactionSchema.index({ from: 1, createdAt: -1 })
pointTransactionSchema.index({ to: 1, createdAt: -1 })
pointTransactionSchema.index({ type: 1 })
pointTransactionSchema.index({ status: 1 })

export default mongoose.models.PointTransaction || mongoose.model("PointTransaction", pointTransactionSchema)
