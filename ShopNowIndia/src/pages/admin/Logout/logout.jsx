import "./Logout.css";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logout Successfully");

    window.location.href = "/login";
  };

  return (
    <div className="logout-page">

      <div className="logout-card">

        <FaSignOutAlt className="logout-icon" />

        <h2>Logout</h2>

        <p>
          Are you sure you want to logout from your account?
        </p>

        <div className="logout-buttons">

          <button
            className="cancel-btn"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Logout;