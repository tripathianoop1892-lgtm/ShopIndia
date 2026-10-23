import nodemailer from "nodemailer";
import { buildSupportEnquiryEmail } from "./email-template.service.js";

export const sendSupportEnquiry = async ({ ticketId, name, email, mobile, message }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
    throw new Error("SMTP email is not configured.");
  }

  const recipient = process.env.SUPPORT_EMAIL || process.env.SMTP_USER;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const enquiryEmail = buildSupportEnquiryEmail({ ticketId, name, email, mobile, message });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: recipient,
    replyTo: email,
    ...enquiryEmail,
  });
};
