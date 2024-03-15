import express from "express";
import fetchSemantic from "../controllers/semantic_controller.js";

const router = express.Router();

router.post('/fetchSemantic', fetchSemantic);

export default router;