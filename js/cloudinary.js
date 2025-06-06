// Cloudinary Integration for EmmanuelJean
class CloudinaryUploader {
    constructor() {
        this.cloudName = 'drr8jzmuc';
        this.uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
        // You'll need to create an upload preset in Cloudinary dashboard
        this.uploadPreset = 'emmanueljean_preset'; // Create this in Cloudinary
    }

    // Upload file to Cloudinary
    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', this.uploadPreset);
            formData.append('folder', 'emmanueljean'); // Organize uploads

            const response = await fetch(this.uploadUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            return {
                success: true,
                url: data.secure_url,
                public_id: data.public_id,
                format: data.format,
                width: data.width,
                height: data.height
            };
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Delete file from Cloudinary (requires backend for signed requests)
    async deleteFile(publicId) {
        // Note: Deletion requires server-side implementation with API secret
        // For now, we'll just remove from local storage
        console.log('File deletion would happen server-side:', publicId);
        return { success: true };
    }
}

// Create global uploader instance
window.cloudinaryUploader = new CloudinaryUploader();