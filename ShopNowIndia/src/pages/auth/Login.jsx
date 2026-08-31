import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import "./Login.css";
import { loginUser } from "../../services/api";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) return alert("Email and password are required.");
    setLoading(true);
    try {
      const res = await loginUser(form);
      if (!res.success) return alert(res.message || "Invalid credentials.");
      login(res.user, res.token);
      const destinations = { customer: "/customer", shopkeeper: "/shopkeeper", distributor: "/distributor", admin: "/admin" };
      navigate(destinations[res.user?.role?.toLowerCase()] || "/");
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand-content">
          <img src="/omsanjeevani.png" alt="Om Sanjeevani" className="login-brand-logo" />
          <p className="login-eyebrow">Welcome back</p>
          <h1>Your pharmacy network,<br /><span>always connected.</span></h1>
          <p className="login-brand-description">Sign in to manage medicines, orders, payments, and care from one trusted platform.</p>
          <img src="/medicine.png" alt="Medicines and healthcare" className="login-hero-image" />
          <div className="login-features"><span>Verified medicines</span><span>Secure accounts</span><span>Connected delivery</span></div>
        </div>
      </section>

      <section className="login-form-panel">
        <form className="login-card" onSubmit={handleLogin}>
          <p className="login-card-eyebrow">Account access</p>
          <h2>Sign in to OmSanjeevani</h2>
          <p className="login-card-subtitle">Enter your details to continue to your portal.</p>

          <label className="login-field"><span>Email address</span><div><FaEnvelope /><input type="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div></label>
          <label className="login-field"><span>Password</span><div><FaLock /><input type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button></div></label>

          <button className="login-btn" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
          <button type="button" className="login-forgot-link" onClick={() => navigate("/forgot")}>Forgot password?</button>
          <p className="login-register-text">New to OmSanjeevani? <button type="button" onClick={() => navigate("/register")}>Create an account</button></p>
        </form>
      </section>
    </main>
  );
};

export default Login;
