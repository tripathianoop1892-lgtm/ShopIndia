import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../features/cartSlice";
import { getCart, removeCartItem, placeOrder, addToCart, validateCoupon, createRazorpayOrder, verifyRazorpayPayment } from "../../services/api";
import { FaTrashAlt, FaStore, FaReceipt, FaShoppingBag, FaSpinner, FaCheckCircle, FaExclamationCircle, FaPlus, FaMinus } from "react-icons/fa";
import "./Card.css";

const Cart = () => {
  const dispatch = useDispatch();
  
  const cartList = useSelector((state) => state.cart.cartItems || []);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // Tracks specific group checkout loading states
  const [qtyUpdating, setQtyUpdating] = useState(null); // Tracks item-specific qty loaders
  const [notification, setNotification] = useState({ text: "", type: "" });
  const [couponInputs, setCouponInputs] = useState({});
  const [couponStatuses, setCouponStatuses] = useState({});
  const [couponLoading, setCouponLoading] = useState(null);

  const showNotification = useCallback((text, type) => {
    setNotification({ text, type });
    setTimeout(() => setNotification({ text: "", type: "" }), 4000);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCart();
      const actualItems = data.cart || data || [];
      dispatch(setCartItems(actualItems));
    } catch (error) {
      showNotification("Error synchronizing with remote cart systems.", "error");
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, showNotification]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 🏢 MULTI-DISTRIBUTOR GROUPING MATRIX
  const groupedOrders = useMemo(() => {
    const groups = {};
    cartList.forEach((item) => {
      const vendorId = item.sellerId || item.ownerId || "General-Wholesale";
      const vendorName = item.company || `Distributor Node (${String(vendorId).substring(0, 6)})`;

      if (!groups[vendorId]) {
        groups[vendorId] = {
          sellerId: vendorId,
          sellerName: vendorName,
          items: [],
          totalAmount: 0,
        };
      }
      groups[vendorId].items.push(item);
      groups[vendorId].totalAmount += (item.price || 0) * (item.quantity || item.qty || 1);
    });
    return Object.values(groups);
  }, [cartList]);

  // 🔼 PERSISTENT QUANTITY ADJUSTMENT MECHANISM (+ / -)
  const handleUpdateQuantity = async (item, adjustment) => {
    const currentQty = item.quantity || item.qty || 1;
    
    // Prevent quantity from falling below 1 unit
    if (currentQty + adjustment < 1) return;

    try {
      setQtyUpdating(item._id || item.medicineId);
      
      // Dispatch delta adjustment to your remote backend database cloud layers
      const res = await addToCart({
        medicineId: item.medicineId,
        name: item.name,
        company: item.company,
        price: item.price,
        image: item.image,
        quantity: adjustment, // Passes 1 or -1 to execute algebraic increments in DB
        sellerId: item.sellerId
      });

      if (res.success) {
        dispatch(setCartItems(res.cart || []));
      } else {
        fetchCart();
      }
    } catch (error) {
      showNotification("Could not sync quantity adjustment with database.", "error");
      console.error(error);
    } finally {
      setQtyUpdating(null);
    }
  };

  const removeItem = async (itemName) => {
    try {
      const res = await removeCartItem(itemName);
      if (res.success || res.cart) {
        dispatch(setCartItems(res.cart || []));
        showNotification(`${itemName} removed from inventory bundle.`, "success");
      } else {
        fetchCart();
      }
    } catch (error) {
      showNotification("Failed executing structural item deletion.", "error");
      console.error("Failed executing item removal:", error);
    }
  };

  const handleApplyCoupon = async (group) => {
    const code = (couponInputs[group.sellerId] || "").trim();

    if (!code) {
      setCouponStatuses((prev) => ({
        ...prev,
        [group.sellerId]: { applied: false, message: "Enter a coupon code first" },
      }));
      return;
    }

    try {
      setCouponLoading(group.sellerId);
      const res = await validateCoupon(code, group.totalAmount);

      if (res.success) {
        setCouponStatuses((prev) => ({
          ...prev,
          [group.sellerId]: {
            applied: true,
            message: `Coupon applied successfully. Discount ₹${res.data.discountAmount}`,
            code: res.data.code,
            discountAmount: res.data.discountAmount,
            finalAmount: res.data.finalAmount,
          },
        }));
        showNotification(`Coupon ${res.data.code} applied successfully.`, "success");
      } else {
        setCouponStatuses((prev) => ({
          ...prev,
          [group.sellerId]: { applied: false, message: res.message || "Unable to apply coupon" },
        }));
        showNotification(res.message || "Unable to apply coupon", "error");
      }
    } catch {
      setCouponStatuses((prev) => ({
        ...prev,
        [group.sellerId]: { applied: false, message: "Unable to apply coupon" },
      }));
      showNotification("Unable to apply coupon", "error");
    } finally {
      setCouponLoading(null);
    }
  };

  const handleCheckoutGroup = async (group) => {
    try {
      setActionLoading(group.sellerId);
      const couponState = couponStatuses[group.sellerId] || {};
      const orderPayload = {
        sellerId: group.sellerId,
        // The server calculates the payable amount from these fields.
        // Passing only `totalAmount` made persisted orders total ₹0.
        subtotal: group.totalAmount,
        deliveryCharge: 0,
        platformFee: 0,
        couponCode: couponState.applied ? couponState.code : "",
        items: group.items.map((i) => ({
          medicineId: i.medicineId,
          name: i.name,
          quantity: i.quantity || i.qty || 1,
          price: i.price || 0,
        })),
      };

      const amount = couponState.applied ? couponState.finalAmount : group.totalAmount;
      const paymentOrder = await createRazorpayOrder(amount);
      if (!paymentOrder.success) throw new Error(paymentOrder.message || "Unable to start Razorpay payment.");
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = () => reject(new Error("Unable to load Razorpay Checkout."));
          document.body.appendChild(script);
        });
      }
      const paymentReference = await new Promise((resolve, reject) => {
        const checkout = new window.Razorpay({
          key: paymentOrder.data.keyId,
          amount: paymentOrder.data.amount,
          currency: paymentOrder.data.currency,
          name: "OmSanjeevani",
          description: `Order from ${group.sellerName}`,
          order_id: paymentOrder.data.orderId,
          handler: async (response) => {
            try {
              const verification = await verifyRazorpayPayment({ intentId: paymentOrder.data.intentId, ...response });
              if (!verification.success) throw new Error(verification.message || "Payment verification failed.");
              resolve(verification.data.paymentReference);
            } catch (error) { reject(error); }
          },
          modal: { ondismiss: () => reject(new Error("Payment was cancelled.")) },
          theme: { color: "#2563eb" },
        });
        checkout.open();
      });

      const res = await placeOrder({ ...orderPayload, paymentReference });
      if (res.success) {
        showNotification(`Order dispatched successfully to ${group.sellerName}! ✅`, "success");
        
        for (let item of group.items) {
          await removeCartItem(item.name);
        }
        await fetchCart();
      } else {
        showNotification(res.message || "Failed to create order request pipeline.", "error");
      }
    } catch (err) {
      showNotification("Exception triggered during checkouts.", "error");
      console.error("Exception triggered during order execution:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="cart-loading-state">
        <FaSpinner className="spinner-icon" />
        <h3>Syncing Cart Ledger Balance Sheets...</h3>
        <p>Retrieving secure cloud-persisted stock arrays</p>
      </div>
    );
  }

  if (cartList.length === 0) {
    return (
      <div className="cart-empty-wrapper">
        <div className="empty-graphic-box">
          <FaShoppingBag />
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Navigate to the main vendor index panel to select wholesale medicine supplies.</p>
      </div>
    );
  }

  return (
    <div className="cart-modern-view-container">
      <div className="cart-dashboard-header">
        <div>
          <h2>🛒 Your Cart</h2>
          <p>Review and checkout supply streams isolated dynamically per authorized distributor firm node.</p>
        </div>
        <div className="global-basket-summary-badge">
          <FaReceipt style={{ marginRight: "8px" }} /> Total Lines: {cartList.length}
        </div>
      </div>

      {notification.text && (
        <div className={`notification-toast-banner ${notification.type}`}>
          {notification.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
          <span>{notification.text}</span>
        </div>
      )}

      {/* RENDER DISTRIBUTOR ORDER GROUPS */}
      <div className="groups-stack-layout">
        {groupedOrders.map((group) => (
          <div key={group.sellerId} className="professional-vendor-card-block">
            
            <div className="vendor-group-meta-header">
              <div className="vendor-title-wrapper">
                <div className="vendor-icon-shield">
                  <FaStore />
                </div>
                <div>
                  <h3>{group.sellerName}</h3>
                  <span className="vendor-id-subtext">Vendor ID: {group.sellerId}</span>
                </div>
              </div>
              <span className="group-row-count-pill">{group.items.length} unique medications</span>
            </div>

            <div className="items-table-scroller">
              <table className="professional-cart-table">
                <thead>
                  <tr>
                    <th>Medication Details</th>
                    <th className="text-center">Unit Wholesale Price</th>
                    <th className="text-center">Item Qty</th>
                    <th className="text-right">Line Total</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item, index) => {
                    const itemId = item._id || item.medicineId;
                    const isItemUpdating = qtyUpdating === itemId;

                    return (
                      <tr key={itemId || index}>
                        <td>
                          <div className="med-details-cell">
                            <span className="med-primary-title">{item.name}</span>
                            <span className="med-secondary-manufacturer">{item.company || "Manufacturer N/A"}</span>
                          </div>
                        </td>
                        <td className="text-center numerical-font">₹{(item.price || 0).toLocaleString('en-IN')}</td>
                        <td className="text-center">
                          <div className="pro-quantity-controls-wrapper">
                            <button 
                              className="qty-adjust-btn minus"
                              disabled={isItemUpdating || (item.quantity || item.qty || 1) <= 1}
                              onClick={() => handleUpdateQuantity(item, -1)}
                            >
                              <FaMinus />
                            </button>
                            
                            <span className={`pro-quantity-pill ${isItemUpdating ? 'pulse' : ''}`}>
                              {item.quantity || item.qty || 1}
                            </span>

                            <button 
                              className="qty-adjust-btn plus"
                              disabled={isItemUpdating}
                              onClick={() => handleUpdateQuantity(item, 1)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td className="text-right numerical-font bold-total">
                          ₹{((item.price || 0) * (item.quantity || item.qty || 1)).toLocaleString('en-IN')}
                        </td>
                        <td className="text-center">
                          <button 
                            className="pro-action-delete-btn" 
                            onClick={() => removeItem(item.name)}
                            title="Remove item from group"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="vendor-card-footer-summary">
              <div className="coupon-wrapper">
                <div className="coupon-input-row">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponInputs[group.sellerId] || ""}
                    onChange={(event) =>
                      setCouponInputs((prev) => ({
                        ...prev,
                        [group.sellerId]: event.target.value,
                      }))
                    }
                  />
                  <button
                    className="coupon-apply-btn"
                    onClick={() => handleApplyCoupon(group)}
                    disabled={couponLoading === group.sellerId}
                  >
                    {couponLoading === group.sellerId ? "Applying..." : "Apply"}
                  </button>
                </div>

                {couponStatuses[group.sellerId]?.message && (
                  <p className={`coupon-feedback ${couponStatuses[group.sellerId].applied ? "success" : "error"}`}>
                    {couponStatuses[group.sellerId].message}
                  </p>
                )}
              </div>

              <div className="summary-stack">
                <div className="summary-accumulated-box">
                  <span className="summary-label">Aggregated Subtotal</span>
                  <span className="summary-value-amount">₹{group.totalAmount.toLocaleString('en-IN')}</span>
                </div>

                {couponStatuses[group.sellerId]?.applied && (
                  <div className="summary-accumulated-box discount-box">
                    <span className="summary-label">Discount</span>
                    <span className="summary-value-amount discount">-₹{couponStatuses[group.sellerId].discountAmount.toLocaleString('en-IN')}</span>
                    <span className="summary-label">Payable</span>
                    <span className="summary-value-amount">₹{couponStatuses[group.sellerId].finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
              
              <button 
                className="pro-checkout-dispatch-btn"
                disabled={actionLoading !== null}
                onClick={() => handleCheckoutGroup(group)}
              >
                {actionLoading === group.sellerId ? (
                  <>
                    <FaSpinner className="spinner-icon path-animate" /> Dispatching Requests...
                  </>
                ) : (
                  "Order"
                )}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
