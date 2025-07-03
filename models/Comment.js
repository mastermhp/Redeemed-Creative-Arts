import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "hidden", "flagged"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
commentSchema.index({ artwork: 1, createdAt: -1 })
commentSchema.index({ author: 1, createdAt: -1 })
commentSchema.index({ parentComment: 1 })

// Virtual for reply count
commentSchema.virtual("replyCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentComment",
  count: true,
})

// Virtual for like count
commentSchema.virtual("likeCount").get(function () {
  return this.likes ? this.likes.length : 0
})

commentSchema.set("toJSON", { virtuals: true })
commentSchema.set("toObject", { virtuals: true })

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema)
