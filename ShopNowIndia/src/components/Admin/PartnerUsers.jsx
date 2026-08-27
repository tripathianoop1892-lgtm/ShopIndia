import { useCallback, useEffect, useMemo, useState } from "react";
import { createManagedUser, deleteManagedUser, updateManagedUser } from "../../services/api";
import "./PartnerUsers.css";

const emptyForm = { name: "", email: "", mobile: "", shopName: "", companyName: "", password: "" };

const PartnerUsers = ({ title, role, getUsers }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadUsers = useCallback(async () => {
    const data = await getUsers();
    setUsers(Array.isArray(data) ? data : []);
  }, [getUsers]);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase();
    return users.filter((user) => [user.name, user.email, user.mobile, user.shopName, user.companyName, user.city]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(keyword)));
  }, [users, search]);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (user) => {
    setEditing(user);
    setForm({ name: user.name || "", email: user.email || "", mobile: user.mobile || "", shopName: user.shopName || "", companyName: user.companyName || "", password: "" });
    setShowForm(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const result = editing ? await updateManagedUser(editing._id, form) : await createManagedUser({ ...form, role });
      if (!result.success) throw new Error(result.message);
      setShowForm(false);
      await loadUsers();
    } catch (error) {
      alert(error.message || "Unable to save the user.");
    } finally { setSaving(false); }
  };

  const toggleStatus = async (user) => {
    const result = await updateManagedUser(user._id, { status: user.status === "Inactive" ? "Active" : "Inactive" });
    if (!result.success) return alert(result.message || "Unable to update status.");
    loadUsers();
  };
  const remove = async (user) => {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return;
    const result = await deleteManagedUser(user._id);
    if (!result.success) return alert(result.message || "Unable to delete user.");
    loadUsers();
  };

  return (
    <section className="partner-users-page">
      <div className="page-header"><h2>{title}</h2></div>
      <div className="search-box"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${title.slice(0, -1)}...`} /></div>
      <div className="table-container"><table><thead><tr><th>Name</th><th>{role === "shopkeeper" ? "Shop" : "Company"}</th><th>Mobile</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {filteredUsers.map((user) => <tr key={user._id}><td>{user.name}</td><td>{user.shopName || user.companyName || "—"}</td><td>{user.mobile || "—"}</td><td>{user.email}</td><td><span className={user.status === "Inactive" ? "pending" : "active"}>{user.status || "Active"}</span></td><td className="partner-actions"><button className="edit-btn" onClick={() => openEdit(user)}>Edit</button><button className="status-btn" onClick={() => toggleStatus(user)}>{user.status === "Inactive" ? "Activate" : "Deactivate"}</button><button className="delete-btn" onClick={() => remove(user)}>Delete</button></td></tr>)}
        {!filteredUsers.length && <tr><td colSpan="6">No {title.toLowerCase()} found.</td></tr>}
      </tbody></table></div>
      {showForm && <div className="admin-modal-backdrop"><form className="admin-modal" onSubmit={submit}><h3>{editing ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}</h3><label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Mobile<input value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} /></label>{role === "shopkeeper" && <label>Shop name<input value={form.shopName} onChange={(event) => setForm({ ...form, shopName: event.target.value })} /></label>}{role === "distributor" && <label>Company name<input value={form.companyName} onChange={(event) => setForm({ ...form, companyName: event.target.value })} /></label>}{!editing && <label>Temporary password<input required minLength="6" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>}<div className="admin-modal-actions"><button type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="add-btn" disabled={saving}>{saving ? "Saving..." : "Save"}</button></div></form></div>}
    </section>
  );
};

export default PartnerUsers;
