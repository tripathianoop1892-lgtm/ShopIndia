import express from "express"
import{
    createCoupon,
    deleteCoupon,
    getCoupons,
    updateCoupon,
    validateCoupon,

} from "../controllers/coupons.controllers.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

 const router = express.Router();

 router.post("/validte", checkAuth, validateCoupon);
 router.get("/", checkAuth, checkRole("admin"), getCoupons);
 router.post("/", checkAuth, checkRole("admin"),createCoupon);
 router.put("/:id", checkAuth, checkRole("admin"), updateCoupon);
 router.delete("/:id", checkAuth, checkRole("admin"),deleteCoupon)

 export default router;