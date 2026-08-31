import nodemailer from "nodemailer";

const normaliseMobile = (value) => value.replace(/\s|-/g, "").startsWith("+") ? value.replace(/\s|-/g, "") : `+91${value.replace(/\s|-/g, "")}`;

export const sendOtp = async ({ channel, contact, code }) => {
  const message = `Your OmSanjeevani verification code is ${code}. It expires in 10 minutes.`;
  if (channel === "email") {
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) throw new Error("SMTP email OTP is not configured.");
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT), secure: process.env.SMTP_SECURE === "true", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    await transporter.sendMail({ from: process.env.SMTP_FROM, to: contact, subject: "Your OmSanjeevani verification code", text: message });
    return;
  }

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_FROM_NUMBER) throw new Error("SMS OTP is not configured.");
  const body = new URLSearchParams({ To: normaliseMobile(contact), From: process.env.TWILIO_FROM_NUMBER, Body: message });
  const basicAuth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, { method: "POST", headers: { Authorization: `Basic ${basicAuth}`, "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!response.ok) throw new Error("SMS OTP could not be sent.");
};

export { normaliseMobile };
