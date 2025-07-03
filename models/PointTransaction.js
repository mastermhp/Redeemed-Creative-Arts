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
      trim: true,
    },
    relatedItem: {
      itemType: {
        type: String,
        enum: ["artwork", "course", "product", "event", "contest"],
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "completed",
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for efficient queries
pointTransactionSchema.index({ from: 1, createdAt: -1 })
pointTransactionSchema.index({ to: 1, createdAt: -1 })
pointTransactionSchema.index({ type: 1, createdAt: -1 })
pointTransactionSchema.index({ status: 1 })

export default mongoose.models.PointTransaction || mongoose.model("PointTransaction", pointTransactionSchema)
