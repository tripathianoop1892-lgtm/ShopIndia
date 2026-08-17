import React, { useEffect, useState } from "react";
import "./Shopkeeper.css"; // Uses the same styled sheet for layout consistency
import { MedicinesList, addToCart, getCart } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../features/cartSlice";
import { FaShoppingBasket, FaSpinner, FaHistory } from "react-icons/fa";

const CustomerMedicineList = () => {
  const dispatch = useDispatch();
  const [purchasedMedicines, setPurchasedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);  
  // Synchronize dynamic quantities with global Redux basket indicators[cite: 1]
  const currentCartItems = useSelector((state) => state.cart.cartItems || []);
  useEffect(() => {
    fetchCustomerSpecificMedicines();
    fetchCurrentBasket();
  }, []);
  const fetchCustomerSpecificMedicines = async () => {
    try {
      setLoading(true);
      // Retrieve unique purchase lines belonging to this consumer context[cite: 1, 2]
      const orders = await getOrders();
      const uniqueMedsMap = new Map();
      if (Array.isArray(orders)) {
        orders.forEach(order => {
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
              if (!uniqueMedsMap.has(item.medicineId)) {
                uniqueMedsMap.set(item.medicineId, {
                  _id: item.medicineId,
                  name: item.name,
                  price: item.price,
                  company: item.company || "Generic",
                  type: item.type || "Tablet" // Preserves drug specifications[cite: 1, 2]
                });
              }
            });
          }
        });
      }  
      setPurchasedMedicines(Array.from(uniqueMedsMap.values()));
    } catch (err) {
      console.error("Error compiling personalized drug sheets:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchCurrentBasket = async () => {
    try {
      const res = await getCart();
      if (res.success) {
        dispatch(setCartItems(res.cart || []));
      }
    } catch (err) {
      console.error("Basket state sync failure:", err);
    }
  };
  const handleAddToCart = async (med) => {
    try {
      const sellerId = typeof med.ownerId === "object" ? med.ownerId?._id : med.ownerId;
      const finalCustomerPrice = Number(med.price || 0);
      const payload = {
        medicineId: med._id,
        name: med.name,
        company: med.company || "",
        price: finalCustomerPrice,
        image: "",
        quantity: 1,
        sellerId: sellerId || "Retail-Store",
      };

      const res = await addToCart(payload);
      if (res.success) {
        alert(`${med.name} added to your basket successfully!`);
        dispatch(setCartItems(res.cart || []));
      } else {
        alert(res.message || "Failed to add product to cart");
      }
    } catch (err) {
      console.error("Cart dispatch connection exception:", err);
    }
  };
  if (loading) {
    return (
      <div className="shopkeeper-container" style={{ padding: "20px" }}>
        <p><FaSpinner style={{ animation: "spin 1s linear infinite", marginRight: "8px" }} /> Syncing personalized medication ledger records...</p>
      </div>
    );
  }
  return (
    <div className="shopkeeper-container" style={{ padding: "20px" }}>
      {/* UI TYPOGRAPHY AND SUBTITLE MATCHING IMAGE verbatim */}
      <h2>📦 My Medicines</h2>
      <p style={{ color: "#666" }}>These items are extracted exclusively from your active marketplace transaction history logs.</p>

      <div style={{ marginTop: "20px", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            {/* Exactly replicates the Header Style profile from image_8809ab.png */}
            <tr style={{ background: "#2c3e50", color: "white", height: "45px" }}>
              <th style={{ padding: "12px", fontWeight: "600" }}>Medicine Name</th>
              <th style={{ padding: "12px", fontWeight: "600" }}>Company</th>
              <th style={{ padding: "12px", fontWeight: "600" }}>Type</th>
              <th style={{ padding: "12px", fontWeight: "600" }}>Last Purchase Cost</th>
              <th style={{ padding: "12px", fontWeight: "600", textAlign: "center" }}>Action Pipeline</th>
            </tr>
          </thead>
          <tbody>
            {purchasedMedicines.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>
                  No personal medicine logs found. Place retail orders on your dashboard to populate.
                </td>
              </tr>
            ) : (
              purchasedMedicines.map((m) => {
                const cartMatch = currentCartItems.find((item) => item.medicineId === m._id);
                const quantityInCart = cartMatch ? cartMatch.quantity || cartMatch.qty : 0;
                return (
                  <tr key={m._id} style={{ borderBottom: "1px solid #f1f5f9", height: "50px" }}>
                    <td style={{ padding: "12px", fontWeight: "600", color: "#2c3e50" }}>{m.name}</td>
                    <td style={{ padding: "12px", color: "#4a5568" }}>{m.company}</td>
                    <td style={{ padding: "12px", color: "#4a5568" }}>{m.type}</td>
                    <td style={{ padding: "12px", color: "#16a34a", fontWeight: "bold" }}>
                      ₹{Number(m.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        onClick={() => handleAddToCart(m)}
                        style={{
                          background: quantityInCart > 0 ? "#2563eb" : "#10b981",
                          color: "white",
                          border: "none",
                          padding: "6px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "13px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <FaShoppingBasket />
                        {quantityInCart > 0 ? `In Basket (${quantityInCart})` : "Quick Reorder"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerMedicineList;