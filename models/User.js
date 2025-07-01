import mongoose from "mongoose"
import crypto from "crypto"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: ["artist", "patron", "church", "admin"],
      default: "patron",
    },
    profile: {
      bio: String,
      avatar: String,
      website: String,
      socialLinks: {
        instagram: String,
        facebook: String,
        twitter: String,
        linkedin: String,
      },
    },
    points: {
      current: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
      level: {
        type: String,
        enum: ["bronze", "silver", "gold", "platinum", "diamond"],
        default: "bronze",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // Artist-specific fields
    artistInfo: {
      specialties: [String],
      experience: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "professional"],
      },
      portfolio: [
        {
          title: String,
          description: String,
          imageUrl: String,
          category: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      commissionRates: {
        hourly: Number,
        project: Number,
      },
      availability: {
        type: String,
        enum: ["available", "busy", "unavailable"],
        default: "available",
      },
    },

    // Church-specific fields
    churchInfo: {
      organizationName: String,
      denomination: String,
      size: String,
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
      pastor: String,
      artsMinistryContact: String,
    },

    // Membership and subscription
    membership: {
      tier: {
        type: String,
        enum: ["free", "bronze", "silver", "gold", "platinum", "diamond"],
        default: "free",
      },
      subscriptionStatus: {
        type: String,
        enum: ["active", "inactive", "cancelled", "expired"],
        default: "inactive",
      },
      subscriptionId: String,
      subscriptionStartDate: Date,
      subscriptionEndDate: Date,
    },

    // Helper system
    isHelper: {
      type: Boolean,
      default: false,
    },
    helperInfo: {
      skills: [String],
      availability: {
        days: [String],
        hours: String,
      },
      radius: Number,
      rating: {
        average: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    },

    // Legal agreements
    agreements: {
      termsAccepted: {
        type: Boolean,
        default: false,
      },
      termsAcceptedDate: Date,
      privacyAccepted: {
        type: Boolean,
        default: false,
      },
      privacyAcceptedDate: Date,
      artistDisclaimer: {
        type: Boolean,
        default: false,
      },
      artistDisclaimerDate: Date,
      helperAgreement: {
        type: Boolean,
        default: false,
      },
      helperAgreementDate: Date,
      noAIConfirmation: {
        type: Boolean,
        default: false,
      },
      noAIConfirmationDate: Date,
    },

    // Email verification
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // Password reset
    passwordResetToken: String,
    passwordResetExpires: Date,

    // Notifications preferences
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
    },

    // Activity tracking
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better performance
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ userType: 1 })
userSchema.index({ isActive: 1 })
userSchema.index({ emailVerificationToken: 1 })
userSchema.index({ passwordResetToken: 1 })

// Method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex")
  this.emailVerificationToken = token
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  return token
}

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = token
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
  return token
}

// Method to update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date()
  this.loginCount = (this.loginCount || 0) + 1

  // Award daily login points
  const today = new Date().toDateString()
  const lastLoginDate = this.lastLogin ? new Date(this.lastLogin).toDateString() : null

  if (lastLoginDate !== today) {
    this.points.current += 5
    this.points.total += 5

    // Update level based on total points
    if (this.points.total >= 5000) this.points.level = "diamond"
    else if (this.points.total >= 2000) this.points.level = "platinum"
    else if (this.points.total >= 1000) this.points.level = "gold"
    else if (this.points.total >= 500) this.points.level = "silver"
    else this.points.level = "bronze"
  }

  return this.save()
}

// Virtual for display name
userSchema.virtual("displayName").get(function () {
  return this.name || this.email
})

// Export model
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
