import React, { useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../services/api";

const Checkout = ({ cart = [] }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || item.quantity || 1),
    0
  );

  const handlePayment = async () => {
    if (!cart.length) return navigate("/payment/failed");

    try {
      setSubmitting(true);
      // Orders are persisted through the authenticated order API.
      for (let item of cart) {
        const quantity = item.qty || item.quantity || 1;
        const response = await placeOrder({
          sellerId: item.sellerId || item.ownerId,
          subtotal: Number(item.price || 0) * Number(quantity),
          deliveryCharge: 0,
          platformFee: 0,
          items: [{
            medicineId: item.medicineId || item._id,
            name: item.name,
            quantity,
            price: item.price || 0,
          }],
        });
        if (!response.success) throw new Error(response.message || "Order could not be placed");
      }

      navigate("/payment/success");

    } catch (err) {
      console.log(err);
      navigate("/payment/failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>💳 Payment</h2>

      <h3>Total: ₹{total}</h3>

      <button className="pay-btn" onClick={handlePayment} disabled={submitting || !cart.length}>
        {submitting ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
