import crypto from "crypto";
import PaymentIntent from "../models/paymentIntent.js";

const configured = () => process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

export const createRazorpayOrder = async (req, res) => {
  try {
    if (!configured()) return res.status(503).json({ success: false, message: "Razorpay is not configured on the server." });
    const amount = Math.round(Number(req.body.amount || 0) * 100);
    if (!Number.isInteger(amount) || amount < 100) return res.status(400).json({ success: false, message: "A valid payment amount is required." });
    const receipt = `oms_${req.user._id.toString().slice(-8)}_${Date.now()}`;
    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" }, body: JSON.stringify({ amount, currency: "INR", receipt }) });
    const order = await response.json();
    if (!response.ok) return res.status(502).json({ success: false, message: order.error?.description || "Razorpay order could not be created." });
    const intent = await PaymentIntent.create({ userId: req.user._id, razorpayOrderId: order.id, amount, currency: order.currency });
    return res.status(201).json({ success: true, data: { intentId: intent._id, orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID } });
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to start payment." });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { intentId, razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, razorpay_signature: signature } = req.body;
    const intent = await PaymentIntent.findOne({ _id: intentId, userId: req.user._id, razorpayOrderId });
    if (!intent || intent.status !== "created") return res.status(400).json({ success: false, message: "Invalid or already-used payment request." });
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${intent.razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
    if (!signature || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return res.status(400).json({ success: false, message: "Payment signature verification failed." });
    intent.status = "paid";
    intent.razorpayPaymentId = razorpayPaymentId;
    await intent.save();
    return res.json({ success: true, data: { paymentReference: intent._id, paymentId: razorpayPaymentId } });
  } catch (error) {
    console.error("RAZORPAY VERIFY ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to verify payment." });
  }
};

export const refundPayment = async (paymentReference) => {
  if (!configured()) {
    throw new Error("Razorpay is not configured on the server.");
  }

  if (!paymentReference) {
    throw new Error("Payment reference is required.");
  }

  let intent = null;

if (paymentReference) {
  intent = await PaymentIntent.findOne({
    razorpayPaymentId: paymentReference,
  });

  if (!intent) {
    try {
      intent = await PaymentIntent.findById(paymentReference);
    } catch {
      intent = null;
    }
  }
}

if (!intent) {
  throw new Error("Payment record not found.");
}

  if (intent.status !== "paid" && intent.status !== "consumed") {
    throw new Error("This payment is not eligible for refund.");
  }

  if (!intent.razorpayPaymentId) {
    throw new Error("Razorpay payment ID is missing.");
  }

  if (intent.refundStatus === "processed") {
    return {
      alreadyRefunded: true,
      refundId: intent.refundId,
      refundedAt: intent.refundedAt,
    };
  }

  intent.refundStatus = "pending";
  await intent.save();

  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");

  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${intent.razorpayPaymentId}/refund`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: intent.amount,
        speed: "normal",
      }),
    }
  );

  const refund = await response.json();

  if (!response.ok) {
    intent.refundStatus = "failed";
    await intent.save();

    throw new Error(
      refund.error?.description ||
        "Razorpay refund could not be processed."
    );
  }

  intent.refundStatus = "processed";
  intent.refundId = refund.id || "";
  intent.refundedAt = new Date();

  await intent.save();

  return {
    alreadyRefunded: false,
    refundId: intent.refundId,
    refundStatus: intent.refundStatus,
    refundedAt: intent.refundedAt,
  };
};


export const refundRazorpayPayment = async (req, res) => {
  try {
    const { paymentReference } = req.body;

    const result = await refundPayment(paymentReference);

    return res.json({
      success: true,
      message: result.alreadyRefunded
        ? "Payment was already refunded."
        : "Payment refunded successfully.",
      data: result,
    });
  } catch (error) {
    console.error("RAZORPAY REFUND ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to process refund.",
    });
  }
};