const SITE_URL = "https://om-sanjeevani.com";
const SUPPORT_EMAIL = "admin@om-sanjeevani.com";

const OTP_EMAIL_COPY = {
  registration: {
    subject: "Verify your OmSanjeevani account",
    preheader: "Use this code to finish creating your OmSanjeevani account.",
    label: "Account verification",
    heading: "Complete your registration",
    introduction: "Use the verification code below to confirm your email address and finish creating your OmSanjeevani account.",
    securityNotice: "If you did not try to create an account, you can safely ignore this email.",
  },
  "password-reset": {
    subject: "Reset your OmSanjeevani password",
    preheader: "Use this code to reset your OmSanjeevani password.",
    label: "Password reset",
    heading: "Reset your password",
    introduction: "Use the verification code below to reset your OmSanjeevani password.",
    securityNotice: "If you did not request a password reset, do not share this code. Your password will remain unchanged.",
  },
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
})[character]);

export const buildOtpEmail = ({ code, purpose }) => {
  const copy = OTP_EMAIL_COPY[purpose];
  if (!copy) throw new Error("Unsupported OTP email purpose.");

  const safeCode = String(code);
  if (!/^\d{6}$/.test(safeCode)) throw new Error("OTP code must contain six digits.");

  const htmlCode = escapeHtml(safeCode);
  const year = new Date().getFullYear();
  const text = `${copy.heading}\n\n${copy.introduction}\n\nYour verification code: ${safeCode}\n\nThis code expires in 10 minutes. Never share it with anyone.\n\n${copy.securityNotice}\n\nOmSanjeevani\n${SITE_URL}\nSupport: ${SUPPORT_EMAIL}`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(copy.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f6f5;color:#17342f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(copy.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f2f6f5;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #dce8e5;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background:#0f766e;color:#ffffff;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="center" valign="middle" style="width:44px;height:44px;border-radius:22px;background:#ffffff;color:#0f766e;font-size:28px;font-weight:700;line-height:44px;">+</td>
                    <td style="padding-left:14px;font-size:22px;font-weight:700;letter-spacing:.2px;">OmSanjeevani</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 18px;">
                <p style="margin:0 0 10px;color:#0f766e;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">${escapeHtml(copy.label)}</p>
                <h1 style="margin:0 0 16px;color:#17342f;font-size:28px;line-height:1.25;">${escapeHtml(copy.heading)}</h1>
                <p style="margin:0;color:#536b66;font-size:16px;line-height:1.65;">${escapeHtml(copy.introduction)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 32px 24px;">
                <div style="padding:22px 16px;border:1px solid #b8d7d1;border-radius:14px;background:#eef8f6;text-align:center;">
                  <p style="margin:0 0 10px;color:#536b66;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Your verification code</p>
                  <p style="margin:0;color:#0f766e;font-size:34px;font-weight:700;letter-spacing:8px;line-height:1.2;">${htmlCode}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 34px;">
                <p style="margin:0 0 16px;color:#536b66;font-size:14px;line-height:1.6;"><strong style="color:#17342f;">This code expires in 10 minutes.</strong> Never share it with anyone, including someone claiming to be from OmSanjeevani.</p>
                <div style="padding:14px 16px;border-left:4px solid #f59e0b;background:#fff8e6;color:#6f5620;font-size:13px;line-height:1.55;">${escapeHtml(copy.securityNotice)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;background:#f8fbfa;border-top:1px solid #e4eeeb;color:#70847f;font-size:12px;line-height:1.6;text-align:center;">
                <p style="margin:0 0 6px;">Need help? Email <a href="mailto:${SUPPORT_EMAIL}" style="color:#0f766e;text-decoration:none;">${SUPPORT_EMAIL}</a></p>
                <p style="margin:0 0 6px;"><a href="${SITE_URL}" style="color:#0f766e;text-decoration:none;">om-sanjeevani.com</a></p>
                <p style="margin:0;">&copy; ${year} OmSanjeevani. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject: copy.subject, text, html };
};

export const buildSupportEnquiryEmail = ({ ticketId, name, email, mobile = "", message }) => {
  const reference = String(ticketId);
  const senderName = String(name).trim();
  const senderEmail = String(email).trim();
  const senderMobile = String(mobile).trim();
  const enquiry = String(message).trim();
  const subject = `Website enquiry #${reference}`;
  const phoneLine = senderMobile ? `Phone: ${senderMobile}\n` : "";
  const text = `A new website enquiry has been received.\n\nTicket: #${reference}\nName: ${senderName}\nEmail: ${senderEmail}\n${phoneLine}\nMessage:\n${enquiry}\n\nOpen Support Center: ${SITE_URL}/admin/support`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f6f5;color:#17342f;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f2f6f5;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #dce8e5;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:26px 32px;background:#0f766e;color:#ffffff;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Website enquiry</p>
                <h1 style="margin:0;font-size:25px;line-height:1.3;">New Contact Us message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 32px;">
                <p style="margin:0 0 22px;color:#536b66;font-size:14px;line-height:1.6;">Ticket reference: <strong style="color:#17342f;">#${escapeHtml(reference)}</strong></p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:9px 12px;background:#f8fbfa;border-bottom:1px solid #e4eeeb;font-weight:700;width:90px;">Name</td><td style="padding:9px 12px;border-bottom:1px solid #e4eeeb;">${escapeHtml(senderName)}</td></tr>
                  <tr><td style="padding:9px 12px;background:#f8fbfa;border-bottom:1px solid #e4eeeb;font-weight:700;">Email</td><td style="padding:9px 12px;border-bottom:1px solid #e4eeeb;"><a href="mailto:${escapeHtml(senderEmail)}" style="color:#0f766e;">${escapeHtml(senderEmail)}</a></td></tr>
                  ${senderMobile ? `<tr><td style="padding:9px 12px;background:#f8fbfa;border-bottom:1px solid #e4eeeb;font-weight:700;">Phone</td><td style="padding:9px 12px;border-bottom:1px solid #e4eeeb;">${escapeHtml(senderMobile)}</td></tr>` : ""}
                </table>
                <h2 style="margin:26px 0 10px;font-size:16px;">Message</h2>
                <div style="padding:16px;border-left:4px solid #0f766e;background:#eef8f6;color:#314c47;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(enquiry)}</div>
                <p style="margin:24px 0 0;color:#536b66;font-size:13px;line-height:1.6;">Reply to this email to respond directly to ${escapeHtml(senderName)}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
};

