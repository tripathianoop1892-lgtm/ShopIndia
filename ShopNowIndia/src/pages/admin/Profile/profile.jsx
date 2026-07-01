import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-image">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Admin"
          />
        </div>

        <div className="profile-details">

          <h2>Admin Profile</h2>

          <div className="profile-info">
            <label>Full Name</label>
            <input
              type="text"
              value="Anoop Tripathi"
              readOnly
            />
          </div>

          <div className="profile-info">
            <label>Email</label>
            <input
              type="email"
              value="anoop@gmail.com"
              readOnly
            />
          </div>

          <div className="profile-info">
            <label>Mobile Number</label>
            <input
              type="text"
              value="9876543210"
              readOnly
            />
          </div>

          <div className="profile-info">
            <label>Role</label>
            <input
              type="text"
              value="Super Admin"
              readOnly
            />
          </div>

          <div className="profile-info">
            <label>Address</label>
            <textarea
              rows="3"
              readOnly
              defaultValue="Delhi, India"
            ></textarea>
          </div>

          <button className="edit-btn">
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;