import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    cloudinaryPublicId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Gallery = mongoose.model('Gallery', gallerySchema);