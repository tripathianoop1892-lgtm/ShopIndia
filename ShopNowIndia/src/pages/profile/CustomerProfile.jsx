import React, { useEffect, useState } from "react";
import "./CustomerProfile.css";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    shopName: "",
    address: "",
  });

  // ==========================================
  // LOAD CUSTOMER DATA
  // ==========================================

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = () => {
    try {
      const userData = localStorage.getItem("user");

      if (userData) {
        const user = JSON.parse(userData);

        setCustomer(user);

        setFormData({
          fullName: user.fullName || user.name || "",
          mobile: user.mobile || user.phone || "",
          email: user.email || "",
          shopName:
            user.shopName ||
            user.shop?.name ||
            "",
          address:
            user.address ||
            user.shop?.address ||
            "",
        });
      }
    } catch (error) {
      console.error(
        "Customer Profile Load Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN EDIT PROFILE
  // ==========================================

  const handleEditProfile = () => {
    setEditMode(true);
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    if (customer) {
      setFormData({
        fullName:
          customer.fullName ||
          customer.name ||
          "",

        mobile:
          customer.mobile ||
          customer.phone ||
          "",

        email:
          customer.email ||
          "",

        shopName:
          customer.shopName ||
          customer.shop?.name ||
          "",

        address:
          customer.address ||
          customer.shop?.address ||
          "",
      });
    }

    setEditMode(false);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!formData.mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    setSaving(true);

    try {
      const oldUserData =
        localStorage.getItem("user");

      const oldUser = oldUserData
        ? JSON.parse(oldUserData)
        : {};

      const updatedUser = {
        ...oldUser,

        fullName:
          formData.fullName.trim(),

        name:
          formData.fullName.trim(),

        mobile:
          formData.mobile.trim(),

        phone:
          formData.mobile.trim(),

        email:
          formData.email.trim(),

        shopName:
          formData.shopName.trim(),

        address:
          formData.address.trim(),
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setCustomer(updatedUser);

      alert(
        "Profile updated successfully."
      );

      setEditMode(false);
    } catch (error) {
      console.error(
        "Profile Update Error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // MENU CLICK
  // ==========================================

  const handleMenuClick = (screen) => {
    if (screen === "CustomerEditProfile") {
      handleEditProfile();
      return;
    }

    console.log(`${screen} clicked`);

    // बाद में यहाँ routing connect करेंगे
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem("user");

    console.log("Logout successful");

    // बाद में यहाँ login page routing connect करेंगे
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="customer-profile-loading">
        <div className="customer-profile-loader" />

        <p>
          Loading profile...
        </p>
      </div>
    );
  }

  // ==========================================
  // CUSTOMER DATA
  // ==========================================

  const fullName =
    customer?.fullName ||
    customer?.name ||
    "Customer Name";

  const mobile =
    customer?.mobile ||
    customer?.phone ||
    "+91 XXXXXXXXXX";

  const email =
    customer?.email ||
    "customer@email.com";

  const shopName =
    customer?.shopName ||
    customer?.shop?.name ||
    "Medical Store";

  const shopId =
    customer?.shopId ||
    "OS100245";

  const address =
    customer?.address ||
    customer?.shop?.address ||
    "Address Not Available";

  // ==========================================
  // MENU ITEMS
  // ==========================================

  const menuItems = [
    {
      id: "1",
      title: "Edit Profile",
      icon: "✏️",
      screen: "CustomerEditProfile",
    },
    {
      id: "2",
      title: "My Orders",
      icon: "📦",
      screen: "Orders",
    },
    {
      id: "3",
      title: "My Prescriptions",
      icon: "📄",
      screen: "CustomerPrescriptions",
    },
    {
      id: "4",
      title: "Notifications",
      icon: "🔔",
      screen: "Notifications",
    },
    {
      id: "5",
      title: "Help & Support",
      icon: "❓",
      screen: "Support",
    },
    {
      id: "6",
      title: "Privacy Policy",
      icon: "🛡️",
      screen: "PrivacyPolicy",
    },
  ];

  // ==========================================
  // EDIT PROFILE SCREEN
  // ==========================================

  if (editMode) {
    return (
      <div className="customer-profile-page">

        {/* HEADER */}

        <div className="customer-profile-header">
          <button
            type="button"
            className="customer-back-button"
            onClick={handleCancel}
          >
            ←
          </button>

          <div>
            <h1>Edit Profile</h1>

            <p>
              Update your profile information
            </p>
          </div>
        </div>

        <div className="customer-profile-container customer-edit-container">

          {/* PERSONAL DETAILS */}

          <div className="customer-edit-card">

            <h2>
              Personal Details
            </h2>

            {/* FULL NAME */}

            <div className="customer-input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />

            </div>

            {/* MOBILE */}

            <div className="customer-input-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength="15"
              />

            </div>

            {/* EMAIL */}

            <div className="customer-input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />

            </div>

          </div>

          {/* SHOP DETAILS */}

          <div className="customer-edit-card">

            <h2>
              Shop Details
            </h2>

            {/* SHOP NAME */}

            <div className="customer-input-group">

              <label>
                Shop Name
              </label>

              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter shop name"
              />

            </div>

            {/* ADDRESS */}

            <div className="customer-input-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows="4"
              />

            </div>

          </div>

          {/* BUTTONS */}

          <div className="customer-edit-actions">

            <button
              type="button"
              className="customer-save-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              className="customer-cancel-button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // PROFILE SCREEN
  // ==========================================

  return (
    <div className="customer-profile-page">

      {/* HEADER */}

      <div className="customer-profile-header">

        <div>
          <h1>
            My Profile
          </h1>

          <p>
            Manage your account and personal information
          </p>
        </div>

      </div>


      <div className="customer-profile-container">

        {/* PROFILE CARD */}

        <div className="customer-profile-card">

          <div className="customer-avatar">
            👤
          </div>

          <h2>
            {fullName}
          </h2>

          <p className="customer-mobile">
            {mobile}
          </p>

          <p className="customer-email">
            {email}
          </p>

        </div>


        {/* SHOP DETAILS */}

        <div className="customer-profile-section">

          <h2>
            Shop Details
          </h2>

          <div className="customer-shop-details">

            <div className="customer-detail-row">

              <span className="customer-detail-label">
                Shop Name
              </span>

              <span className="customer-detail-value">
                {shopName}
              </span>

            </div>


            <div className="customer-detail-row">

              <span className="customer-detail-label">
                Shop ID
              </span>

              <span className="customer-detail-value">
                {shopId}
              </span>

            </div>


            <div className="customer-detail-row">

              <span className="customer-detail-label">
                Address
              </span>

              <span className="customer-detail-value">
                {address}
              </span>

            </div>

          </div>

        </div>


        {/* PROFILE MENU */}

        <div className="customer-profile-section customer-menu-section">

          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="customer-menu-item"
              onClick={() =>
                handleMenuClick(item.screen)
              }
            >

              <div className="customer-menu-left">

                <span className="customer-menu-icon">
                  {item.icon}
                </span>

                <span className="customer-menu-text">
                  {item.title}
                </span>

              </div>

              <span className="customer-menu-arrow">
                ›
              </span>

            </button>
          ))}

        </div>


        {/* LOGOUT */}

        <div className="customer-logout-container">

          <button
            type="button"
            className="customer-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default CustomerProfile;