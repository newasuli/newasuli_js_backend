import express from 'express';

import { fetchMenu } from '../controller/menuController.js';

const router = express.Router();

router.get('/', fetchMenu);

export {router as menuRouter}