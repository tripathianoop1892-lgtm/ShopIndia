import React, { useEffect, useState } from "react";
import { updateProfile } from "../../services/api";
import "./ShopkeeperProfile.css";

const ShopkeeperProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", mobile: "", email: "", shopName: "", address: "" });
  // =========================
  // LOAD USER DATA
  // =========================

  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = localStorage.getItem("user");

        if (userData) {
          const storedUser = JSON.parse(userData);
          setUser(storedUser);
          setFormData({
            fullName: storedUser.fullName || storedUser.name || "",
            mobile: storedUser.mobile || storedUser.phone || "",
            email: storedUser.email || "",
            shopName: storedUser.shopName || storedUser.shop?.name || "",
            address: storedUser.address || storedUser.shop?.address || "",
          });
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

  const handleEditProfile = () => setEditMode(true);

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.email.trim()) {
      alert("Please complete your name, mobile number, and email address.");
      return;
    }
    setSaving(true);
    try {
      const response = await updateProfile({
        fullName: formData.fullName.trim(), mobile: formData.mobile.trim(), email: formData.email.trim(),
        shopName: formData.shopName.trim(), address: formData.address.trim(),
      });
      if (!response.success) throw new Error(response.message || "Unable to update profile.");
      const updatedUser = { ...(user || {}), ...response.user, fullName: response.user.name, phone: response.user.mobile };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);
      alert("Profile updated successfully.");
    } catch (error) {
      alert(error.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({ fullName: user?.fullName || user?.name || "", mobile: user?.mobile || user?.phone || "", email: user?.email || "", shopName: user?.shopName || user?.shop?.name || "", address: user?.address || user?.shop?.address || "" });
    setEditMode(false);
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

      {editMode && (
        <div className="shopkeeper-edit-overlay" role="dialog" aria-modal="true" aria-labelledby="shopkeeper-edit-title">
          <form className="shopkeeper-edit-modal" onSubmit={handleSaveProfile}>
            <div className="shopkeeper-edit-modal-header">
              <div><p>Edit profile</p><h2 id="shopkeeper-edit-title">Update your details</h2></div>
              <button type="button" className="shopkeeper-edit-close" onClick={handleCancelEdit} aria-label="Close edit profile">×</button>
            </div>
            <div className="shopkeeper-edit-fields">
              <label>Full name<input type="text" value={formData.fullName} onChange={(event) => setFormData({ ...formData, fullName: event.target.value })} required /></label>
              <label>Mobile number<input type="tel" value={formData.mobile} onChange={(event) => setFormData({ ...formData, mobile: event.target.value })} required /></label>
              <label>Email address<input type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} required /></label>
              <label>Shop name<input type="text" value={formData.shopName} onChange={(event) => setFormData({ ...formData, shopName: event.target.value })} /></label>
              <label className="shopkeeper-edit-address">Shop address<textarea rows="4" value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} /></label>
            </div>
            <div className="shopkeeper-edit-actions"><button type="button" onClick={handleCancelEdit} disabled={saving}>Cancel</button><button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button></div>
          </form>
        </div>
      )}

    </div>
  );
};

export default ShopkeeperProfile;
