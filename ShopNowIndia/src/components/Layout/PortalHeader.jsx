import { FaBars } from "react-icons/fa";
import NotificationButton from "../Header/NotificationButton";
import "./PortalHeader.css";

const PortalHeader = ({ portalName, notificationPath, onMenuClick, menuOpen }) => (
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

    <NotificationButton to={notificationPath} />
  </header>
);

export default PortalHeader;
