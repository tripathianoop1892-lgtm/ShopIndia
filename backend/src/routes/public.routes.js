import express from "express";
import { getHomepageStats } from "../controllers/public.controller.js";

const router = express.Router();

router.get("/homepage-stats", getHomepageStats);

export default router;
