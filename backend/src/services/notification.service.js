import Notification from "../models/notification.js";

export const notifyUser = async ({ recipientId, title, message }) => {
  try {
    if (!recipientId || !title || !message) return;
    await Notification.create({
      recipientId,
      receiverRole: "individual",
      title,
      message,
      status: "Sent",
    });
  } catch (error) {
    // Notification delivery must not prevent the primary order or prescription action.
    console.error("Notification delivery error:", error);
  }
};
