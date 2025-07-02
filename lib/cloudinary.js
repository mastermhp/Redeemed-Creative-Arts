import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload image to Cloudinary
export async function uploadToCloudinary(file, folder = "redeemed-creative-arts") {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
      transformation: [{ width: 1200, height: 1200, crop: "limit" }, { quality: "auto" }, { format: "auto" }],
    })

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Delete image from Cloudinary
export async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)

    return {
      success: result.result === "ok",
      result: result.result,
    }
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Get optimized image URL
export function getOptimizedImageUrl(publicId, options = {}) {
  const { width = 800, height = 600, crop = "fill", quality = "auto", format = "auto" } = options

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    format,
  })
}

// Generate thumbnail URL
export function getThumbnailUrl(publicId, size = 200) {
  return cloudinary.url(publicId, {
    width: size,
    height: size,
    crop: "fill",
    quality: "auto",
    format: "auto",
  })
}

// Upload multiple images
export async function uploadMultipleToCloudinary(files, folder = "redeemed-creative-arts") {
  try {
    const uploadPromises = files.map((file) => uploadToCloudinary(file, folder))
    const results = await Promise.all(uploadPromises)

    return {
      success: true,
      results,
    }
  } catch (error) {
    console.error("Multiple upload error:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Delete multiple images
export async function deleteMultipleFromCloudinary(publicIds) {
  try {
    const deletePromises = publicIds.map((publicId) => deleteFromCloudinary(publicId))
    const results = await Promise.all(deletePromises)

    return {
      success: true,
      results,
    }
  } catch (error) {
    console.error("Multiple delete error:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Get image details
export async function getImageDetails(publicId) {
  try {
    const result = await cloudinary.api.resource(publicId)

    return {
      success: true,
      details: {
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        createdAt: result.created_at,
        tags: result.tags,
      },
    }
  } catch (error) {
    console.error("Get image details error:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Search images by tag
export async function searchImagesByTag(tag, maxResults = 50) {
  try {
    const result = await cloudinary.search.expression(`tags:${tag}`).max_results(maxResults).execute()

    return {
      success: true,
      images: result.resources,
    }
  } catch (error) {
    console.error("Search images error:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export default cloudinary
