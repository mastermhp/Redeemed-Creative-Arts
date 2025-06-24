import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema(
  {
    // Transaction Details
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["donation", "purchase", "commission", "subscription", "points_redemption"],
      required: true,
    },

    // Parties Involved
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Amount & Currency
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },

    // Points
    pointsAwarded: {
      type: Number,
      default: 0,
    },
    pointsUsed: {
      type: Number,
      default: 0,
    },

    // Related Items
    relatedItem: {
      itemType: {
        type: String,
        enum: ["artwork", "course", "merchandise", "subscription"],
      },
      itemId: mongoose.Schema.Types.ObjectId,
      itemTitle: String,
    },

    // Payment Information
    paymentMethod: {
      type: String,
      enum: ["stripe", "paypal", "bank_transfer", "points"],
      required: true,
    },
    paymentIntentId: String,

    // Status
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded", "cancelled"],
      default: "pending",
    },

    // Fees & Commissions
    platformFee: {
      type: Number,
      default: 0,
    },
    artistCommission: {
      type: Number,
      default: 0,
    },

    // Metadata
    metadata: {
      ipAddress: String,
      userAgent: String,
      notes: String,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
TransactionSchema.index({ from: 1 })
TransactionSchema.index({ to: 1 })
TransactionSchema.index({ type: 1 })
TransactionSchema.index({ status: 1 })
TransactionSchema.index({ createdAt: -1 })

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)
