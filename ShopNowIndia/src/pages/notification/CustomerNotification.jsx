import React from "react";
import "./CustomerNotification.css";

const notifications = [
  {
    id: 1,
    title: "Order Confirmed",
    message: "Your medicine order has been confirmed successfully.",
    time: "2 mins ago",
    type: "success",
  },
  {
    id: 2,
    title: "Prescription Uploaded",
    message: "Your prescription has been uploaded successfully.",
    time: "20 mins ago",
    type: "info",
  },
  {
    id: 3,
    title: "Order Shipped",
    message: "Your order is on the way.",
    time: "1 hour ago",
    type: "warning",
  },
  {
    id: 4,
    title: "Special Offer",
    message: "Get 10% OFF on your next medicine order.",
    time: "Today",
    type: "offer",
  },
];

const CustomerNotification = () => {
  return (
    <div className="notification-container">
      <div className="notification-card">

        <h2>🔔 Notifications</h2>
        <p className="subtitle">
          Stay updated with your orders and prescriptions.
        </p>

        {notifications.map((item) => (
          <div key={item.id} className={`notification-item ${item.type}`}>

            <div className="notification-content">
              <h3>{item.title}</h3>
              <p>{item.message}</p>
            </div>

            <span>{item.time}</span>

          </div>
        ))}

      </div>
    </div>
  );
};

export default CustomerNotification;