import mongoose from "mongoose"
import bcrypt from "bcryptjs"

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

    // Points and gamification
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

    // Social connections
    socialLinks: {
      website: String,
      instagram: String,
      facebook: String,
      twitter: String,
      linkedin: String,
    },

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
userSchema.index({ email: 1 })
userSchema.index({ userType: 1 })
userSchema.index({ isActive: 1 })
userSchema.index({ "location.coordinates": "2dsphere" })

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next()

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw error
  }
}

// Method to update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date()
  this.loginCount += 1
  return this.save()
}

// Virtual for full name (if needed)
userSchema.virtual("displayName").get(function () {
  return this.name || this.email
})

// Export model
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
