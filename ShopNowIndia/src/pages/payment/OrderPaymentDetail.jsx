import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getOrders } from "../../services/api";
import "./OrderPaymentDetail.css";

const OrderPaymentDetail = ({ view = "" }) => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const requestedView = searchParams.get("view") || view;
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getOrders(requestedView).then((orders) => setOrder((Array.isArray(orders) ? orders : []).find((item) => item._id === orderId) || null)).catch(console.error).finally(() => setLoading(false));
  }, [orderId, requestedView]);
  if (loading) return <p>Loading payment details...</p>;
  if (!order) return <section className="payment-detail-page"><button onClick={() => navigate(-1)}>← Back</button><h2>Payment record not found</h2><p>This order may not belong to the current account.</p></section>;
  const amount = Number(order.finalAmount ?? order.totalAmount ?? 0);
  const paymentStatus = order.status === "Rejected" ? "Failed" : order.status === "Pending" ? "Pending" : "Successful";
  return <section className="payment-detail-page">
    <button className="payment-back" onClick={() => navigate(-1)}>← Back to Orders</button>
    <div className="payment-detail-card"><div className="payment-detail-header"><div><p>Payment Details</p><h2>Order #{order._id.slice(-8).toUpperCase()}</h2></div><span className={`payment-state ${paymentStatus.toLowerCase()}`}>{paymentStatus}</span></div>
      <div className="payment-detail-grid"><div><span>Order type</span><strong>{order.orderType}</strong></div><div><span>Order date</span><strong>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</strong></div><div><span>Payment method</span><strong>{order.paymentMethod || (order.paymentStatus === "Paid" ? "Razorpay" : "Not available")}</strong></div><div><span>Payment reference</span><strong>{order.paymentId || "Not available"}</strong></div><div><span>Order status</span><strong>{order.status}</strong></div></div>
      <div className="payment-items"><h3>Items</h3>{order.items?.map((item, index) => <div key={item._id || index}><span>{item.name} × {item.quantity}</span><strong>₹{(Number(item.price) * Number(item.quantity)).toLocaleString("en-IN")}</strong></div>)}</div>
      <div className="payment-summary"><div><span>Subtotal</span><strong>₹{Number(order.subtotal ?? 0).toLocaleString("en-IN")}</strong></div><div><span>Delivery charge</span><strong>₹{Number(order.deliveryCharge ?? 0).toLocaleString("en-IN")}</strong></div><div><span>Platform fee</span><strong>₹{Number(order.platformFee ?? 0).toLocaleString("en-IN")}</strong></div><div><span>Discount</span><strong>− ₹{Number(order.discountAmount ?? 0).toLocaleString("en-IN")}</strong></div><div className="payment-total"><span>Total</span><strong>₹{amount.toLocaleString("en-IN")}</strong></div></div>
    </div>
  </section>;
};

export default OrderPaymentDetail;
