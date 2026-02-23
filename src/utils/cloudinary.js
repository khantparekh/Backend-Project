import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // console.log("file uploaded successfully ", response.url);

        fs.unlinkSync(localFilePath)

        return response

    } catch (error) {
        fs.unlinkSync(localFilePath);

        return null;
    }
}

const deleteFromCloudinary = async (public_id, type) => {
    if(!public_id) return null;

    try {
        const response = await cloudinary.uploader.destroy(public_id, {
            resource_type: type,
        });

        return response

    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return null;
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}