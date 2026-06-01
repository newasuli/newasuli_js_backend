import express from 'express';
import upload from '../middleware/upload.js';
import { fetchGallery, uploadGallery } from '../controller/galleryController.js';

const router = express.Router();

router.get('/', fetchGallery);
router.post('/', upload.single("image"), uploadGallery);

export {router as galleryRouter};