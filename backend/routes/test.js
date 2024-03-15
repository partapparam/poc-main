import express from 'express';
import { getTest } from '../controllers/test_controller.js';

const router = express.Router();

router.post('/getTest', getTest);

export default router;
