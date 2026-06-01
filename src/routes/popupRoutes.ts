import express from 'express';
import { getPopups, uploadPopup } from '../controller/popupController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getPopups);
router.post('/', upload.single('image'), uploadPopup);

export { router as popupRouter };