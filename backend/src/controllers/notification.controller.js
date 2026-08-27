import Notification from "../models/notification.js";

export const getNotifications = async (_req, res) => {
  try {
    const data = await Notification.find().sort({ createdAt: -1 });
    return res.json({ success: true, data });
  } catch {
    return res.status(500).json({ success: false, message: "Unable to load notifications." });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { title, message, receiverRole = "all", status = "Sent" } = req.body;
    if (!title?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: "Title and message are required." });
    }
    const data = await Notification.create({ title: title.trim(), message: message.trim(), receiverRole, status, createdBy: req.user._id });
    return res.status(201).json({ success: true, data });
  } catch {
    return res.status(500).json({ success: false, message: "Unable to send notification." });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Notification not found." });
    return res.json({ success: true, message: "Notification deleted." });
  } catch {
    return res.status(500).json({ success: false, message: "Unable to delete notification." });
  }
};
