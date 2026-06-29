<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, clearCartState } from "../../features/cartSlice";
import { getCart, removeCartItem, placeOrder, addToCart } from "../../services/api";
import { FaTrashAlt, FaStore, FaReceipt, FaShoppingBag, FaSpinner, FaCheckCircle, FaExclamationCircle, FaPlus, FaMinus } from "react-icons/fa";
import "./Card.css";

const Cart = () => {
  const dispatch = useDispatch();
  
  const cartList = useSelector((state) => state.cart.cartItems || []);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // Tracks specific group checkout loading states
  const [qtyUpdating, setQtyUpdating] = useState(null); // Tracks item-specific qty loaders
  const [notification, setNotification] = useState({ text: "", type: "" });

  const fetchCart = async () => {
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
  };

  useEffect(() => {
    fetchCart();
  }, [dispatch]);

  const showNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => setNotification({ text: "", type: "" }), 4000);
  };

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

  const handleCheckoutGroup = async (group) => {
    try {
      setActionLoading(group.sellerId);
      const orderPayload = {
        sellerId: group.sellerId,
        totalAmount: group.totalAmount,
        items: group.items.map((i) => ({
          medicineId: i.medicineId,
          name: i.name,
          quantity: i.quantity || i.qty || 1,
          price: i.price || 0,
        })),
      };

      const res = await placeOrder(orderPayload);
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
              <div className="summary-accumulated-box">
                <span className="summary-label">Aggregated Subtotal</span>
                <span className="summary-value-amount">₹{group.totalAmount.toLocaleString('en-IN')}</span>
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
=======
import React, { useState, useEffect } from "react";
import "./Card.css";

import {
  getCart,
  removeCartItem,
  placeOrder
} from "../../services/api";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // 🔥 Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();

        console.log("Cart Data:", data);

        // ✅ Fixed cart fetch
        setCart(data.cart || data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  // 🔼 Increase qty
  const increaseQty = (index) => {
    const updated = [...cart];

    updated[index].qty =
      (updated[index].qty || updated[index].quantity || 1) + 1;

    setCart(updated);
  };

  // 🔽 Decrease qty
  const decreaseQty = (index) => {
    const updated = [...cart];

    if ((updated[index].qty || updated[index].quantity || 1) > 1) {
      updated[index].qty =
        (updated[index].qty || updated[index].quantity || 1) - 1;

      setCart(updated);
    }
  };

    const removeItem = async (index) => {

  try {

    const item = cart[index];

    await removeCartItem(item.name);

    const updated = cart.filter(
      (_, i) => i !== index
    );

    setCart(updated);

  } catch (error) {

    console.log(error);

  }
};
  // 💰 Total
  const total = cart.reduce(
    (sum, item) =>
      sum +
      (item.price || 0) *
        (item.qty || item.quantity || 1),
    0
  );

  return (
    <div className="main-content">
      <h2>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty 🛒</p>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={item._id || index}>
              
              <div className="cart-info">
                <h3>{item.name}</h3>

                <p>{item.company || "No company"}</p>

                <p>₹{item.price || 0}</p>
              </div>

              <div className="cart-controls">
                <button onClick={() => decreaseQty(index)}>
                  -
                </button>

                <span>
                  {item.qty || item.quantity || 1}
                </span>

                <button onClick={() => increaseQty(index)}>
                  +
                </button>
              </div>

              <div className="cart-price">
                ₹
                {(item.price || 0) *
                  (item.qty || item.quantity || 1)}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                ❌
              </button>
            </div>
          ))}

          <div className="cart-footer">
            <h3>Total: ₹{total}</h3>

           <button
  className="checkout"
  disabled={cart.length === 0}

  onClick={async () => {

    try {

      const res = await placeOrder({
        items: cart,
        total,
      });

      console.log(res);

      alert("Order placed successfully ✅");

      setCart([]);

    } catch (err) {

      console.log(err);

    }
  }}
>
  Checkout
</button>
          </div>
        </>
      )}
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </div>
  );
};

export default Cart;