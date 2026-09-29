import "./header.css";
import { FaBars, FaUserCircle } from "react-icons/fa";
import NotificationButton from "../../Header/NotificationButton";

const Header = ({ toggleSidebar }) => {
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

        <div className="profile">
          <FaUserCircle />
          <span>Admin</span>
        </div>

      </div>

    </header>
  );
};

export default Header;
