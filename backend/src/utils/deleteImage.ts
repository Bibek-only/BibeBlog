// import {v2 as cloudinary} from "cloudinary";

// cloudinary.config({ 
//     cloud_name:c.env.CLOUD_NAME,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECREATE

// })

// export const  deleteFromCloudinary = async (publicId:string) => {
//     try {
//       const result = await cloudinary.uploader.destroy(publicId);
//       return result;
//     } catch (error) {
//       console.error('Error deleting image:', error);
//       throw error;
//     }
//   };