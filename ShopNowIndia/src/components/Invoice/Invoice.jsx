import { createPortal } from "react-dom";
import { FaPrint, FaTimes } from "react-icons/fa";
import "./Invoice.css";

const currency = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Invoice = ({ order, onClose }) => {
  if (!order) return null;
  const total = Number(order.finalAmount ?? order.totalAmount ?? 0);
  const invoiceNumber = `INV-${String(order._id || "").slice(-8).toUpperCase()}`;
  const customer = order.customerName || order.buyerId?.name || (order.orderType === "B2B" ? "Retail Pharmacy" : "Customer");
  const seller = order.shopkeeperName || order.sellerId?.name || (order.orderType === "B2B" ? "Distributor" : "ShopNowIndia Pharmacy");
  return createPortal(<div className="invoice-modal" role="dialog" aria-modal="true" aria-label={`Invoice ${invoiceNumber}`}><div className="invoice-backdrop" onClick={onClose} /><article className="invoice-sheet"><header className="invoice-toolbar"><button type="button" className="invoice-close" onClick={onClose} aria-label="Close invoice"><FaTimes /></button><button type="button" className="invoice-print" onClick={() => window.print()}><FaPrint /> Print / Save PDF</button></header><div className="invoice-content"><div className="invoice-heading"><div><span className="invoice-brand">ShopNowIndia</span><p>Tax invoice</p></div><div className="invoice-meta"><strong>{invoiceNumber}</strong><span>Issued {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></div></div><div className="invoice-parties"><div><span>Bill to</span><strong>{customer}</strong></div><div><span>Sold by</span><strong>{seller}</strong></div><div><span>Order status</span><strong className="invoice-status">{order.status || "Pending"}</strong></div></div><table className="invoice-items"><thead><tr><th>Item</th><th>Qty.</th><th>Unit price</th><th>Total</th></tr></thead><tbody>{order.items?.map((item, index) => <tr key={item._id || index}><td>{item.name}</td><td>{item.quantity}</td><td>{currency(item.price)}</td><td>{currency(Number(item.price) * Number(item.quantity))}</td></tr>)}</tbody></table><div className="invoice-totals"><div><span>Subtotal</span><strong>{currency(order.subtotal)}</strong></div><div><span>Delivery charge</span><strong>{currency(order.deliveryCharge)}</strong></div><div><span>Platform fee</span><strong>{currency(order.platformFee)}</strong></div>{Number(order.discountAmount) > 0 && <div><span>Discount</span><strong>− {currency(order.discountAmount)}</strong></div>}<div className="invoice-grand-total"><span>Total paid</span><strong>{currency(total)}</strong></div></div><footer className="invoice-footer">Payment method: {order.paymentMethod || "Not available"} {order.paymentId ? `• Reference: ${order.paymentId}` : ""}<br />Thank you for choosing ShopNowIndia.</footer></div></article></div>, document.body);
};
export default Invoice;
