import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopkeeperProfile.css";

const ShopkeeperProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // =========================
  // LOAD USER DATA
  // =========================

  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = localStorage.getItem("user");

        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Profile Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="shopkeeper-profile-loading">
        <div className="profile-loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  // =========================
  // USER DATA
  // =========================

  const userName = user?.name || "Shopkeeper";
  const email = user?.email || "Not available";
  const phone = user?.phone || "Not available";

  const shopName =
    user?.shopName ||
    user?.shop?.name ||
    "Shop Name";

  const shopId =
    user?.shopId ||
    "Not available";

  const address =
    user?.address ||
    user?.shop?.address ||
    "Address not available";

  // =========================
  // EDIT PROFILE
  // =========================

const handleEditProfile = () => {
  navigate("/shopkeeper/edit-profile");
};

  return (
    <div className="shopkeeper-profile-page">

      {/* =========================
          PROFILE HEADER
      ========================== */}

      <div className="shopkeeper-profile-header">

        <div className="profile-header-left">
          <h1>Profile</h1>
          <p>Manage your personal and shop information</p>
        </div>

       

      </div>


      {/* =========================
          PROFILE CONTENT
      ========================== */}

      <div className="shopkeeper-profile-container">

        {/* =========================
            PROFILE CARD
        ========================== */}

        <div className="shopkeeper-profile-card">

          <div className="profile-avatar">
            <span>👤</span>
          </div>

          <div className="profile-main-info">

            <h2>{userName}</h2>

            <span className="profile-role">
              SHOPKEEPER
            </span>

            <p>{email}</p>

          </div>

        </div>


        {/* =========================
            PERSONAL INFORMATION
        ========================== */}

        <div className="profile-information-card">

          <div className="section-header">
            <h2>Personal Information</h2>
          </div>


          <div className="profile-info-grid">

            {/* FULL NAME */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                👤
              </div>

              <div>
                <span className="profile-info-label">
                  Full Name
                </span>

                <p className="profile-info-value">
                  {userName}
                </p>
              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                ✉️
              </div>

              <div>
                <span className="profile-info-label">
                  Email
                </span>

                <p className="profile-info-value">
                  {email}
                </p>
              </div>

            </div>


            {/* PHONE */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                📞
              </div>

              <div>
                <span className="profile-info-label">
                  Phone Number
                </span>

                <p className="profile-info-value">
                  {phone}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            SHOP INFORMATION
        ========================== */}

        <div className="profile-information-card">

          <div className="section-header">
            <h2>Shop Information</h2>
          </div>


          <div className="profile-info-grid">

            {/* SHOP NAME */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                🏪
              </div>

              <div>
                <span className="profile-info-label">
                  Shop Name
                </span>

                <p className="profile-info-value">
                  {shopName}
                </p>
              </div>

            </div>


            {/* SHOP ID */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                🏢
              </div>

              <div>
                <span className="profile-info-label">
                  Shop ID
                </span>

                <p className="profile-info-value">
                  {shopId}
                </p>
              </div>

            </div>


            {/* ADDRESS */}

            <div className="profile-info-item profile-address-item">

              <div className="profile-info-icon">
                📍
              </div>

              <div>
                <span className="profile-info-label">
                  Shop Address
                </span>

                <p className="profile-info-value">
                  {address}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            EDIT BUTTON
        ========================== */}

        <div className="profile-bottom-action">

          <button
            className="main-edit-profile-button"
            onClick={handleEditProfile}
          >
            ✏️ Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
};

export default ShopkeeperProfile;