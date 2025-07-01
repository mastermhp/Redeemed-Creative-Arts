import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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

export const uploadMultipleImages = async (buffers, folder = "uploads") => {
  try {
    const uploadPromises = buffers.map((buffer) => uploadImage(buffer, { folder }))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error("Cloudinary multiple upload error:", error)
    throw new Error("Failed to upload images")
  }
}

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    throw new Error("Failed to delete image")
  }
}

export const deleteMultipleImages = async (publicIds) => {
  try {
    const deletePromises = publicIds.map((publicId) => deleteImage(publicId))
    return await Promise.all(deletePromises)
  } catch (error) {
    console.error("Cloudinary multiple delete error:", error)
    throw new Error("Failed to delete images")
  }
}

export const uploadSingleImage = async (buffer, folder = "uploads") => {
  return uploadImage(buffer, { folder })
}

export default cloudinary
