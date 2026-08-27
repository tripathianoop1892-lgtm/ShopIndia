import { useEffect, useMemo, useState } from "react";
import { createAdminNotification, deleteAdminNotification, getAdminNotifications } from "../../../services/api";
import "./Notifications.css";
import "../../../components/Admin/PartnerUsers.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", receiverRole: "all" });
  const load = async () => { const response = await getAdminNotifications(); setNotifications(response?.data || []); };
  useEffect(() => { getAdminNotifications().then((response) => setNotifications(response?.data || [])).catch(console.error); }, []);
  const filtered = useMemo(() => notifications.filter((item) => [item.title, item.message, item.receiverRole].filter(Boolean).some((value) => value.toLowerCase().includes(search.toLowerCase()))), [notifications, search]);
  const submit = async (event) => {
    event.preventDefault();
    const response = await createAdminNotification(form);
    if (!response.success) return alert(response.message || "Unable to send notification.");
    setShowForm(false); setForm({ title: "", message: "", receiverRole: "all" }); load();
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    const response = await deleteAdminNotification(id);
    if (!response.success) return alert(response.message || "Unable to delete notification.");
    load();
  };
  return <section className="notification-page">
    <div className="notification-header"><h2>Notifications</h2><button className="send-btn" onClick={() => setShowForm(true)}>+ Send Notification</button></div>
    <div className="search-box"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notification..." /></div>
    <div className="notification-table"><table><thead><tr><th>Title</th><th>Message</th><th>Recipient</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>
      {filtered.map((item) => <tr key={item._id}><td>{item.title}</td><td>{item.message}</td><td>{item.receiverRole}</td><td>{new Date(item.createdAt).toLocaleDateString("en-IN")}</td><td><span className="sent">{item.status}</span></td><td><button className="delete-btn" onClick={() => remove(item._id)}>Delete</button></td></tr>)}
      {!filtered.length && <tr><td colSpan="6">No notifications found.</td></tr>}
    </tbody></table></div>
    {showForm && <div className="admin-modal-backdrop"><form className="admin-modal" onSubmit={submit}><h3>Send Notification</h3><label>Title<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label><label>Message<textarea required rows="4" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label><label>Recipient<select value={form.receiverRole} onChange={(event) => setForm({ ...form, receiverRole: event.target.value })}><option value="all">All users</option><option value="customer">Customers</option><option value="shopkeeper">Shopkeepers</option><option value="distributor">Distributors</option></select></label><div className="admin-modal-actions"><button type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="send-btn">Send</button></div></form></div>}
  </section>;
};

export default Notifications;
