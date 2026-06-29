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
    const payload = {
      email: form.email,
      password: form.password,
    };

    if (form.shopId.trim()) {
      payload.shopId = form.shopId;
    }

    const res = await loginUser(payload);

    if (!res.success) {
      alert(res.message || "Invalid credentials ❌");
      return;
    }

    // Pass session payloads immediately to your unified auth slice controller
    login(res.user, res.token);

    alert("Login Successful ✅");

    // Execute absolute immediate routing navigation switches based on string role matching
    const role = res.user?.role?.toLowerCase();
    if (role === "customer") {
      navigate("/customer");
    } else if (role === "shopkeeper") {
      navigate("/shopkeeper");
    } else if (role === "distributor") {
      navigate("/distributor");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error(error);
    alert("Server connection error ❌");
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