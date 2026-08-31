import express from "express";

import {
  createSupportTicket,
  getSupportTickets,
  getSupportTicketById,
  updateSupportTicketStatus,
  replySupportTicket,
  createPublicSupportTicket,
} from "../controllers/support.controller.js";

import {
  checkAuth,
  checkRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/public", createPublicSupportTicket);


// ==========================================
// CREATE SUPPORT TICKET
// Customer / Shopkeeper / Distributor
// ==========================================

router.post(
  "/",
  checkAuth,
  createSupportTicket
);


// ==========================================
// GET SUPPORT TICKETS
// Admin = All tickets
// Other users = Their own tickets
// ==========================================

router.get(
  "/",
  checkAuth,
  getSupportTickets
);


// ==========================================
// GET SINGLE TICKET
// ==========================================

router.get(
  "/:id",
  checkAuth,
  getSupportTicketById
);


// ==========================================
// UPDATE TICKET STATUS
// Admin Only
// ==========================================

router.patch(
  "/:id/status",
  checkAuth,
  checkRole("admin"),
  updateSupportTicketStatus
);


// ==========================================
// REPLY TO TICKET
// Admin Only
// ==========================================

router.post(
  "/:id/reply",
  checkAuth,
  checkRole("admin"),
  replySupportTicket
);


export default router;
