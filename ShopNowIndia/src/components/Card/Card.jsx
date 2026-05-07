import React, { useState, useEffect } from "react";
import "./Card.css";
import { getCart } from "../../services/api";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // 🔥 Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  // 🔼 Increase qty
  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    setCart(updated);
  };

  // 🔽 Decrease qty
  const decreaseQty = (index) => {
    const updated = [...cart];
    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
      setCart(updated);
    }
  };

  // ❌ Remove item
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  // 💰 Total
  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <div className="main-content">
      <h2>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty 🛒</p>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={item._id || index}>
              
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.company || "No company"}</p>
                <p>₹{item.price || 0}</p>
              </div>

              <div className="cart-controls">
                <button onClick={() => decreaseQty(index)}>-</button>
                <span>{item.qty || item.quantity || 1}</span>
                <button onClick={() => increaseQty(index)}>+</button>
              </div>

              <div className="cart-price">
                ₹{(item.price || 0) * (item.qty || item.quantity || 1)}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                ❌
              </button>

            </div>
          ))}

          <div className="cart-footer">
            <h3>Total: ₹{total}</h3>

            <button
              className="checkout"
              disabled={cart.length === 0}
              onClick={() => alert("Order placed (Next step: Orders API)")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;