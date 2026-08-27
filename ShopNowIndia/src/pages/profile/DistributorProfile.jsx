import React, { useEffect, useState } from "react";
import "./DistributorProfile.css";

const DistributorProfile = () => {
  const [distributor, setDistributor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    warehouseAddress: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    try {
      const storedUser =
        localStorage.getItem("user") ||
        localStorage.getItem("userData");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        setDistributor(user);

        setForm({
          name: user?.name || "",
          email: user?.email || "",
          mobile: user?.mobile || user?.phone || "",
          companyName: user?.companyName || "",
          warehouseAddress: user?.warehouseAddress || "",
          address: user?.address || "",
          city: user?.city || "",
          district: user?.district || "",
          state: user?.state || "",
          pincode: user?.pincode || "",
        });
      }
    } catch (error) {
      console.error("Distributor Profile Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
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
    if (distributor) {
      setForm({
        name: distributor?.name || "",
        email: distributor?.email || "",
        mobile:
          distributor?.mobile ||
          distributor?.phone ||
          "",
        companyName:
          distributor?.companyName || "",
        warehouseAddress:
          distributor?.warehouseAddress || "",
        address:
          distributor?.address || "",
        city:
          distributor?.city || "",
        district:
          distributor?.district || "",
        state:
          distributor?.state || "",
        pincode:
          distributor?.pincode || "",
      });
    }

    setEditMode(false);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!form.mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (!form.companyName.trim()) {
      alert("Please enter your company name.");
      return;
    }

    setSaving(true);

    try {
      const existingUser =
        localStorage.getItem("user") ||
        localStorage.getItem("userData");

      const parsedUser = existingUser
        ? JSON.parse(existingUser)
        : {};

      const updatedUser = {
        ...parsedUser,

        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        phone: form.mobile.trim(),
        companyName: form.companyName.trim(),
        warehouseAddress:
          form.warehouseAddress.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        district: form.district.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      localStorage.setItem(
        "userData",
        JSON.stringify(updatedUser)
      );

      setDistributor(updatedUser);

      alert("Profile updated successfully.");

      setEditMode(false);
    } catch (error) {
      console.error(
        "Distributor Profile Save Error:",
        error
      );

      alert(
        "Unable to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
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
    localStorage.removeItem("userData");

    console.log("Distributor logout successful");

    // बाद में यहाँ login page routing connect करेंगे
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="distributor-profile-loading">
        <div className="distributor-profile-loader" />

        <p>Loading profile...</p>
      </div>
    );
  }

  // ==========================================
  // PROFILE DATA
  // ==========================================

  const name =
    distributor?.name ||
    "Distributor Name";

  const email =
    distributor?.email ||
    "Email not available";

  const mobile =
    distributor?.mobile ||
    distributor?.phone ||
    "Mobile not available";

  const companyName =
    distributor?.companyName ||
    "Company Name";

  const warehouseAddress =
    distributor?.warehouseAddress ||
    "Warehouse address not available";

  const address =
    distributor?.address ||
    "Address not available";

  const city =
    distributor?.city ||
    "Not available";

  const district =
    distributor?.district ||
    "Not available";

  const state =
    distributor?.state ||
    "Not available";

  const pincode =
    distributor?.pincode ||
    "Not available";

  // ==========================================
  // EDIT PROFILE SCREEN
  // ==========================================

  if (editMode) {
    return (
      <div className="distributor-profile-page">

        {/* HEADER */}

        <div className="distributor-profile-header">
          <button
            type="button"
            className="distributor-back-button"
            onClick={handleCancel}
          >
            ←
          </button>

          <div>
            <h1>Edit Profile</h1>

            <p>
              Update your business and contact details
            </p>
          </div>
        </div>


        <div className="distributor-profile-container distributor-edit-container">

          {/* PROFILE HEADER */}

          <div className="distributor-edit-profile-header">

            <div className="distributor-edit-avatar">
              👤
            </div>

            <h2>Distributor Profile</h2>

            <p>
              Update your business and contact details
            </p>

          </div>


          {/* PERSONAL INFORMATION */}

          <div className="distributor-edit-card">

            <h2>
              Personal Information
            </h2>

            {/* FULL NAME */}

            <div className="distributor-input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />

            </div>


            {/* EMAIL */}

            <div className="distributor-input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                readOnly
                className="distributor-readonly-input"
              />

            </div>


            {/* MOBILE */}

            <div className="distributor-input-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength="10"
              />

            </div>

          </div>


          {/* BUSINESS INFORMATION */}

          <div className="distributor-edit-card">

            <h2>
              Business Information
            </h2>

            {/* COMPANY NAME */}

            <div className="distributor-input-group">

              <label>
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />

            </div>


            {/* WAREHOUSE ADDRESS */}

            <div className="distributor-input-group">

              <label>
                Warehouse Address
              </label>

              <textarea
                name="warehouseAddress"
                value={form.warehouseAddress}
                onChange={handleChange}
                placeholder="Enter warehouse address"
                rows="4"
              />

            </div>

          </div>


          {/* ADDRESS INFORMATION */}

          <div className="distributor-edit-card">

            <h2>
              Address Information
            </h2>

            {/* ADDRESS */}

            <div className="distributor-input-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows="4"
              />

            </div>


            {/* CITY */}

            <div className="distributor-input-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
              />

            </div>


            {/* DISTRICT */}

            <div className="distributor-input-group">

              <label>
                District
              </label>

              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Enter district"
              />

            </div>


            {/* STATE */}

            <div className="distributor-input-group">

              <label>
                State
              </label>

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Enter state"
              />

            </div>


            {/* PINCODE */}

            <div className="distributor-input-group">

              <label>
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                maxLength="6"
              />

            </div>

          </div>


          {/* ACTION BUTTONS */}

          <div className="distributor-edit-actions">

            <button
              type="button"
              className="distributor-save-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              className="distributor-cancel-button"
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
    <div className="distributor-profile-page">

      {/* HEADER */}

      <div className="distributor-profile-header">

        <div>
          <h1>
            My Profile
          </h1>

          <p>
            Manage your distributor account
          </p>
        </div>


        <button
          type="button"
          className="distributor-header-edit-button"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>

      </div>


      <div className="distributor-profile-container">

        {/* PROFILE CARD */}

        <div className="distributor-profile-card">

          <div className="distributor-avatar">
            👤
          </div>

          <div className="distributor-main-info">

            <h2>
              {name}
            </h2>

            <span className="distributor-role">
              DISTRIBUTOR
            </span>

            <p>
              {email}
            </p>

            <p>
              {mobile}
            </p>

          </div>

        </div>


        {/* PERSONAL INFORMATION */}

        <div className="distributor-information-card">

          <div className="distributor-section-header">
            <h2>
              Personal Information
            </h2>
          </div>


          <div className="distributor-info-grid">

            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                👤
              </div>

              <div>
                <span className="distributor-info-label">
                  Full Name
                </span>

                <p className="distributor-info-value">
                  {name}
                </p>
              </div>

            </div>


            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                ✉️
              </div>

              <div>
                <span className="distributor-info-label">
                  Email Address
                </span>

                <p className="distributor-info-value">
                  {email}
                </p>
              </div>

            </div>


            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                📞
              </div>

              <div>
                <span className="distributor-info-label">
                  Mobile Number
                </span>

                <p className="distributor-info-value">
                  {mobile}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* BUSINESS INFORMATION */}

        <div className="distributor-information-card">

          <div className="distributor-section-header">
            <h2>
              Business Information
            </h2>
          </div>


          <div className="distributor-info-grid">

            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                🏢
              </div>

              <div>
                <span className="distributor-info-label">
                  Company Name
                </span>

                <p className="distributor-info-value">
                  {companyName}
                </p>
              </div>

            </div>


            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                🏭
              </div>

              <div>
                <span className="distributor-info-label">
                  Warehouse Address
                </span>

                <p className="distributor-info-value">
                  {warehouseAddress}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* ADDRESS INFORMATION */}

        <div className="distributor-information-card">

          <div className="distributor-section-header">
            <h2>
              Address Information
            </h2>
          </div>


          <div className="distributor-info-grid">

            <div className="distributor-info-item distributor-full-width">

              <div className="distributor-info-icon">
                📍
              </div>

              <div>
                <span className="distributor-info-label">
                  Address
                </span>

                <p className="distributor-info-value">
                  {address}
                </p>
              </div>

            </div>


            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                🏙️
              </div>

              <div>
                <span className="distributor-info-label">
                  City
                </span>

                <p className="distributor-info-value">
                  {city}
                </p>
              </div>

            </div>


            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                📌
              </div>

              <div>
                <span className="distributor-info-label">
                  District
                </span>

                <p className="distributor-info-value">
                  {district}
                </p>
              </div>

            </div>


            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                🗺️
              </div>

              <div>
                <span className="distributor-info-label">
                  State
                </span>

                <p className="distributor-info-value">
                  {state}
                </p>
              </div>

            </div>


            <div className="distributor-info-item">

              <div className="distributor-info-icon">
                🔢
              </div>

              <div>
                <span className="distributor-info-label">
                  Pincode
                </span>

                <p className="distributor-info-value">
                  {pincode}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* BOTTOM ACTION */}

        <div className="distributor-bottom-action">

          <button
            type="button"
            className="distributor-main-edit-button"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>

        </div>


        {/* LOGOUT */}

        <div className="distributor-logout-container">

          <button
            type="button"
            className="distributor-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default DistributorProfile;