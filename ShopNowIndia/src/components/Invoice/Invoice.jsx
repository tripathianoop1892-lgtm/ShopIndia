import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaPrint, FaTimes } from "react-icons/fa";
import "./Invoice.css";

const currency = (value) =>
  `\u20B9${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Invoice = ({ order, onClose }) => {
  useEffect(() => {
    if (!order) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, order]);

  if (!order) return null;

  const items = Array.isArray(order.items) ? order.items : [];
  const total = Number(order.finalAmount ?? order.totalAmount ?? 0);
  const invoiceNumber = `INV-${String(order._id || "ORDER").slice(-8).toUpperCase()}`;
  const customer = order.customerName || order.buyerId?.name || (order.orderType === "B2B" ? "Retail Pharmacy" : "Customer");
  const seller = order.shopkeeperName || order.sellerId?.name || (order.orderType === "B2B" ? "Distributor" : "ShopNowIndia Pharmacy");

  return createPortal(
    <div className="invoice-modal" role="dialog" aria-modal="true" aria-labelledby="invoice-title">
      <button type="button" className="invoice-backdrop" onClick={onClose} aria-label="Close invoice" />
      <article className="invoice-sheet">
        <header className="invoice-toolbar">
          <button type="button" className="invoice-close" onClick={onClose} aria-label="Close invoice">
            <FaTimes aria-hidden="true" />
            <span>Close</span>
          </button>
          <button type="button" className="invoice-print" onClick={() => window.print()}>
            <FaPrint aria-hidden="true" />
            Print / Save PDF
          </button>
        </header>

        <div className="invoice-content">
          <div className="invoice-heading">
            <div>
              <h2 id="invoice-title" className="invoice-brand">ShopNowIndia</h2>
              <p>Tax invoice</p>
            </div>
            <div className="invoice-meta">
              <strong>{invoiceNumber}</strong>
              <span>Issued {formatDate(order.createdAt)}</span>
            </div>
          </div>

          <div className="invoice-parties">
            <div><span>Bill to</span><strong>{customer}</strong></div>
            <div><span>Sold by</span><strong>{seller}</strong></div>
            <div><span>Order status</span><strong className="invoice-status">{order.status || "Pending"}</strong></div>
          </div>

          <div className="invoice-items-wrap">
            <table className="invoice-items">
              <colgroup>
                <col className="invoice-item-column" />
                <col className="invoice-quantity-column" />
                <col className="invoice-price-column" />
                <col className="invoice-total-column" />
              </colgroup>
              <thead>
                <tr><th>Item</th><th>Qty.</th><th>Unit price</th><th>Total</th></tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id || index}>
                    <td data-label="Item">{item.name || "Medicine"}</td>
                    <td data-label="Quantity">{item.quantity}</td>
                    <td data-label="Unit price">{currency(item.price)}</td>
                    <td data-label="Total">{currency(Number(item.price) * Number(item.quantity))}</td>
                  </tr>
                ))}
                {!items.length && (
                  <tr className="invoice-empty-row"><td colSpan="4">No item details available.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="invoice-totals">
            <div><span>Subtotal</span><strong>{currency(order.subtotal)}</strong></div>
            <div><span>Delivery charge</span><strong>{currency(order.deliveryCharge)}</strong></div>
            <div><span>Platform fee</span><strong>{currency(order.platformFee)}</strong></div>
            {Number(order.discountAmount) > 0 && <div><span>Discount</span><strong>- {currency(order.discountAmount)}</strong></div>}
            <div className="invoice-grand-total"><span>Total paid</span><strong>{currency(total)}</strong></div>
          </div>

          <footer className="invoice-footer">
            Payment method: {order.paymentMethod || "Not available"}
            {order.paymentId ? ` | Reference: ${order.paymentId}` : ""}
            <br />
            Thank you for choosing ShopNowIndia.
          </footer>
        </div>
      </article>
    </div>,
    document.body,
  );
};

export default Invoice;
