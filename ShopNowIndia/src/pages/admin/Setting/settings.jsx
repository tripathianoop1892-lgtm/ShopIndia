import "./Settings.css";

const Setting = () => {
  return (
    <div className="setting-page">

      <div className="setting-header">
        <h2>Settings</h2>
      </div>

      <div className="setting-container">

        <div className="setting-card">

          <h3>General Settings</h3>

          <div className="form-group">
            <label>Website Name</label>
            <input
              type="text"
              placeholder="Omsanjeevni"
            />
          </div>

          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              placeholder="+91 9876543210"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              rows="4"
              placeholder="Enter Address"
            ></textarea>
          </div>

          <button className="save-btn">
            Save Settings
          </button>

        </div>

        <div className="setting-card">

          <h3>Platform Settings</h3>

          <div className="form-group">
            <label>Platform Commission (%)</label>
            <input
              type="number"
              placeholder="5"
            />
          </div>

          <div className="form-group">
            <label>Delivery Charge (₹)</label>
            <input
              type="number"
              placeholder="50"
            />
          </div>

          <div className="form-group">
            <label>GST (%)</label>
            <input
              type="number"
              placeholder="18"
            />
          </div>

          <button className="save-btn">
            Update Platform
          </button>

        </div>

      </div>

    </div>
  );
};

export default Setting;