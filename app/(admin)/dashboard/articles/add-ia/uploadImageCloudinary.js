"use server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dz3xgefqb', 
    api_key: '815939347275239', 
    api_secret: 'vJIJpGB4ncj4F1MHi7OCNVs_hMQ'
});

export async function uploadImageCloudinary(urlImage, title) {
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(urlImage, {
            public_id: title,
        });
        
        console.log(uploadResult);
        return uploadResult;
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });
        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        console.log(autoCropUrl);
    } catch (error) {
        console.log(error);
    }
}
