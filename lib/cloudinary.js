import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload a single image
export const uploadImage = async (file, folder = 'artworks') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    })
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw new Error('Failed to upload image')
  }
}

// Upload multiple images
export const uploadMultipleImages = async (files, folder = 'artworks') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading multiple images:', error)
    throw new Error('Failed to upload images')
  }
}

// Delete an image
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw new Error('Failed to delete image')
  }
}

// Delete multiple images
export const deleteMultipleImages = async (publicIds) => {
  try {
    const deletePromises = publicIds.map(publicId => deleteImage(publicId))
    return await Promise.all(deletePromises)
  } catch (error) {
    console.error('Error deleting multiple images:', error)
    throw new Error('Failed to delete images')
  }
}

// Upload single image with buffer support
export const uploadSingleImage = async (fileData, folder = 'artworks') => {
  try {
    let uploadData

    if (fileData instanceof File) {
      // Handle File object
      const arrayBuffer = await fileData.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      uploadData = `data:${fileData.type};base64,${buffer.toString('base64')}`
    } else if (Buffer.isBuffer(fileData)) {
      // Handle Buffer
      uploadData = `data:image/jpeg;base64,${fileData.toString('base64')}`
    } else if (typeof fileData === 'string') {
      // Handle base64 string or URL
      uploadData = fileData
    } else {
      throw new Error('Unsupported file data type')
    }

    const result = await cloudinary.uploader.upload(uploadData, {
      folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }
  } catch (error) {
    console.error('Error uploading single image:', error)
    throw new Error('Failed to upload image')
  }
}

// Compatibility exports for existing code
export const uploadToCloudinary = async (fileData, folder = 'artworks') => {
  return await uploadSingleImage(fileData, folder)
}

export const deleteFromCloudinary = async (publicId) => {
  return await deleteImage(publicId)
}

export default cloudinary
