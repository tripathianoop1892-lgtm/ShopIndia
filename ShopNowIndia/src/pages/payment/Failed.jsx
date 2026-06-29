import React from "react";
import { useNavigate } from "react-router-dom";
import "./Failed.css";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <div className="failed-container">
      <div className="failed-box">
        <h2>❌ Payment Failed</h2>
        <p>Something went wrong. Please try again.</p>

        <button onClick={() => navigate("/payment/checkout")}>
          Try Again
        </button>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Failed;