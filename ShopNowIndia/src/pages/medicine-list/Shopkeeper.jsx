import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { MedicinesList, updateMedicine } from "../../services/api";

const toDateInputValue = (value) => {
  if (!value) return "";
  const text = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const calculateDiscount = (mrp, retailPrice) => {
  const mrpNumber = Number(mrp);
  const retailNumber = Number(retailPrice);
  if (mrpNumber <= 0 || !Number.isFinite(retailNumber)) return 0;
  return Math.max(0, Math.min(100, Number((100 - (retailNumber / mrpNumber) * 100).toFixed(2))));
};

const ShopkeeperMedicineList = () => {
  const [retailStock, setRetailStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchMyStock();
  }, []);

  useEffect(() => {
    if (!isEditModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !saving) setIsEditModalOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isEditModalOpen, saving]);

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

  const closeModal = () => {
    if (saving) return;
    setIsEditModalOpen(false);
    setEditingItem(null);
    setFormError("");
  };

  const handleOpenEdit = (item) => {
    const retailPrice = Number(item.retailPrice ?? item.price ?? 0);

    setEditingItem(item);
    setEditForm({
      name: item.name ?? "",
      company: item.company ?? "",
      type: item.type ?? "",
      strength: item.strength ?? "",
      batch: item.batch ?? "",
      stock: item.stock ?? 0,
      packSize: item.packSize ?? 1,
      packType: item.packType ?? "Strip",
      sellingUnit: item.sellingUnit ?? "strip",
      individualSaleAllowed: Boolean(item.individualSaleAllowed),
      mfd: toDateInputValue(item.mfd),
      expiry: toDateInputValue(item.expiry),
      mrp: item.mrp ?? 0,
      discount: calculateDiscount(item.mrp, retailPrice),
      retailPrice,
      image: item.image ?? "",
    });
    setFormError("");
    setIsEditModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setEditForm((current) => {
      const updated = { ...current, [name]: nextValue };

      if (name === "mrp" || name === "discount") {
        const mrp = Number(name === "mrp" ? value : current.mrp);
        const discount = Number(name === "discount" ? value : current.discount);
        if (Number.isFinite(mrp) && Number.isFinite(discount) && discount >= 0 && discount <= 100) {
          updated.retailPrice = Number((mrp * (1 - discount / 100)).toFixed(2));
        }
      }

      if (name === "retailPrice") {
        updated.discount = calculateDiscount(current.mrp, value);
      }

      return updated;
    });
    setFormError("");
  };

  const validateForm = () => {
    if (!editForm.name?.trim()) return "Medicine name is required.";
    if (!editForm.expiry) return "Expiry date is required.";
    if (editForm.mfd && new Date(editForm.expiry) <= new Date(editForm.mfd)) {
      return "Expiry date must be after the manufacturing date.";
    }

    const mrp = Number(editForm.mrp);
    const retailPrice = Number(editForm.retailPrice);
    const stock = Number(editForm.stock);
    const packSize = Number(editForm.packSize);

    if (!Number.isFinite(mrp) || mrp < 0) return "MRP must be zero or greater.";
    if (!Number.isFinite(retailPrice) || retailPrice < 0) return "Retail price must be zero or greater.";
    if (retailPrice > mrp) return "Retail price cannot exceed MRP.";
    if (!Number.isInteger(stock) || stock < 0) return "Stock must be a whole number of zero or greater.";
    if (!Number.isInteger(packSize) || packSize < 1) return "Pack size must be a whole number of at least 1.";

    return "";
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      const payload = {
        name: editForm.name.trim(),
        company: editForm.company.trim(),
        type: editForm.type.trim(),
        strength: editForm.strength.trim(),
        batch: editForm.batch.trim(),
        stock: Number(editForm.stock),
        packSize: Number(editForm.packSize),
        packType: editForm.packType.trim(),
        sellingUnit: editForm.sellingUnit.trim(),
        individualSaleAllowed: editForm.individualSaleAllowed,
        mfd: editForm.mfd,
        expiry: editForm.expiry,
        mrp: Number(editForm.mrp),
        retailPrice: Number(editForm.retailPrice),
        image: editForm.image.trim(),
      };

      const response = await updateMedicine(editingItem._id, payload);
      if (!response?.success) {
        setFormError(response?.message || "Unable to save the medicine.");
        return;
      }

      setIsEditModalOpen(false);
      setEditingItem(null);
      await fetchMyStock();
    } catch (err) {
      console.error(err);
      setFormError("Unable to send the update. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="sk-container">
      <div className="sk-header-block">
        <h2>📦 Local Shop Retail Inventory</h2>
        <p>Manage the medicines customers can buy from your shop.</p>
      </div>

      {loading ? (
        <div className="sk-loading">Syncing retail inventory...</div>
      ) : (
        <div className="sk-table-card" role="region" aria-label="Retail medicine inventory" tabIndex="0">
          <table className="sk-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Company</th>
                <th>Type</th>
                <th>Current Stock</th>
                <th>Wholesale Paid</th>
                <th>MRP</th>
                <th>Retail Price</th>
                <th>Expiry Status</th>
                <th className="sk-actions-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {retailStock.length === 0 ? (
                <tr>
                  <td colSpan="9" className="sk-empty-text">
                    No inventory active. Place supply orders to populate your stock.
                  </td>
                </tr>
              ) : (
                retailStock.map((medicine) => {
                  const isLow = Number(medicine.stock) <= 20;
                  const expiryDate = medicine.expiry ? new Date(medicine.expiry) : null;
                  const isExpired = expiryDate && expiryDate < new Date();

                  return (
                    <tr key={medicine._id}>
                      <td className="sk-med-name">
                        {medicine.name}
                        {medicine.strength && <span className="sk-med-meta">{medicine.strength}</span>}
                      </td>
                      <td>{medicine.company || "Generic"}</td>
                      <td><span className="sk-type-badge">{medicine.type || "N/A"}</span></td>
                      <td>
                        <span className={`sk-stock-text ${isLow ? "text-danger" : ""}`}>
                          {medicine.stock ?? 0} {isLow && "(Low Stock)"}
                        </span>
                      </td>
                      <td>₹{Number(medicine.wholesalePrice || 0).toLocaleString("en-IN")}</td>
                      <td className="sk-mrp-text">₹{Number(medicine.mrp || 0).toLocaleString("en-IN")}</td>
                      <td className="sk-price-text">
                        ₹{Number(medicine.retailPrice ?? medicine.price ?? 0).toLocaleString("en-IN")}
                      </td>
                      <td>
                        {expiryDate ? (
                          <span className={`sk-status-pill ${isExpired ? "expired" : "valid"}`}>
                            {expiryDate.toLocaleDateString("en-IN")} {isExpired ? "Expired" : "Active"}
                          </span>
                        ) : "N/A"}
                      </td>
                      <td className="sk-actions-cell">
                        <button type="button" className="sk-action-btn" onClick={() => handleOpenEdit(medicine)}>
                          Edit medicine
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

      {isEditModalOpen && (
        <div className="sk-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <div className="sk-modal sk-modal-wide" role="dialog" aria-modal="true" aria-labelledby="sk-edit-title">
            <div className="sk-modal-header">
              <div>
                <h3 id="sk-edit-title">Edit medicine</h3>
                <p>Update all customer-facing inventory details.</p>
              </div>
              <button type="button" className="sk-modal-close" onClick={closeModal} aria-label="Close edit form">×</button>
            </div>

            <form onSubmit={handleUpdateSubmit}>
              <section className="sk-form-section">
                <h4>Medicine details</h4>
                <div className="sk-edit-grid">
                  <div className="sk-field sk-span-2">
                    <label htmlFor="sk-name">Medicine name</label>
                    <input id="sk-name" name="name" value={editForm.name} onChange={handleInputChange} required />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-company">Company</label>
                    <input id="sk-company" name="company" value={editForm.company} onChange={handleInputChange} />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-type">Medicine type</label>
                    <input id="sk-type" name="type" value={editForm.type} onChange={handleInputChange} placeholder="Tablet, Syrup..." />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-strength">Strength</label>
                    <input id="sk-strength" name="strength" value={editForm.strength} onChange={handleInputChange} placeholder="500 mg" />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-batch">Batch number</label>
                    <input id="sk-batch" name="batch" value={editForm.batch} onChange={handleInputChange} />
                  </div>
                </div>
              </section>

              <section className="sk-form-section">
                <h4>Stock and packaging</h4>
                <div className="sk-edit-grid">
                  <div className="sk-field">
                    <label htmlFor="sk-stock">Stock count</label>
                    <input id="sk-stock" type="number" name="stock" value={editForm.stock} onChange={handleInputChange} required min="0" step="1" />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-pack-size">Units per pack</label>
                    <input id="sk-pack-size" type="number" name="packSize" value={editForm.packSize} onChange={handleInputChange} required min="1" step="1" />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-pack-type">Pack type</label>
                    <input id="sk-pack-type" name="packType" value={editForm.packType} onChange={handleInputChange} placeholder="Strip, Bottle..." />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-selling-unit">Selling unit</label>
                    <input id="sk-selling-unit" name="sellingUnit" value={editForm.sellingUnit} onChange={handleInputChange} placeholder="strip, tablet..." />
                  </div>
                  <label className="sk-checkbox-field sk-span-2">
                    <input type="checkbox" name="individualSaleAllowed" checked={editForm.individualSaleAllowed} onChange={handleInputChange} />
                    Allow this medicine to be sold as individual units
                  </label>
                </div>
              </section>

              <section className="sk-form-section">
                <h4>Dates and retail pricing</h4>
                <div className="sk-edit-grid">
                  <div className="sk-field">
                    <label htmlFor="sk-mfd">Manufacturing date</label>
                    <input id="sk-mfd" type="date" name="mfd" value={editForm.mfd} onChange={handleInputChange} />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-expiry">Expiry date</label>
                    <input id="sk-expiry" type="date" name="expiry" value={editForm.expiry} onChange={handleInputChange} required />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-mrp">MRP (₹)</label>
                    <input id="sk-mrp" type="number" name="mrp" value={editForm.mrp} onChange={handleInputChange} required min="0" step="0.01" />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-discount">Customer discount (%)</label>
                    <input id="sk-discount" type="number" name="discount" value={editForm.discount} onChange={handleInputChange} min="0" max="100" step="0.01" />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-retail-price">Retail selling price (₹)</label>
                    <input id="sk-retail-price" type="number" name="retailPrice" value={editForm.retailPrice} onChange={handleInputChange} required min="0" step="0.01" />
                  </div>
                  <div className="sk-field">
                    <label htmlFor="sk-wholesale-price">Wholesale price paid (₹)</label>
                    <input id="sk-wholesale-price" value={editingItem?.wholesalePrice ?? 0} readOnly className="sk-input-readonly" />
                    <small>Set by the distributor order and cannot be changed here.</small>
                  </div>
                  <div className="sk-field sk-span-2">
                    <label htmlFor="sk-image">Medicine image URL</label>
                    <input id="sk-image" name="image" value={editForm.image} onChange={handleInputChange} placeholder="https://example.com/medicine.jpg" />
                  </div>
                </div>
              </section>

              {formError && <div className="sk-form-error" role="alert">{formError}</div>}

              <div className="sk-modal-foot">
                <button type="button" className="sk-btn-cancel" onClick={closeModal} disabled={saving}>Cancel</button>
                <button type="submit" className="sk-btn-save" disabled={saving}>
                  {saving ? "Saving..." : "Save medicine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperMedicineList;
