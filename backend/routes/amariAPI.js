import express from "express";
import fetchAmari from "../controllers/amariFetch.js";

const router = express.Router();

router.post('/amariFetch', fetchAmari);

export default router;