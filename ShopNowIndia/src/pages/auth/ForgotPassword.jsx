import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset, resetPassword } from "../../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendCode = async () => {
    if (!email.trim()) return setMessage("Enter your email address first.");
    setLoading(true);
    try {
      const response = await requestPasswordReset(email);
      setMessage(response.message || "Unable to send a reset code.");
      if (response.success) setCodeSent(true);
    } catch {
      setMessage("Unable to contact the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!otp || !password || !confirmPassword) return setMessage("Enter the reset code and your new password.");
    if (password !== confirmPassword) return setMessage("Passwords do not match.");
    setLoading(true);
    try {
      const response = await resetPassword({ email, otp, newPassword: password });
      setMessage(response.message || "Unable to reset password.");
      if (response.success) setTimeout(() => navigate("/login"), 900);
    } catch {
      setMessage("Unable to contact the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="new">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p>We will send a six-digit reset code to your registered email.</p>
        <div id="form1">
          <h2>Email</h2>
          <input type="email" placeholder="Enter email" value={email} disabled={codeSent || loading} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        </div>
        {!codeSent ? <div id="submit"><button type="button" disabled={loading} onClick={sendCode}>{loading ? "Sending..." : "Send reset code"}</button></div> : <>
          <div id="form1"><h2>Reset code</h2><input type="text" inputMode="numeric" maxLength="6" placeholder="Enter 6-digit code" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} required /></div>
          <div id="form1"><h2>New Password</h2><input type="password" placeholder="Minimum 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required /></div>
          <div id="form1"><h2>Confirm Password</h2><input type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required /></div>
          <div id="submit"><button type="submit" disabled={loading}>{loading ? "Updating..." : "Reset password"}</button></div>
        </>}
        {message && <p role="status">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
