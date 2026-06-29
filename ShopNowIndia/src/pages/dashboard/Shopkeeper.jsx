<<<<<<< HEAD
import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Shopkeeper.css";
import { MedicinesList, getOrders, addToCart } from "../../services/api";
import { shortId } from "../../utils/helpers";
import { FaSearch, FaMedkit, FaBoxes, FaRupeeSign, FaStore, FaChevronRight } from "react-icons/fa";

const Shopkeeper = () => {
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [search, setSearch] = useState("");
  const [medSearch, setMedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // 🚀 CRITICAL FIX: Pass "b2b-purchases" to get wholesale expenses instead of retail customer sales
      const [medData, orderData] = await Promise.all([
        MedicinesList(), 
        getOrders("b2b-purchases") 
      ]);
      setMedicines(Array.isArray(medData) ? medData : []);
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (err) {
      console.error("Error fetching B2B procurement dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🏢 1. EXTRACT UNIQUE DISTRIBUTORS STRICTLY FILTERED BY ROLE
  const distributors = useMemo(() => {
    const distributorMap = new Map();

    medicines.forEach((m) => {
      const rawOwnerId = m.ownerId && typeof m.ownerId === "object" ? m.ownerId._id : m.ownerId;

      if (rawOwnerId && m.ownerRole === "distributor") {
        if (!distributorMap.has(rawOwnerId)) {
          const resolvedName = 
            (m.ownerId && typeof m.ownerId === "object" && m.ownerId.name) ||
            m.ownerName || 
            m.distributorName || 
            m.owner?.name || 
            `Distributor Wholesaler (${shortId(rawOwnerId)})`;

          distributorMap.set(rawOwnerId, {
            id: rawOwnerId,
            role: m.ownerRole,
            name: resolvedName
          });
        }
      }
    });

    return Array.from(distributorMap.values());
  }, [medicines]);

  // 🔍 2. FILTER DISTRIBUTORS BY SEARCH INPUT
  const filteredDistributors = useMemo(() => {
    const query = search.toLowerCase().trim();
    return distributors.filter((d) => d.name.toLowerCase().includes(query));
  }, [distributors, search]);

  // 📦 3. FILTER MEDICINES MATCHING THE SELECTED DISTRIBUTOR ID
  const filteredMedicines = useMemo(() => {
    if (!selectedDistributor) return [];
    const query = medSearch.toLowerCase().trim();
    
    return medicines.filter((m) => {
      const rawOwnerId = m.ownerId && typeof m.ownerId === "object" ? m.ownerId._id : m.ownerId;
      const matchesDistributor = rawOwnerId === selectedDistributor.id && m.ownerRole === "distributor";
      const matchesSearch = !query || m.name?.toLowerCase().includes(query);
      return matchesDistributor && matchesSearch;
    });
  }, [medicines, selectedDistributor, medSearch]);

  const buyMedicine = async (med) => {
    try {
      const rawOwnerId = med.ownerId && typeof med.ownerId === "object" ? med.ownerId._id : med.ownerId;

      const res = await addToCart({
        medicineId: med._id,
        name: med.name,
        company: med.company, 
        ownerId: rawOwnerId, 
        ownerRole: med.ownerRole,
        type: med.type,
        price: med.offerPrice || med.price || 0,
        quantity: 1,
        image: med.image,
        strength: med.strength,
        packSize: med.packSize,
        expiry: med.expiry || "2027-12-31"
      });

      if (res.success || res._id || res.message === undefined) {
        alert(`${med.name} Added to Procurement Cart ✅`);
      } else {
        alert(res.message || "Failed to append item to cart");
      }
    } catch (err) {
      console.error("Procurement cart dispatch failure:", err);
      alert("Network exception. Failed to contact supply cart service.");
    }
  };

  const metrics = useMemo(() => {
    // Only calculate expenses for approved or delivered orders if preferred, or all requests combined:
    const validProcurements = orders.filter(o => o.status === "Approved" || o.status === "Delivered" || o.status === "Pending");
    
    return {
      totalMedicines: medicines.filter(m => m.ownerRole === "distributor").length,
      lowStock: medicines.filter((m) => m.ownerRole === "distributor" && Number(m.stock) <= 20).length,
      expenses: validProcurements.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0)
    };
  }, [medicines, orders]);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h3>Loading System Ledger Datasets...</h3>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">🏪 Shopkeeper Dashboard</h2>
          <p className="dashboard-subtitle">Select a verified distributor node to source supply inventory items</p>
        </div>
        <div className="dashboard-badge">
          📦 {orders.length} History Orders
        </div>
      </div>

      {/* STATS AREA */}
      <div className="stats-flex-container">
        <div className="stat-card blue">
          <div className="stat-card-header">
            <p>Wholesale Catalog Stock</p>
            <FaMedkit className="card-icon" />
          </div>
          <h3>{metrics.totalMedicines} Items</h3>
        </div>

        <div className="stat-card green">
          <div className="stat-card-header">
            <p>Marketplace Critical Items</p>
            <FaBoxes className="card-icon" />
          </div>
          <h3>{metrics.lowStock}</h3>
        </div>

        <div className="stat-card orange">
          <div className="stat-card-header">
            <p>Verified Distributors</p>
            <FaStore className="card-icon" />
          </div>
          <h3>{distributors.length} Firms</h3>
        </div>

        <div className="stat-card purple">
          <div className="stat-card-header">
            <p>Procurement Expenses</p>
            <FaRupeeSign className="card-icon" />
          </div>
          <h3>₹{metrics.expenses.toLocaleString('en-IN')}</h3>
        </div>
      </div>

      {/* FLEX REPLACEMENT FOR THE DUAL COLUMN WORKFLOW AREA */}
      <div className="procurement-flex-workflow">
        
        {/* STEP 1: DISTRIBUTORS SIDEBAR */}
        <div className="sidebar-section">
          <div className="section-header-row">
            <h3>🏢 1. Choose Distributor</h3>
            <div className="inline-search-box">
              <FaSearch className="inline-search-icon" />
              <input
                type="text"
                placeholder="Filter wholesale firms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredDistributors.length === 0 ? (
            <p className="empty-text">No verified distributors found matching query.</p>
          ) : (
            <div className="distributor-list-group">
              {filteredDistributors.map((dist) => (
                <div 
                  key={dist.id} 
                  className={`distributor-list-item ${selectedDistributor?.id === dist.id ? 'active-item' : ''}`}
                  onClick={() => {
                    setSelectedDistributor(dist);
                    setMedSearch(""); 
                  }}
                >
                  <div className="distributor-avatar">
                    <FaStore />
                  </div>
                  <div className="distributor-meta-details">
                    <h4>{dist.name}</h4>
                    <p style={{ textTransform: 'uppercase', fontSize: '10px', color: '#10b981', fontWeight: 'bold', margin: 0 }}>
                      Verified {dist.role}
                    </p>
                  </div>
                  <FaChevronRight className="arrow-indicator" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STEP 2: AVAILABLE STOCKS CONTROLLER */}
        <div className="content-section">
          {selectedDistributor ? (
            <>
              <div className="section-header-row">
                <h3>📦 2. Available Stocks: <span className="highlight-text">{selectedDistributor.name}</span></h3>
                <div className="inline-search-box">
                  <FaSearch className="inline-search-icon" />
                  <input
                    type="text"
                    placeholder="Filter drugs from this seller..."
                    value={medSearch}
                    onChange={(e) => setMedSearch(e.target.value)}
                  />
                </div>
              </div>

              {filteredMedicines.length === 0 ? (
                <div className="empty-state">
                  <p className="empty-text">No inventory items offered by this distributor match your parameters.</p>
                </div>
              ) : (
                <div className="medicine-cards-wrap">
                  {filteredMedicines.map((m) => (
                    <div key={m._id} className="medicine-card">
                      <div className="medicine-image-box">
                        <img
                          src={m.image || "https://cdn-icons-png.flaticon.com/512/822/822143.png"}
                          alt={m.name}
                          className="medicine-image"
                        />
                      </div>

                      <div className="medicine-info">
                        <h4 title={m.name}>{m.name}</h4>
                        <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 6px 0" }}>Mfg: {m.company || "N/A"}</p>
                        <div className="medicine-tags">
                          <span>{m.strength || "500mg"}</span>
                          <span>{m.packSize || 10} Tabs</span>
                        </div>

                        <div className="price-box">
                          <h3>₹{m.offerPrice || m.price}</h3>
                          {m.mrp && <del>₹{m.mrp}</del>}
                        </div>

                        <div className="stock-row">
                          <span className={`stock-status-pill ${Number(m.stock) <= 20 ? 'alert-pill' : 'normal-pill'}`}>
                            Available: {m.stock} units
                          </span>
                        </div>

                        <button className="buy-btn" onClick={() => buyMedicine(m)}>
                          Order Supplies
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="fallback-selection-state">
              <div className="prompt-illustration">📦</div>
              <h4>No Distributor Selected</h4>
              <p>Please select an authorized distribution agency from the left index panel to inspect itemized pricing arrays.</p>
            </div>
          )}
        </div>

      </div>
=======
import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { MedicinesList, getOrders } from "../../services/api";

const Shopkeeper = () => {

  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const medData = await MedicinesList();
      const orderData = await getOrders();

      setMedicines(Array.isArray(medData) ? medData : []);
      setOrders(Array.isArray(orderData) ? orderData : []);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 SEARCH
  const filteredMedicines = medicines.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 🛒 BUY
  const buyMedicine = async (med) => {
    try {

      await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({
          name: med.name,
          company: med.company,
          type: med.type,
          price: med.offerPrice || med.price,
          stock: 1,
          image: med.image,
          strength: med.strength,
          packSize: med.packSize,
          expiry:med.expiry || "2027-12-31"
        }),
      });

      alert("Medicine Added To Stock ✅");

    } catch (err) {
      console.log(err);
    }
  };

  // 📊 DASHBOARD CARDS
  const totalMedicines = medicines.length;

  const lowStock =
    medicines.filter((m) => m.stock <= 20).length;

  const earnings =
    orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <div id="div1">
          <h2 className="dashboard-title">
            💊 Shopkeeper Dashboard
          </h2>

          <p className="dashboard-subtitle">
            Manage medicines & orders easily
          </p>
        </div>

        <div className="dashboard-badge">
          📦 {orders.length} Orders
        </div>

      </div>

      {/* SEARCH */}
      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search medicines..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card blue">
          <p>Total Medicines</p>
          <h3>{totalMedicines}</h3>
        </div>

        <div className="stat-card green">
          <p>Low Stock</p>
          <h3>{lowStock}</h3>
        </div>

        <div className="stat-card orange">
          <p>Orders</p>
          <h3>{orders.length}</h3>
        </div>

        <div className="stat-card purple">
          <p>Earnings</p>
          <h3>₹{earnings}</h3>
        </div>

      </div>

      {/* MEDICINES */}
      <div className="section">

        <div className="section-header">
          <h3>💊 Available Medicines</h3>
        </div>

        {filteredMedicines.length === 0 ? (

          <p className="empty-text">
            No medicines found
          </p>

        ) : (

          <div className="medicine-grid">

            {filteredMedicines.map((m) => (

              <div
                key={m._id}
                className="medicine-card"
              >

                {/* IMAGE */}
                <div className="medicine-image-box">

                  <img
                    src={
                      m.image ||
                      "https://cdn-icons-png.flaticon.com/512/822/822143.png"
                    }
                    alt={m.name}
                    className="medicine-image"
                  />

                </div>

                {/* INFO */}
                <div className="medicine-info">

                  <h4>
                    {m.name}
                  </h4>

                  <p className="company">
                    {m.company}
                  </p>

                  <div className="medicine-tags">

                    <span>
                      {m.strength || "500mg"}
                    </span>

                    <span>
                      {m.packSize || 10} Tablets
                    </span>

                  </div>

                  <div className="price-box">

                    <h3>
                      ₹{m.offerPrice || m.price}
                    </h3>

                    {m.mrp && (
                      <del>
                        ₹{m.mrp}
                      </del>
                    )}

                  </div>

                  <div className="stock-row">

                    <span>
                      Stock:
                      {m.stock}
                    </span>

                    {m.discount && (
                      <span className="discount">
                        {m.discount}% OFF
                      </span>
                    )}

                  </div>

                  <button
                    className="buy-btn"
                    onClick={() =>
                      buyMedicine(m)
                    }
                  >
                    Add To Cart
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </div>
  );
};

export default Shopkeeper;