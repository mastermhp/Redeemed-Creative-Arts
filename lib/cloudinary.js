import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file, folder = "redeemed-arts") {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
      transformation: [{ width: 1200, height: 1200, crop: "limit", quality: "auto" }, { format: "webp" }],
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`)
  }
}

export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    throw new Error(`Image deletion failed: ${error.message}`)
  }
}

export async function uploadMultipleImages(files, folder = "redeemed-arts") {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, folder))
    const results = await Promise.all(uploadPromises)
    return results
  } catch (error) {
    throw new Error(`Multiple image upload failed: ${error.message}`)
  }
}

export default cloudinary
