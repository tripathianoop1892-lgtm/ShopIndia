import test from "node:test";
import assert from "node:assert/strict";
import { buildOtpEmail, buildSupportEnquiryEmail } from "../src/services/email-template.service.js";

test("builds a branded registration verification email", () => {
  const email = buildOtpEmail({ code: "123456", purpose: "registration" });

  assert.equal(email.subject, "Verify your OmSanjeevani account");
  assert.match(email.text, /Complete your registration/);
  assert.match(email.text, /123456/);
  assert.match(email.html, /Account verification/);
  assert.match(email.html, /123456/);
  assert.match(email.html, /om-sanjeevani\.com/);
  assert.match(email.html, /expires in 10 minutes/i);
});

test("builds a distinct password reset email", () => {
  const email = buildOtpEmail({ code: "654321", purpose: "password-reset" });

  assert.equal(email.subject, "Reset your OmSanjeevani password");
  assert.match(email.text, /Reset your password/);
  assert.match(email.text, /password will remain unchanged/i);
  assert.match(email.html, /Password reset/);
  assert.match(email.html, /do not share this code/i);
});

test("rejects unsupported purposes and malformed OTP codes", () => {
  assert.throws(
    () => buildOtpEmail({ code: "123456", purpose: "payment" }),
    /Unsupported OTP email purpose/,
  );
  assert.throws(
    () => buildOtpEmail({ code: "<script>", purpose: "registration" }),
    /six digits/,
  );
});

test("builds a safe website enquiry email", () => {
  const email = buildSupportEnquiryEmail({
    ticketId: "68ff00abc123",
    name: "Asha <script>alert(1)</script>",
    email: "asha@example.com",
    mobile: "+91 98765 43210",
    message: "Please call me about <b>my order</b>.",
  });

  assert.match(email.subject, /Website enquiry #68ff00abc123/);
  assert.match(email.text, /asha@example\.com/);
  assert.match(email.text, /\+91 98765 43210/);
  assert.match(email.html, /Asha &lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(email.html, /&lt;b&gt;my order&lt;\/b&gt;/);
  assert.doesNotMatch(email.html, /<script>alert\(1\)<\/script>/);
});
