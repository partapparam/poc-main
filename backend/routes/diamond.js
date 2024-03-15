import express from 'express';
import { fetchDiamondPrice, fetchCalculations } from '../controllers/diamond_controller.js';

const router = express.Router();

router.post('/fetchDiamondPrice', fetchDiamondPrice);
router.post('/fetchCalculations', fetchCalculations);

export default router;
