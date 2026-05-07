import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { getOrders, updateOrder } from "../../services/api"; // ✅ FIX
import { shortId, statusColor } from "../../utils/helpers";

const Distributor = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 GET ORDERS
  const fetchOrders = async () => {
    try {
      const data = await getOrders(); // ✅ FIX
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await updateOrder(id, status); // ✅ FIX
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="order-container">
      <h2>Shopkeeper Orders</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Shopkeeper Name</th>
            <th>Medicine</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item._id}>
                
                <td>{shortId(item._id)}</td>

                <td>{item.shopkeeperName || "N/A"}</td>

                <td>{item.name}</td>

                <td>{item.quantity}</td>

                <td style={{ color: statusColor(item.status) }}>
                  {item.status}
                </td>

                <td>
                  {item.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(item._id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(item._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Orders</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Distributor;