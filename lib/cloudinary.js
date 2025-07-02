import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload single image
export async function uploadImage(file, folder = 'artworks') {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    })
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Upload multiple images
export async function uploadMultipleImages(files, folder = 'artworks') {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder))
    const results = await Promise.all(uploadPromises)
    
    const successful = results.filter(result => result.success)
    const failed = results.filter(result => !result.success)
    
    return {
      success: failed.length === 0,
      successful,
      failed,
      total: files.length,
    }
  } catch (error) {
    console.error('Multiple upload error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Delete single image
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    
    return {
      success: result.result === 'ok',
      result: result.result,
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Delete multiple images
export async function deleteMultipleImages(publicIds) {
  try {
    const deletePromises = publicIds.map(publicId => deleteImage(publicId))
    const results = await Promise.all(deletePromises)
    
    const successful = results.filter(result => result.success)
    const failed = results.filter(result => !result.success)
    
    return {
      success: failed.length === 0,
      successful,
      failed,
      total: publicIds.length,
    }
  } catch (error) {
    console.error('Multiple delete error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Get image info
export async function getImageInfo(publicId) {
  try {
    const result = await cloudinary.api.resource(publicId)
    
    return {
      success: true,
      info: {
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        createdAt: result.created_at,
      },
    }
  } catch (error) {
    console.error('Get image info error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Transform image
export function transformImage(publicId, transformations = {}) {
  try {
    const url = cloudinary.url(publicId, {
      ...transformations,
      secure: true,
    })
    
    return {
      success: true,
      url,
    }
  } catch (error) {
    console.error('Transform image error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Compatibility functions for existing code
export const uploadToCloudinary = uploadImage
export const deleteFromCloudinary = deleteImage

export default cloudinary
