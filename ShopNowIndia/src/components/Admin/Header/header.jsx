import "./header.css";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

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

        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>

        <div className="profile">
          <FaUserCircle />
          <span>Admin</span>
        </div>

      </div>

    </header>
  );
};

export default Header;