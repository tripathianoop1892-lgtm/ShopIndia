import React, { useEffect, useState } from "react";
import "./CustomerNotification.css";
import { getMyNotifications } from "../../services/api";
import useAuth from "../../hooks/useAuth";

const CustomerNotification = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyNotifications()
      .then((response) => {
        if (!response.success) throw new Error(response.message || "Unable to load notifications.");
        setNotifications(response.data || []);
      })
      .catch((requestError) => setError(requestError.message || "Unable to load notifications."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="notification-container">
      <div className="notification-card">
        <h2>Notifications</h2>
        <p className="subtitle">Updates sent to your {user?.role || "account"} portal.</p>
        {loading && <p className="notification-empty">Loading notifications...</p>}
        {error && <p className="notification-empty">{error}</p>}
        {!loading && !error && !notifications.length && <p className="notification-empty">No notifications yet.</p>}
        {notifications.map((item) => (
          <div key={item._id} className="notification-item info">
            <div className="notification-content"><h3>{item.title}</h3><p>{item.message}</p></div>
            <span>{new Date(item.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerNotification;
