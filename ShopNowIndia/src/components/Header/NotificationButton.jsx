import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { asList, getAdminNotifications, getMyNotifications } from "../../services/api";
import "./NotificationButton.css";

const NotificationButton = ({ to, admin = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    let active = true;

    const loadCount = async () => {
      try {
        const response = admin
          ? await getAdminNotifications()
          : await getMyNotifications();
        if (active) setNotificationCount(asList(response).length);
      } catch {
        if (active) setNotificationCount(0);
      }
    };

    loadCount();
    window.addEventListener("focus", loadCount);
    return () => {
      active = false;
      window.removeEventListener("focus", loadCount);
    };
  }, [admin, location.pathname]);

  const countLabel = notificationCount > 99 ? "99+" : notificationCount;

  return (
    <button
      type="button"
      className={`portal-notification-button ${location.pathname === to ? "is-active" : ""}`}
      onClick={() => navigate(to)}
      aria-label={`Notifications${notificationCount ? ` (${notificationCount})` : ""}`}
      title="Notifications"
    >
      <FaBell aria-hidden="true" />
      {notificationCount > 0 && (
        <span className="portal-notification-badge" aria-hidden="true">
          {countLabel}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
