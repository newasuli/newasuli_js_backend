import mongoose from 'mongoose';

const popupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String },
    cloudinaryPublicId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Popup = mongoose.model('Popup', popupSchema);