import express from "express";
import{
    getCustomers,
    getDistributors,
    getMedicine,
    getOrders,
    getShopkeeper
} from "../controllers/admin.controller.js"
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Admin Router
router.get("/customers", checkAuth, checkRole("admin"), getCustomers);
router.get("/shopkeepers",checkAuth, checkRole("admin"), getShopkeeper);
router.get("/distributors",checkAuth, checkRole("admin"), getDistributors);
router.get("/medicines", checkAuth, checkRole("admin"), getMedicine);
router.get("/orders", checkAuth, checkRole("admin"), getOrders);

export default router