import test from "node:test";
import assert from "node:assert/strict";
import { buildOtpEmail } from "../src/services/email-template.service.js";

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
