import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-box">
        <h2>✅ Payment Successful</h2>
        <p>Your order has been placed successfully.</p>

        <button onClick={() => navigate("/customer/orders")}>
          View Orders
        </button>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Success;