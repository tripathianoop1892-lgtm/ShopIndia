import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../services/api";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    shopId: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("All fields required ❌");
      return;
    }

    try {

      // 🔥 FINAL FIX
      const payload = {
        email: form.email,
        password: form.password,
      };

      // 🔥 ONLY CUSTOMER
      if (form.shopId.trim()) {
        payload.shopId = form.shopId;
      }

      const res = await loginUser(payload);

      if (!res.success) {
        alert(res.message || "Invalid credentials ❌");
        return;
      }

      localStorage.setItem("token", res.token);

      // 🔥 FIXED
      login(res.user, res.token);

      alert("Login Successful ✅");

      switch (res.user.role) {
        case "customer":
          navigate("/customer");
          break;

        case "shopkeeper":
          navigate("/shopkeeper");
          break;

        case "distributor":
          navigate("/distributor");
          break;

        case "admin":
          navigate("/admin");
          break;

        default:
          navigate("/");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <input
        type="text"
        placeholder="Enter Shop ID (Only for Customer)"
        value={form.shopId}
        onChange={(e) =>
          setForm({ ...form, shopId: e.target.value })
        }
      />

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      <p onClick={() => navigate("/forgot")}>
        Forgot Password?
      </p>

      <p onClick={() => navigate("/register")}>
        Create Account
      </p>
    </div>
  );
};

export default Login;