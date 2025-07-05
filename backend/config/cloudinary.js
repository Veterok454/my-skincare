import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    return cloudinary;
  } catch (error) {
    throw new Error(`Cloudinary configuration failed: ${error.message}`);
  }
};

export default connectCloudinary;
