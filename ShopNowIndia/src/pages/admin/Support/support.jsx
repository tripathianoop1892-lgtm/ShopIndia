import { useEffect, useMemo, useState } from "react";
import { getSupportTickets, replySupportTicket, updateSupportTicketStatus } from "../../../services/api";
import "./Support.css";
import "../../../components/Admin/PartnerUsers.css";

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [saving, setSaving] = useState(false);
  const loadTickets = async () => {
    const response = await getSupportTickets();
    setTickets(response?.data || []);
  };
  useEffect(() => { getSupportTickets().then((response) => setTickets(response?.data || [])).catch(console.error); }, []);
  const filteredTickets = useMemo(() => tickets.filter((ticket) => [ticket._id, ticket.name, ticket.role, ticket.subject, ticket.status].filter(Boolean).some((value) => value.toLowerCase().includes(search.toLowerCase()))), [tickets, search]);
  const updateStatus = async (status) => {
    setSaving(true);
    const response = await updateSupportTicketStatus(selected._id, status);
    if (response.success) { setSelected(response.data); await loadTickets(); }
    else alert(response.message || "Unable to update ticket status.");
    setSaving(false);
  };
  const sendReply = async () => {
    if (!reply.trim()) return;
    setSaving(true);
    const response = await replySupportTicket(selected._id, reply.trim());
    if (response.success) { setSelected(response.data); setReply(""); await loadTickets(); }
    else alert(response.message || "Unable to send reply.");
    setSaving(false);
  };
  return <section className="support-page">
    <div className="support-header"><div><h2>Support Center</h2><p>Manage customer and partner tickets</p></div><button className="add-btn" onClick={loadTickets}>Refresh</button></div>
    <div className="search-box"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search support ticket..." /></div>
    <div className="support-table"><table><thead><tr><th>Ticket ID</th><th>Name</th><th>Role</th><th>Subject</th><th>Status</th><th>Updated</th><th>Action</th></tr></thead><tbody>
      {filteredTickets.map((ticket) => <tr key={ticket._id}><td>#{ticket._id.slice(-6)}</td><td>{ticket.name}</td><td>{ticket.role}</td><td>{ticket.subject}</td><td><span className={ticket.status === "In Progress" ? "progress" : ticket.status.toLowerCase()}>{ticket.status}</span></td><td>{new Date(ticket.updatedAt).toLocaleDateString("en-IN")}</td><td><button className="view-btn" onClick={() => { setSelected(ticket); setReply(""); }}>View & Reply</button></td></tr>)}
      {!filteredTickets.length && <tr><td colSpan="7">No support tickets found.</td></tr>}
    </tbody></table></div>
    {selected && <div className="admin-modal-backdrop"><div className="admin-modal"><h3>Ticket #{selected._id.slice(-6)}</h3><p><strong>{selected.name}</strong> · {selected.role}</p><p><strong>{selected.subject}</strong></p><p>{selected.message}</p>{selected.replies?.length > 0 && <div className="support-replies">{selected.replies.map((item) => <p key={item._id}><strong>{item.repliedByName || "Admin"}:</strong> {item.message}</p>)}</div>}<label>Status<select value={selected.status} disabled={saving} onChange={(event) => updateStatus(event.target.value)}><option>Pending</option><option>In Progress</option><option>Resolved</option></select></label><label>Reply<textarea rows="4" value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write a response..." /></label><div className="admin-modal-actions"><button onClick={() => setSelected(null)}>Close</button><button className="add-btn" disabled={saving || !reply.trim()} onClick={sendReply}>{saving ? "Saving..." : "Send Reply"}</button></div></div></div>}
  </section>;
};

export default Support;
