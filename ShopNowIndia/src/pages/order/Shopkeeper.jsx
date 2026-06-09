import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { getOrders } from "../../services/api"; // ✅ FIX
import { shortId, statusColor } from "../../utils/helpers";

const ShopkeeperOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 GET ORDERS
  const fetchOrders = async () => {
    try {
      const data = await getOrders(); // ✅ FIX

      // 🔥 OPTIONAL FILTER (only shopkeeper's orders)
      const user = JSON.parse(localStorage.getItem("user"));
      const filtered = data.filter(
        (o) => o.shopkeeperName === user?.name
      );

      setOrders(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bigdiv">
      <div id="h2">
        <h2>Orders</h2>
      </div>
      

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  
                  <td>#{shortId(order._id)}</td>

                  <td>{order.name}</td>

                  <td>{order.quantity}</td>

                  <td>₹{order.price || 0}</td>

                  <td style={{ color: statusColor(order.status) }}>
                    {order.status}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Orders</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopkeeperOrder;