import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MedicinesList, addToCart, getCart } from "../../services/api";
import { setCartItems } from "../../features/cartSlice";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import { 
  FaSearch, FaShoppingBasket, FaMedkit, FaBuilding, 
  FaExclamationTriangle, FaBoxes, FaClipboardList, FaRupeeSign 
} from "react-icons/fa";
import "./Customer.css";

const Customer = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const currentCartItems = useSelector((state) => state.cart.cartItems || []);

  useEffect(() => {
    fetchMarketplaceStock();
    fetchCurrentBasket();
  }, []);

  const fetchMarketplaceStock = async () => {
    try {
      setLoading(true);
      const data = await MedicinesList();
      setMedicines(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading marketplace catalog:", err);
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
      console.log(err);
    }
  };

  const handleAddProductToCart = async (med) => {
    try {
      const sellerId = typeof med.ownerId === "object" ? med.ownerId?._id : med.ownerId;
      const finalCustomerPrice = Number(med.retailPrice || med.price || med.mrp || 0);

      if (!sellerId) {
        alert("Seller details are missing for this product. Please refresh the catalog and try again.");
        return;
      }

      const payload = {
        medicineId: med._id,
        name: med.name,
        company: med.company || "",
        price: finalCustomerPrice,
        image: med.image || "",
        quantity: 1,
        sellerId,
      };

      const res = await addToCart(payload);
      if (res.success) {
        alert(`${med.name} added to your basket successfully! 🛒`);
        dispatch(setCartItems(res.cart || []));
      } else {
        alert(res.message || "Failed to add product to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Failed to add product to cart.");
    }
  };

  // =========================================================
  // DYNAMIC PROCUREMENT INSIGHTS CALCULATIONS
  // =========================================================
  const customerTotalMedsCount = currentCartItems.length;

  const customerLowStockProcurements = currentCartItems.filter(cartItem => {
    const marketplaceMatch = medicines.find(m => m.name === cartItem.name);
    return marketplaceMatch && marketplaceMatch.stock > 0 && marketplaceMatch.stock <= 5;
  }).length;
  
  const totalStagedUnits = currentCartItems.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0);
  const totalBasketValue = currentCartItems.reduce((acc, curr) => acc + ((Number(curr.price) || 0) * (Number(curr.quantity) || 0)), 0);

  const filteredMedicines = medicines.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-dashboard-container">
      <Header />

      {/* Account Meta Context Header Bar */}
      <div className="marketplace-hero-row">
        <div className="hero-meta-details">
          <h2>Pharmacy Marketplace</h2>
          <p className="connection-pill">
            <FaBuilding className="pill-icon" /> SHOP ID: <strong>{user?.shopId || "Unassigned Node"}</strong>
          </p>
        </div>

        <div className="search-wrapper-box">
          <FaSearch className="search-inside-icon" />
          <input
            type="text"
            placeholder="Search catalog by brand name or dynamic compound structure..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ===== INSIGHT STATS GRID ===== */}
      <div className="dashboard-stats-row">
        <div className="stat-card total-meds">
          <div className="stat-card-inner">
            <div className="stat-info">
              <h4>Total Medicines</h4>
              <h3>{customerTotalMedsCount} <span>Item</span></h3>
              <p>Unique lines in basket</p>
            </div>
            <div className="stat-icon-box"><FaBoxes /></div>
          </div>
        </div>
        
        <div className="stat-card low-stock-alert">
          <div className="stat-card-inner">
            <div className="stat-info">
              <h4>Low Stock Alerts</h4>
              <h3>{customerLowStockProcurements} <span>Items</span></h3>
              <p>Low availability items</p>
            </div>
            <div className="stat-icon-box"><FaExclamationTriangle /></div>
          </div>
        </div>

        <div className="stat-card today-orders">
          <div className="stat-card-inner">
            <div className="stat-info">
              <h4>Total Quantity in Cart</h4>
              <h3>{totalStagedUnits} <span>Items</span></h3>
              <p>Cumulative package volume</p>
            </div>
            <div className="stat-icon-box"><FaClipboardList /></div>
          </div>
        </div>

        <div className="stat-card monthly-earnings">
          <div className="stat-card-inner">
            <div className="stat-info">
              <h4>Total Cart Value</h4>
              <h3>₹{totalBasketValue.toLocaleString('en-IN')}</h3>
              <p>Estimated balance gross</p>
            </div>
            <div className="stat-icon-box"><FaRupeeSign /></div>
          </div>
        </div>
      </div>

      {/* ===== CORPORATE ACCOUNT PROMO ROW ===== */}
      <div className="marketing-promo-banner">
        <div className="promo-text-content">
          <span className="promo-badge">Corporate Campaign</span>
          <h2>Sleek <strong>Inventory Procurement</strong></h2>
          <h3>Real-time integration connecting wholesale distribution stocks to active digital storefronts.</h3>
          <div className="promo-code-box">
            Active Channel: <strong>B2C Retail Pharmacy</strong>
          </div>
        </div>
        <div className="promo-action-side">
          <button className="promo-shop-btn">View Order History</button>
        </div>
      </div>

      {loading ? (
        <div className="marketplace-loading-state">
          <div className="spinner"></div>
          <p>Re-indexing pharmacy node records...</p>
        </div>
      ) : (
        <div className="catalog-wrapper-view">
          {filteredMedicines.length === 0 ? (
            <div className="empty-catalog-fallback">
              <FaMedkit className="fallback-icon" />
              <h4>No Inventory Matches</h4>
              <p>No item records configured at this node match your character search string.</p>
            </div>
          ) : (
            <div className="medicine-marketplace-grid">
              {filteredMedicines.map((med) => {
                const sellerId = typeof med.ownerId === "object" ? med.ownerId?._id : med.ownerId;
                const cartMatch = currentCartItems.find((i) => i.medicineId === med._id || (i.name === med.name && i.sellerId === sellerId));
                const quantityInCart = cartMatch ? cartMatch.quantity : 0;
                const isOutOfStock = med.stock <= 0;
                
                // DATA PROPERTIES MATCHING MODEL SCHEMA EXACTLY
                const displayMRP = Number(med.mrp || 0);
                const finalCustomerPrice = Number(med.retailPrice || med.price || med.mrp || 0);
                
                // Compute dynamic margins percentage entirely on-the-fly
                const computedDiscount = (displayMRP > finalCustomerPrice && displayMRP > 0)
                  ? Math.round(((displayMRP - finalCustomerPrice) / displayMRP) * 100)
                  : 0;

                return (
                  <div key={med._id} className="customer-medicine-card">
                    <div className="card-media-header">
                      {med.image ? (
                        <img src={med.image} alt={med.name} className="medicine-render-img" />
                      ) : (
                        <div className="fallback-image-placeholder">
                          <FaMedkit className="fallback-med-icon" />
                          <span>No Image Asset Attached</span>
                        </div>
                      )}
                    </div>

                    <div className="card-core-body">
                      <div className="card-top-title-row">
                        <h3 className="med-title-text" title={med.name}>{med.name}</h3>
                        <span className={`stock-status-dot ${isOutOfStock ? 'out' : 'active'}`} title={isOutOfStock ? "Out of Stock" : "In Stock"} />
                      </div>
                      <p className="med-manufacturer-text">{med.company || "Generic Manufacturer"}</p>
                      
                      {/* Product Specifications Sub-Table Container */}
                      <div className="medicine-specs-table">
                        <div className="spec-item">
                          <span className="spec-lbl">Strength</span>
                          <span className="spec-val-highlight green">{med.strength || "N/A"}</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-lbl">Packaging</span>
                          <span className="spec-val-highlight">
                            {med.packSize || 10} Units / {med.packType || "Strip"}
                          </span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-lbl">Classification</span>
                          <span className="spec-val-highlight">{med.type || "Tablet"}</span>
                        </div>
                      </div>

                      {/* Precise Pricing Grid Blocks */}
                      <div className="pricing-matrix-row">
                        <div className="price-points">
                          {computedDiscount > 0 ? (
                            <>
                              <p className="mrp-cross-tag">MRP: <del>₹{displayMRP}</del></p>
                              <p className="selling-price-tag">Price: <strong>₹{finalCustomerPrice}</strong></p>
                            </>
                          ) : (
                            <p className="selling-price-tag" style={{ marginTop: '14px' }}>Price: <strong>₹{finalCustomerPrice}</strong></p>
                          )}
                        </div>
                        {computedDiscount > 0 && (
                          <div className="discount-pill-badge">
                            -{computedDiscount}%
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddProductToCart(med)}
                      disabled={isOutOfStock}
                      className={`add-to-basket-btn-purple ${quantityInCart > 0 ? 'has-items' : ''}`}
                    >
                      <FaShoppingBasket />
                      {quantityInCart > 0 ? `In Cart (${quantityInCart})` : "Add to Basket"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Customer;
