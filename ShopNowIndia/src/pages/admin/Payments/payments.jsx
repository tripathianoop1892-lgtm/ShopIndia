import { useEffect, useMemo, useState } from "react";
import { getAdminOrders } from "../../../services/api";
import { exportRowsToExcel } from "../../../utils/export";
import "./Payments.css";

const paymentStatus = (order) => order.status === "Rejected" ? "Failed" : order.status === "Pending" ? "Pending" : "Success";

const Payments = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  useEffect(() => { getAdminOrders().then((data) => setOrders(Array.isArray(data) ? data : [])).catch(console.error); }, []);
  const payments = useMemo(() => orders.map((order) => ({ ...order, paymentStatus: paymentStatus(order) })).filter((order) => {
    const matchesSearch = [order._id, order.customerName, order.shopkeeperName].filter(Boolean).some((value) => value.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch && (status === "All" || order.paymentStatus === status);
  }), [orders, search, status]);
  const exportPayments = () => exportRowsToExcel("payments-report", payments.map((payment) => ({
    "Order ID": payment._id, Customer: payment.customerName || payment.shopkeeperName || "—", Amount: payment.finalAmount ?? payment.totalAmount, "Payment Status": payment.paymentStatus, "Order Status": payment.status, Date: new Date(payment.createdAt).toLocaleDateString("en-IN"),
  })));

  return <section className="payments-page">
    <div className="payments-header"><div><h2>Payments</h2><p>Payment summary based on live order records</p></div><button className="export-btn" onClick={exportPayments}>Export Report</button></div>
    <div className="search-filter"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search transaction..." /><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="All">All Status</option><option>Success</option><option>Pending</option><option>Failed</option></select></div>
    <div className="payments-table"><table><thead><tr><th>Order ID</th><th>Party</th><th>Amount</th><th>Method</th><th>Payment Status</th><th>Order Status</th><th>Date</th></tr></thead><tbody>
      {payments.map((payment) => <tr key={payment._id}><td>#{payment._id.slice(-8)}</td><td>{payment.customerName || payment.shopkeeperName || "—"}</td><td>₹{Number(payment.finalAmount ?? payment.totalAmount ?? 0).toLocaleString("en-IN")}</td><td>Not captured</td><td><span className={payment.paymentStatus.toLowerCase()}>{payment.paymentStatus}</span></td><td>{payment.status}</td><td>{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td></tr>)}
      {!payments.length && <tr><td colSpan="7">No payment records found.</td></tr>}
    </tbody></table></div>
  </section>;
};

export default Payments;
