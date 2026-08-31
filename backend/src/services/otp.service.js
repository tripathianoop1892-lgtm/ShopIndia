const normaliseMobile = (value) => value.replace(/\s|-/g, "").startsWith("+") ? value.replace(/\s|-/g, "") : `+91${value.replace(/\s|-/g, "")}`;

export const sendOtp = async ({ channel, contact, code }) => {
  const message = `Your OmSanjeevani verification code is ${code}. It expires in 10 minutes.`;
  if (channel === "email") {
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) throw new Error("Email OTP is not configured.");
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [contact], subject: "Your OmSanjeevani verification code", text: message }) });
    if (!response.ok) throw new Error("Email OTP could not be sent.");
    return;
  }

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_FROM_NUMBER) throw new Error("SMS OTP is not configured.");
  const body = new URLSearchParams({ To: normaliseMobile(contact), From: process.env.TWILIO_FROM_NUMBER, Body: message });
  const basicAuth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, { method: "POST", headers: { Authorization: `Basic ${basicAuth}`, "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!response.ok) throw new Error("SMS OTP could not be sent.");
};

export { normaliseMobile };
