import React, { useState } from "react";
import "./RegisterForm.css";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const RegisterForm = ({ form, handleChange, requestOtp, sendingOtp }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="register-form">

      <h2>Create Your Account</h2>

      <p className="subtitle">
        Register to join OmSanjeevni
      </p>

      <h3>Basic Information</h3>

      <div className="form-grid">

        <div className="input-box">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaPhoneAlt className="icon" />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaLock className="icon" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        <div className="input-box full">

          <FaLock className="icon" />

          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <span
            className="eye"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁"}
          </span>

        </div>

        <div className="input-box full">
          <select name="verificationChannel" value={form.verificationChannel} onChange={handleChange} aria-label="OTP delivery method">
            <option value="email">Receive OTP by email</option>
            <option value="mobile">Receive OTP by SMS</option>
          </select>
        </div>
        <div className="input-box">
          <input type="text" name="otp" inputMode="numeric" maxLength="6" placeholder="Enter 6-digit OTP" value={form.otp} onChange={handleChange} />
        </div>
        <button type="button" className="register-btn" onClick={requestOtp} disabled={sendingOtp}>{sendingOtp ? "Sending OTP..." : "Send OTP"}</button>

      </div>

    </div>
  );
};

export default RegisterForm;
