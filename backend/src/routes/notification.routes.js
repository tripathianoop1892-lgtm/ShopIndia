import express from "express";
import { createNotification, deleteNotification, getMyNotifications, getNotifications } from "../controllers/notification.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", checkAuth, getMyNotifications);
router.get("/", checkAuth, checkRole("admin"), getNotifications);
router.post("/", checkAuth, checkRole("admin"), createNotification);
router.delete("/:id", checkAuth, checkRole("admin"), deleteNotification);

export default router;
