const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY
})

// Cloudinary Upload Image
const cloudinaryUploadImage = async (fileUpload)=>{
  try {
    const data = await cloudinary.uploader.upload(fileUpload , {
      resource_type: "auto",
    })
    return data;
  } catch (error) {
    console.log(error)
    throw new Error("Internal Server Error (cloudinary)");
  }
}

// Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId)=>{
  try {
    const data = await cloudinary.uploader.destroy(imagePublicId);
    return data;
  } catch (error) {
    console.log(error)
    throw new Error("Internal Server Error (cloudinary)");
  }
}

const cloudinaryRemoveMultipleImage = async (imagePublicId)=>{
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    throw new Error("Internal Server Error (cloudinary)");
  }
}

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage
}