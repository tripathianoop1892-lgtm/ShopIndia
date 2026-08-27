import express from "express";
import { createNotification, deleteNotification, getNotifications } from "../controllers/notification.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(checkAuth, checkRole("admin"));
router.get("/", getNotifications);
router.post("/", createNotification);
router.delete("/:id", deleteNotification);

export default router;
