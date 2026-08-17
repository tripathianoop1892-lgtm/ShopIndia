import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../services/api";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
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

      const res = await loginUser(payload);

      if (!res.success) {
        alert(res.message || "Invalid credentials ❌");
        return;
      }

      // Save user + token
      login(res.user, res.token);

      alert("Login Successful ✅");

      // Role based navigation
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

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      {/* PASSWORD */}
      <div className="password-wrapper">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          type="button"
          className="password-eye"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>

      </div>

      {/* LOGIN BUTTON */}
      <button
        className="login-btn"
        onClick={handleLogin}
      >
        Login
      </button>

      {/* FORGOT PASSWORD */}
      <p onClick={() => navigate("/forgot")}>
        Forgot Password?
      </p>

      {/* CREATE ACCOUNT */}
      <p onClick={() => navigate("/register")}>
        Create Account
      </p>

    </div>
  );
};

export default Login;