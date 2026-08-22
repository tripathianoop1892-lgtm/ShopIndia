import Support from "../models/Support.js";

// ==========================================
// CREATE SUPPORT TICKET
// POST /api/support
// ==========================================

export const createSupportTicket = async (
  req,
  res
) => {
  try {
    const {
      subject,
      message,
    } = req.body;

    if (!subject?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject is required.",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const ticket = await Support.create({
      userId: req.user._id,
      name: req.user.name || "Unknown User",
      role: req.user.role,
      subject: subject.trim(),
      message: message.trim(),
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Support ticket created successfully.",
      data: ticket,
    });
  } catch (error) {
    console.error(
      "CREATE SUPPORT TICKET ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create support ticket.",
    });
  }
};


// ==========================================
// GET SUPPORT TICKETS
// GET /api/support
// ==========================================

export const getSupportTickets = async (
  req,
  res
) => {
  try {
    let query = {};

    // Admin can see all tickets
    // Other users can only see their own tickets
    if (req.user.role !== "admin") {
      query.userId = req.user._id;
    }

    const tickets = await Support.find(query)
      .populate(
        "userId",
        "name email mobile role"
      )
      .sort({
        createdAt: -1,
      });

    return res.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error(
      "GET SUPPORT TICKETS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load support tickets.",
    });
  }
};


// ==========================================
// GET SINGLE SUPPORT TICKET
// GET /api/support/:id
// ==========================================

export const getSupportTicketById = async (
  req,
  res
) => {
  try {
    const ticket = await Support.findById(
      req.params.id
    )
      .populate(
        "userId",
        "name email mobile role"
      )
      .populate(
        "replies.repliedBy",
        "name role"
      );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found.",
      });
    }

    // Non-admin users can only access their own ticket
    if (
      req.user.role !== "admin" &&
      ticket.userId._id.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized.",
      });
    }

    return res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error(
      "GET SUPPORT TICKET ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load support ticket.",
    });
  }
};


// ==========================================
// UPDATE TICKET STATUS
// PATCH /api/support/:id/status
// ADMIN ONLY
// ==========================================

export const updateSupportTicketStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket status.",
      });
    }

    const ticket =
      await Support.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found.",
      });
    }

    return res.json({
      success: true,
      message:
        "Ticket status updated successfully.",
      data: ticket,
    });
  } catch (error) {
    console.error(
      "UPDATE TICKET STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update ticket status.",
    });
  }
};


// ==========================================
// REPLY TO SUPPORT TICKET
// POST /api/support/:id/reply
// ADMIN ONLY
// ==========================================

export const replySupportTicket = async (
  req,
  res
) => {
  try {
    const { reply } = req.body;

    if (!reply?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply is required.",
      });
    }

    const ticket = await Support.findById(
      req.params.id
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found.",
      });
    }

    // Save latest reply
    ticket.reply = reply.trim();

    // Save reply history
    ticket.replies.push({
      message: reply.trim(),
      repliedBy: req.user._id,
      repliedByName:
        req.user.name || "Admin",
      repliedByRole:
        req.user.role || "admin",
    });

    // Automatically move pending ticket
    // to In Progress when admin replies
    if (ticket.status === "Pending") {
      ticket.status = "In Progress";
    }

    await ticket.save();

    return res.json({
      success: true,
      message: "Reply sent successfully.",
      data: ticket,
    });
  } catch (error) {
    console.error(
      "REPLY SUPPORT TICKET ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send reply.",
    });
  }
};