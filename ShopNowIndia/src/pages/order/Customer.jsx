import React, { useEffect, useState } from "react";
import "./Customer.css";
import { getOrders } from "../../services/api";
import { shortId } from "../../utils/helpers";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-content">
      <h2>📦 My Orders</h2>

      <div className="order-container">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="order-card" key={order._id}>

              <h3>Order #{shortId(order._id)}</h3>

              {/* 🔥 ITEMS LIST */}
              {order.items?.map((item, i) => (
                <div key={i} className="order-item">
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}

              <hr />

              <p><b>Total:</b> ₹{order.total}</p>

              {/* 🔥 STATUS */}
              <span className={`status ${order.status?.toLowerCase()}`}>
                {order.status}
              </span>

            </div>
          ))
        ) : (
          <p className="no-orders">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;