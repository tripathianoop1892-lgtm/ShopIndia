import { useEffect, useMemo, useState } from "react";
import { getAdminOrders } from "../../../services/api";
import { exportRowsToExcel } from "../../../utils/export";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => { getAdminOrders().then((data) => setOrders(Array.isArray(data) ? data : [])).catch(console.error); }, []);
  const filteredOrders = useMemo(() => orders.filter((order) => {
    const matchesSearch = [order._id, order.customerName, order.shopkeeperName, order.orderType].filter(Boolean).some((value) => value.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch && (status === "All" || order.status === status);
  }), [orders, search, status]);
  const exportOrders = () => exportRowsToExcel("orders-report", filteredOrders.map((order) => ({
    "Order ID": order._id, Type: order.orderType, Customer: order.customerName || "—", Shopkeeper: order.shopkeeperName || "—", Amount: order.finalAmount ?? order.totalAmount, Status: order.status, Date: new Date(order.createdAt).toLocaleDateString("en-IN"),
  })));

  return <section className="orders-page">
    <div className="orders-header"><h2>Orders Management</h2><button className="export-btn" onClick={exportOrders}>Export Orders</button></div>
    <div className="search-filter"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order, customer, or shopkeeper..." /><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="All">All Status</option><option>Pending</option><option>Approved</option><option>Delivered</option><option>Rejected</option></select></div>
    <div className="orders-table"><table><thead><tr><th>Order ID</th><th>Type</th><th>Customer</th><th>Shopkeeper</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>
      {filteredOrders.map((order) => <tr key={order._id}><td>#{order._id.slice(-8)}</td><td>{order.orderType}</td><td>{order.customerName || "—"}</td><td>{order.shopkeeperName || "—"}</td><td>₹{Number(order.finalAmount ?? order.totalAmount ?? 0).toLocaleString("en-IN")}</td><td><span className={order.status.toLowerCase()}>{order.status}</span></td><td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td></tr>)}
      {!filteredOrders.length && <tr><td colSpan="7">No orders found.</td></tr>}
    </tbody></table></div>
  </section>;
};

export default Orders;
