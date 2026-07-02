import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { MedicinesList, updateMedicine } from "../../services/api";

const ShopkeeperMedicineList = () => {
  const [retailStock, setRetailStock] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Workspace States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    mrp: "",
    discount: "",
    retailPrice: "",
    stock: ""
  });

  useEffect(() => {
    fetchMyStock();
  }, []);

  const fetchMyStock = async () => {
    try {
      setLoading(true);
      const data = await MedicinesList("?source=my-retail-stock");
      setRetailStock(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      mrp: item.mrp || 0,
      discount: item.discount || 0,
      retailPrice: item.retailPrice || item.price || 0,
      stock: item.stock || 0
    });
    setIsEditModalOpen(true);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...editForm, [name]: value };

    if (name === "mrp" || name === "discount") {
      const mrpNum = Number(name === "mrp" ? value : editForm.mrp);
      const discNum = Number(name === "discount" ? value : editForm.discount);
      
      if (!isNaN(mrpNum) && !isNaN(discNum) && discNum >= 0 && discNum <= 100) {
        updatedForm.retailPrice = (mrpNum * (1 - discNum / 100)).toFixed(2);
      }
    }
    setEditForm(updatedForm);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (Number(editForm.retailPrice) > Number(editForm.mrp)) {
      return alert("Retail Price cannot exceed maximum MRP boundary!");
    }

    try {
      const payload = {
        mrp: Number(editForm.mrp),
        discount: Number(editForm.discount),
        retailPrice: Number(editForm.retailPrice),
        price: Number(editForm.retailPrice), 
        stock: Number(editForm.stock)
      };

      const res = await updateMedicine(editingItem._id, payload);
      if (res && res.success) {
        alert("Inventory Updated Successfully ✅");
        setIsEditModalOpen(false);
        fetchMyStock(); 
      } else {
        alert(res?.message || "Error saving changes ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending updates ❌");
    }
  };

  return (
    <div className="sk-container">
      <div className="sk-header-block">
        <h2>📦 Local Shop Retail Inventory</h2>
        <p>These items are visible to consumers searching under your unique Shop ID token.</p>
      </div>

      {loading ? (
        <div className="sk-loading">Syncing retail data sheets...</div>
      ) : (
        <div className="sk-table-card">
          <table className="sk-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Company</th>
                <th>Type</th>
                <th>Current Stock</th> 
                <th>Wholesale Paid</th> 
                <th>Retail Price</th> 
                <th>Expiry Status</th> 
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {retailStock.length === 0 ? (
                <tr>
                  <td colSpan="8" className="sk-empty-text">
                    No inventory active. Place supply bulk requests to populate stock automatically.
                  </td>
                </tr>
              ) : (
                retailStock.map(m => {
                  const isLow = m.stock <= 20;
                  const isExpired = new Date(m.expiry) < new Date();
                  
                  return (
                    <tr key={m._id}>
                      <td className="sk-med-name">{m.name}</td>
                      <td>{m.company || "Generic"}</td> 
                      <td><span className="sk-type-badge">{m.type}</span></td> 
                      <td>
                        <span className={`sk-stock-text ${isLow ? "text-danger" : ""}`}>
                          {m.stock} {isLow && "(Low Stock)"}
                        </span>
                      </td>
                      <td>₹{m.wholesalePrice || 0}</td>
                      <td className="sk-price-text">₹{m.retailPrice || m.price}</td>
                      <td>
                        <span className={`sk-status-pill ${isExpired ? "expired" : "valid"}`}>
                          {new Date(m.expiry).toLocaleDateString()} {isExpired ? "Expired" : "Active"}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button className="sk-action-btn" onClick={() => handleOpenEdit(m)}>
                          Edit Pricing
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 🏙️ SIMPLIFIED EDIT MODAL */}
      {isEditModalOpen && (
        <div className="sk-modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="sk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sk-modal-header">
              <h3>Edit Retail Product Matrix</h3>
              <p>{editingItem?.name} ({editingItem?.strength || "N/A"})</p>
            </div>
            
            <form onSubmit={handleUpdateSubmit}>
              <div className="sk-field">
                <label>Store MRP (₹)</label>
                <input type="number" name="mrp" value={editForm.mrp} onChange={handlePriceChange} required min="0" />
              </div>

              <div className="sk-field">
                <label>Customer Discount (%)</label>
                <input type="number" name="discount" value={editForm.discount} onChange={handlePriceChange} min="0" max="100" />
              </div>

              <div className="sk-field">
                <label>Final Retail Selling Price (₹)</label>
                <input type="number" name="retailPrice" value={editForm.retailPrice} readOnly className="sk-input-readonly" />
              </div>

              <div className="sk-field">
                <label>Current Physical Stock Count</label>
                <input type="number" name="stock" value={editForm.stock} onChange={handlePriceChange} required min="0" />
              </div>

              <div className="sk-modal-foot">
                <button type="button" className="sk-btn-cancel" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="sk-btn-save">Save Metrics</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperMedicineList;