import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL'],
    },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);