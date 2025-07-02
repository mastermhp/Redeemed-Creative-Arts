import { v2 as cloudinary } from "cloudinary"
import { Buffer } from "buffer"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload image to Cloudinary
export async function uploadToCloudinary(file, folder = "uploads") {
  try {
    // Convert File to buffer if needed
    let buffer
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      buffer = file
    }

    return await uploadImage(buffer, { folder })
  } catch (error) {
    console.error("uploadToCloudinary error:", error)
    throw new Error("Failed to upload to Cloudinary")
  }
}

// Upload image using buffer
export const uploadImage = async (buffer, options = {}) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: options.folder || "uploads",
            transformation: options.transformation || [],
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        .end(buffer)
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("Failed to upload image")
  }
}

// Upload multiple images
export async function uploadMultipleToCloudinary(files, folder = "uploads") {
  try {
    const buffers = []
    for (const file of files) {
      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer()
        buffers.push(Buffer.from(arrayBuffer))
      } else {
        buffers.push(file)
      }
    }
    return await uploadMultipleImages(buffers, folder)
  } catch (error) {
    console.error("Multiple upload error:", error)
    throw new Error("Failed to upload multiple images")
  }
}

// Upload multiple images using buffers
export const uploadMultipleImages = async (buffers, folder = "uploads") => {
  try {
    const uploadPromises = buffers.map((buffer) => uploadImage(buffer, { folder }))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error("Cloudinary multiple upload error:", error)
    throw new Error("Failed to upload images")
  }
}

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  return await deleteImage(publicId)
}

// Delete image using publicId
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    throw new Error("Failed to delete image")
  }
}

// Delete multiple images
export const deleteMultipleFromCloudinary = async (publicIds) => {
  return await deleteMultipleImages(publicIds)
}

// Delete multiple images using publicIds
export const deleteMultipleImages = async (publicIds) => {
  try {
    const deletePromises = publicIds.map((publicId) => deleteImage(publicId))
    return await Promise.all(deletePromises)
  } catch (error) {
    console.error("Cloudinary multiple delete error:", error)
    throw new Error("Failed to delete images")
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
