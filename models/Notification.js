import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: String, // Changed from ObjectId to String to allow "admin"
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "artwork_submitted",
        "artwork_approved",
        "artwork_rejected",
        "contest_entry",
        "donation_received",
        "event_created",
        "course_created",
        "product_created",
        "general",
      ],
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
notificationSchema.index({ recipient: 1, isRead: 1 })
notificationSchema.index({ createdAt: -1 })

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema)
