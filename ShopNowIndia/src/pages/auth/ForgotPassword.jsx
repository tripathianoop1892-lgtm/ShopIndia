import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 🔥 NEW STATE
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirmPassword) {
      alert("All fields required ❌");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            newPassword: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Password Updated Successfully ✅");

      window.location.href = "/login";

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <div id="new">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>

        <div id="form1">
          <h2>Email</h2>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        {/* 🔥 PASSWORD */}
        <div id="form1" style={{ position: "relative" }}>
          <h2>New Password</h2>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "35px",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* 🔥 CONFIRM PASSWORD */}
        <div id="form1" style={{ position: "relative" }}>
          <h2>Confirm Password</h2>

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />

          <span
            onClick={() => setShowConfirm(!showConfirm)}
            style={{
              position: "absolute",
              right: "10px",
              top: "35px",
              cursor: "pointer",
            }}
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        <div id="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;