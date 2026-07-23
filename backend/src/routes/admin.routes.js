import express from "express";
import{
    getCustomers
} from "../controllers/admin.controller.js"
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Admin Router
router.get("/customers", checkAuth, checkRole("admin"), getCustomers);

export default router