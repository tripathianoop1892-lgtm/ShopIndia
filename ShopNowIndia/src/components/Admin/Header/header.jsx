import "./header.css";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NotificationButton from "../../Header/NotificationButton";
import useAuth from "../../../hooks/useAuth";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="admin-header">

      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <h2>Admin Panel</h2>
      </div>

      <div className="header-right">

        <NotificationButton to="/admin/notifications" admin />

        <button type="button" className="admin-profile-button" onClick={() => navigate("/admin/profile")} aria-label="Open profile" title="Profile">
          <FaUserCircle />
          <span>Admin</span>
        </button>

        <button type="button" className="portal-header-action portal-logout-button" onClick={handleLogout} aria-label="Log out" title="Log out">
          <FaSignOutAlt aria-hidden="true" />
        </button>

      </div>

    </header>
  );
};

export default Header;
