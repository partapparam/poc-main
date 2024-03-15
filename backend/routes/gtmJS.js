import express from 'express';
import { insertSite, getSiteInfo } from '../controllers/gtmJS_controller.js';

const router = express.Router();

router.post('/insertSite', insertSite);
router.post('/getSiteInfo', getSiteInfo);

export default router;
