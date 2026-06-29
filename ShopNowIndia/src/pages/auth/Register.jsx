import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  // 🔥 NEW STATE
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields required ❌");
      return;
    }

    try {
      const res = await registerUser(form);

      if (!res.success) {
        alert(res.message || "User already exists ❌");
        return;
      }

      if (form.role === "shopkeeper") {
        alert(`Registered ✅\nYour Shop ID: ${res.shopId}`);
      } else {
        alert("Registered Successfully ✅");
      }

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* 🔥 PASSWORD WITH TOGGLE */}
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
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

      <select
        value={form.role}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="customer">Customer</option>
        <option value="shopkeeper">Shopkeeper</option>
        <option value="distributor">Distributor</option>
        <option value="admin">Admin</option>
      </select>

      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;