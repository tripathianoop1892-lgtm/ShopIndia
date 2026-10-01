import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NotificationButton from "../Header/NotificationButton";
import useAuth from "../../hooks/UseAuth";
import "./PortalHeader.css";

const PortalHeader = ({ portalName, notificationPath, profilePath, onMenuClick, menuOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="portal-topbar">
      <div className="portal-topbar-leading">
        <button
          type="button"
          className="portal-topbar-menu"
          onClick={onMenuClick}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <FaBars aria-hidden="true" />
        </button>
        <img src="/omsanjeevani.png" alt="Om Sanjeevani" className="portal-topbar-logo" />
        <div className="portal-topbar-title">
          <strong>{portalName}</strong>
          <span>Om Sanjeevani</span>
        </div>
      </div>

      <div className="portal-topbar-actions">
        <NotificationButton to={notificationPath} />
        <button
          type="button"
          className="portal-header-action portal-profile-button"
          onClick={() => navigate(profilePath)}
          aria-label="Open profile"
          title="Profile"
        >
          <FaUserCircle aria-hidden="true" />
        </button>
        <button
          type="button"
          className="portal-header-action portal-logout-button"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <FaSignOutAlt aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default PortalHeader;
