import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBanner, updateBanner } from "../../../services/api";
import "./BannerForm.css";

const BannerForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const existing = state?.banner;
  const [form, setForm] = useState({ title: existing?.title || "", subtitle: existing?.subtitle || "", image: existing?.image || "", link: existing?.link || "", status: existing?.status || "Active" });
  const [saving, setSaving] = useState(false);
  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, image: reader.result }));
    reader.readAsDataURL(file);
  };
  const submit = async (event) => {
    event.preventDefault(); setSaving(true);
    const response = existing ? await updateBanner(existing._id, form) : await createBanner(form);
    if (!response.success) { alert(response.message || "Unable to save banner."); setSaving(false); return; }
    navigate("/admin/banner");
  };
  return <section className="banner-form-page"><div className="banner-form-card"><h2>{existing ? "Edit Banner" : "Add New Banner"}</h2><form onSubmit={submit}>
    <div className="form-group"><label>Banner Title</label><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></div>
    <div className="form-group"><label>Subtitle</label><input value={form.subtitle} onChange={(event) => setForm({ ...form, subtitle: event.target.value })} /></div>
    <div className="form-group"><label>Banner Image</label><input type="file" accept="image/*" onChange={handleImage} />{!form.image && <input required placeholder="Image URL" onChange={(event) => setForm({ ...form, image: event.target.value })} />}</div>
    {form.image && <div className="image-preview"><img src={form.image} alt="Banner preview" /></div>}
    <div className="form-group"><label>Destination link</label><input value={form.link} onChange={(event) => setForm({ ...form, link: event.target.value })} placeholder="/customer/medicines" /></div>
    <div className="form-group"><label>Status</label><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Active</option><option>Inactive</option></select></div>
    <div className="btn-group"><button type="button" className="cancel-btn" onClick={() => navigate("/admin/banner")}>Cancel</button><button type="submit" className="save-btn" disabled={saving}>{saving ? "Saving..." : "Save Banner"}</button></div>
  </form></div></section>;
};

export default BannerForm;
