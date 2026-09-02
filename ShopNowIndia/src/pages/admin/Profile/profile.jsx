import React, { useEffect, useState } from "react";
import { updateProfile } from "../../../services/api";
import "./profile.css";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "Super Admin",
    address: "",
  });

  const [originalProfile, setOriginalProfile] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "Super Admin",
    address: "",
  });

  // ==========================================
  // LOAD ADMIN PROFILE
  // ==========================================

  useEffect(() => {
    loadAdminProfile();
  }, []);

  const loadAdminProfile = () => {
    try {
      const storedUser =
        localStorage.getItem("user") ||
        localStorage.getItem("userData");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        const loadedProfile = {
          fullName:
            user.fullName ||
            user.name ||
            "Admin",

          email:
            user.email ||
            "",

          mobile:
            user.mobile ||
            user.phone ||
            "",

          role:
            user.role ||
            "Super Admin",

          address:
            user.address ||
            "",
        };

        setProfile(loadedProfile);
        setOriginalProfile(loadedProfile);
      } else {
        const defaultProfile = {
          fullName: "Admin",
          email: "",
          mobile: "",
          role: "Super Admin",
          address: "",
        };

        setProfile(defaultProfile);
        setOriginalProfile(defaultProfile);
      }
    } catch (error) {
      console.error(
        "Admin Profile Load Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  // ==========================================
  // EDIT PROFILE
  // ==========================================

  const handleEditProfile = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSaveProfile = async () => {
    if (!profile.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!profile.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!profile.mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    try {
      const response = await updateProfile({ fullName: profile.fullName.trim(), email: profile.email.trim(), mobile: profile.mobile.trim(), address: profile.address.trim() });
      if (!response.success) throw new Error(response.message || "Unable to update profile.");
      const updatedUser = { ...response.user, fullName: response.user.name, phone: response.user.mobile };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      localStorage.setItem(
        "userData",
        JSON.stringify(updatedUser)
      );

      const updatedProfile = {
        fullName: profile.fullName.trim(),
        email: profile.email.trim(),
        mobile: profile.mobile.trim(),
        role: profile.role,
        address: profile.address.trim(),
      };

      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);

      alert(
        "Profile changes saved successfully."
      );

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Admin Profile Save Error:",
        error
      );

      alert(
        "Unable to update profile. Please try again."
      );
    }
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-profile-loading">
        <div className="admin-profile-loader" />

        <p>
          Loading profile...
        </p>
      </div>
    );
  }

  // ==========================================
  // PROFILE SCREEN
  // ==========================================

  return (
    <div className="admin-profile-page">

      <div className="admin-profile-container">

        {/* PROFILE CARD */}

        <div className="admin-profile-card">

          {/* PROFILE IMAGE */}

          <div className="admin-profile-image">
            {profile.fullName
              ?.charAt(0)
              ?.toUpperCase() || "A"}
          </div>


          {/* TITLE */}

          <h1 className="admin-profile-title">
            Admin Profile
          </h1>

          <p className="admin-profile-subtitle">
            Manage your account information
          </p>


          {/* FORM */}

          <div className="admin-profile-form">

            {/* FULL NAME */}

            <div className="admin-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Enter Full Name"
              />

            </div>


            {/* EMAIL */}

            <div className="admin-form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Enter Email"
              />

            </div>


            {/* MOBILE */}

            <div className="admin-form-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={profile.mobile}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                maxLength="10"
              />

            </div>


            {/* ROLE */}

            <div className="admin-form-group">

              <label>
                Role
              </label>

              <input
                type="text"
                name="role"
                value={profile.role}
                disabled
                className="admin-readonly-input"
              />

            </div>


            {/* ADDRESS */}

            <div className="admin-form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={profile.address}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Enter Address"
                rows="4"
              />

            </div>


            {/* BUTTONS */}

            {!isEditing ? (

              <button
                type="button"
                className="admin-edit-button"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>

            ) : (

              <div className="admin-edit-actions">

                <button
                  type="button"
                  className="admin-save-button"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>

                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;
