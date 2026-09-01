import { useEffect, useState } from "react";
import { getAdminSettings, updateAdminSettings } from "../../../services/api";
import "./Settings.css";

const emptySettings = { websiteName: "", adminEmail: "", contactNumber: "", address: "", platformCommission: 0, deliveryCharge: 0, gst: 0 };

const Setting = () => {
  const [settings, setSettings] = useState(emptySettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAdminSettings()
      .then((response) => {
        if (!response.success) throw new Error(response.message || "Unable to load settings.");
        setSettings((current) => ({ ...current, ...response.data }));
      })
      .catch((error) => setMessage(error.message || "Unable to load settings."));
  }, []);

  const changeField = (event) => {
    const { name, value, type } = event.target;
    setSettings((current) => ({ ...current, [name]: type === "number" ? Number(value) : value }));
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      setMessage("");
      const response = await updateAdminSettings(settings);
      if (!response.success) throw new Error(response.message || "Unable to save settings.");
      setSettings((current) => ({ ...current, ...response.data }));
      setMessage("Settings saved successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return <div className="setting-page">
    <div className="setting-header"><h2>Settings</h2>{message && <p>{message}</p>}</div>
    <div className="setting-container">
      <div className="setting-card">
        <h3>General Settings</h3>
        <div className="form-group"><label>Website Name</label><input name="websiteName" type="text" value={settings.websiteName} onChange={changeField} /></div>
        <div className="form-group"><label>Admin Email</label><input name="adminEmail" type="email" value={settings.adminEmail} onChange={changeField} /></div>
        <div className="form-group"><label>Contact Number</label><input name="contactNumber" type="text" value={settings.contactNumber} onChange={changeField} /></div>
        <div className="form-group"><label>Address</label><textarea name="address" rows="4" value={settings.address} onChange={changeField} /></div>
        <button className="save-btn" onClick={saveSettings} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button>
      </div>
      <div className="setting-card">
        <h3>Platform Settings</h3>
        <div className="form-group"><label>Platform Commission (%)</label><input name="platformCommission" type="number" min="0" value={settings.platformCommission} onChange={changeField} /></div>
        <div className="form-group"><label>Delivery Charge (₹)</label><input name="deliveryCharge" type="number" min="0" value={settings.deliveryCharge} onChange={changeField} /></div>
        <div className="form-group"><label>GST (%)</label><input name="gst" type="number" min="0" value={settings.gst} onChange={changeField} /></div>
        <button className="save-btn" onClick={saveSettings} disabled={saving}>{saving ? "Saving..." : "Update Platform"}</button>
      </div>
    </div>
  </div>;
};

export default Setting;
