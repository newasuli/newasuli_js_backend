import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export const Menu = mongoose.model('Menu', menuSchema);