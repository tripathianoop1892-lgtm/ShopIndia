import React from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart }) => {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    try {
      // 🔥 Fake payment success
      for (let item of cart) {
        await fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicineId: item._id,
            quantity: item.qty,
            price: item.price * item.qty,
          }),
        });
      }

      // 👉 Success page
      navigate("/payment/success");

    } catch (err) {
      console.log(err);
      navigate("/payment/failed");
    }
  };

  return (
    <div className="checkout-container">
      <h2>💳 Payment</h2>

      <h3>Total: ₹{total}</h3>

      <button className="pay-btn" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;