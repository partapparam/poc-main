import express from 'express';
import { fetchAccountsByName } from '../controllers/insurance_controller.js';

const router = express.Router();

router.post('/fetchAccountsByName', fetchAccountsByName);

export default router;
