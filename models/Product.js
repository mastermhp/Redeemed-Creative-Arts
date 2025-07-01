import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["original", "prints", "merchandise", "gift-cards", "digital", "other"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
        width: Number,
        height: Number,
        format: String,
        bytes: Number,
        isPrimary: {
          type: Boolean,
          default: false,
        },
        alt: String,
      },
    ],
    variants: [
      {
        name: String, // e.g., "Size", "Color"
        options: [String], // e.g., ["Small", "Medium", "Large"]
        price: Number,
        stock: Number,
        sku: String,
      },
    ],
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
      weight: Number,
      unit: {
        type: String,
        enum: ["inches", "cm", "mm"],
        default: "inches",
      },
    },
    materials: [String],
    tags: [String],
    status: {
      type: String,
      enum: ["active", "draft", "archived", "out-of-stock"],
      default: "draft",
    },
    sales: {
      type: Number,
      default: 0,
      min: 0,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    shipping: {
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      freeShipping: {
        type: Boolean,
        default: false,
      },
      shippingCost: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      slug: {
        type: String,
        unique: true,
        sparse: true,
      },
    },
    isDigital: {
      type: Boolean,
      default: false,
    },
    downloadUrl: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
productSchema.index({ seller: 1, status: 1 })
productSchema.index({ category: 1, status: 1 })
productSchema.index({ title: "text", description: "text", tags: "text" })
productSchema.index({ price: 1 })

// Generate SKU if not provided
productSchema.pre("save", function (next) {
  if (!this.sku) {
    this.sku = `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }
  next()
})

export default mongoose.models.Product || mongoose.model("Product", productSchema)
