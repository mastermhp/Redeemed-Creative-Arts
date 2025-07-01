import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (buffer, options = {}) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: "image",
        folder: options.folder || "uploads",
        transformation: options.transformation || [{ width: 1200, height: 1200, crop: "limit", quality: "auto" }],
        ...options,
      }

      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error)
            reject(error)
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            })
          }
        })
        .end(buffer)
    })
  } catch (error) {
    console.error("Upload image error:", error)
    throw error
  }
}

export const uploadMultipleImages = async (buffers, folder = "uploads") => {
  try {
    const uploadPromises = buffers.map((buffer, index) =>
      uploadImage(buffer, {
        folder: `${folder}`,
        public_id: `${Date.now()}_${index}`,
      }),
    )

    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error("Upload multiple images error:", error)
    throw error
  }
}

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error("Delete image error:", error)
    throw error
  }
}

export const deleteMultipleImages = async (publicIds) => {
  try {
    if (!publicIds || publicIds.length === 0) {
      return { deleted: [] }
    }

    const deletePromises = publicIds.map((publicId) => deleteImage(publicId))
    const results = await Promise.all(deletePromises)

    return {
      deleted: results.filter((result) => result.result === "ok").map((_, index) => publicIds[index]),
      errors: results.filter((result) => result.result !== "ok"),
    }
  } catch (error) {
    console.error("Delete multiple images error:", error)
    throw error
  }
}

export const getImageUrl = (publicId, transformation = {}) => {
  try {
    return cloudinary.url(publicId, {
      secure: true,
      ...transformation,
    })
  } catch (error) {
    console.error("Get image URL error:", error)
    return null
  }
}

export default cloudinary
