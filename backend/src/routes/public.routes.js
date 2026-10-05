import express from "express";
import { getHomepageStats, getPublicCatalog } from "../controllers/public.controller.js";

const router = express.Router();

router.get("/homepage-stats", getHomepageStats);
router.get("/catalog", getPublicCatalog);

export default router;
