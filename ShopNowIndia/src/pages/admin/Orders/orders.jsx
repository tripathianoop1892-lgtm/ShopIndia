import { useEffect } from "react";
import { getAdminOrders,  } from "../../../services/api.js";
import "./Orders.css";
import { useState } from "react";



const Orders = () => {
        const [orders, setOrders] =useState([]);
      
        useEffect(() => {
          const fetchOrders = async ()=>{
          try{
            const response = await getAdminOrders();
            setOrders(response)
            console.log(response)
          }catch(err){
            console.error("Error featching orders", err)
          }
          }
           fetchOrders();
      }, [])
  return (
    <div className="orders-page">

      <div className="orders-header">
        <h2>Orders Management</h2>

        <button className="export-btn">
          Export Orders
        </button>
      </div>

      <div className="search-filter">

        <input
          type="text"
          placeholder="Search Order..."
        />

        <select>
          <option>All Status</option>
          <option>Pending</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

      </div>

      <div className="orders-table">

        <table>

          <thead>

            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Shopkeeper</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order._id}</td>
                <td>{order.customerName}</td>
                <td>{order.shopkeeperName}</td>
                <td>{order.totalAmount}</td>

                <td>

                  <span
                    className={
                      order.status === "Delivered"
                        ? "delivered"
                        : order.status === "Pending"
                        ? "pending"
                        : "cancelled"
                    }
                  >
                    {order.status}
                  </span>

                </td>

                <td>{order.date}</td>

                <td>

                  <button className="view-btn">
                    View
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Orders;