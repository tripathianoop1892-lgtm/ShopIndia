import React, { useEffect, useState } from "react";
import "./Distributor.css";
import {
  deleteMedicine,
  MedicinesList,
  updateMedicine,
} from "../../services/api";
import MedicineImageInput from "../../components/MedicineImageInput/MedicineImageInput";

const toDateInputValue = (value) => {
  if (!value) return "";

  const text = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const toDisplayDate = (value) => {
  const normalized = toDateInputValue(value);
  if (!normalized) return "N/A";
  return new Date(`${normalized}T00:00:00`).toLocaleDateString("en-IN");
};

const getWholesalePrice = (medicine) =>
  Number(medicine.wholesalePrice || medicine.price || 0);

const Distributor = () => {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImageFile, setEditImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const fetchData = async () => {
    try {
      const response = await MedicinesList();
      setMedicines(
        Array.isArray(response?.medicines)
          ? response.medicines
          : Array.isArray(response)
            ? response
            : [],
      );
    } catch (error) {
      console.error("Unable to load distributor medicines:", error);
      setMedicines([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!editingItem) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !saving) setEditingItem(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [editingItem, saving]);

  const filteredData = search
    ? medicines.filter((item) =>
      [item.name, item.type, item.company, item.batch]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search.toLowerCase())),
    )
    : medicines;

  const toggleSelect = (id) => {
    setSelectedMedicines((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const openEditor = (medicine) => {
    setEditingItem(medicine);
    setEditImageFile(null);
    setEditError("");
    setEditForm({
      name: medicine.name ?? "",
      company: medicine.company ?? "",
      type: medicine.type ?? "",
      strength: medicine.strength ?? "",
      batch: medicine.batch ?? "",
      stock: medicine.stock ?? 0,
      packSize: medicine.packSize ?? 1,
      packType: medicine.packType ?? "Strip",
      sellingUnit: medicine.sellingUnit ?? "pack",
      individualSaleAllowed: Boolean(medicine.individualSaleAllowed),
      mfd: toDateInputValue(medicine.mfd),
      expiry: toDateInputValue(medicine.expiry),
      mrp: medicine.mrp ?? 0,
      wholesalePrice: getWholesalePrice(medicine),
      image: medicine.image ?? "",
    });
  };

  const closeEditor = () => {
    if (saving) return;
    setEditingItem(null);
    setEditImageFile(null);
    setEditError("");
  };

  const handleEditChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setEditError("");
  };

  const validateEditForm = () => {
    if (!editForm.name?.trim()) return "Medicine name is required.";
    if (!editForm.expiry) return "Expiry date is required.";
    if (editForm.mfd && new Date(editForm.expiry) <= new Date(editForm.mfd)) {
      return "Expiry date must be after the manufacturing date.";
    }

    const mrp = Number(editForm.mrp);
    const wholesalePrice = Number(editForm.wholesalePrice);
    const stock = Number(editForm.stock);
    const packSize = Number(editForm.packSize);

    if (!Number.isFinite(mrp) || mrp < 0) return "MRP must be zero or greater.";
    if (!Number.isFinite(wholesalePrice) || wholesalePrice < 0) return "Wholesale price must be zero or greater.";
    if (wholesalePrice > mrp) return "Wholesale price cannot exceed MRP.";
    if (!Number.isInteger(stock) || stock < 0) return "Stock must be a whole number of zero or greater.";
    if (!Number.isInteger(packSize) || packSize < 1) return "Pack size must be a whole number of at least 1.";

    return "";
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const validationError = validateEditForm();
    if (validationError) {
      setEditError(validationError);
      return;
    }

    try {
      setSaving(true);
      setEditError("");
      const wholesalePrice = Number(editForm.wholesalePrice);
      const response = await updateMedicine(editingItem._id, {
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
        price: wholesalePrice,
        wholesalePrice,
        image: editForm.image.trim(),
        imageFile: editImageFile,
      });

      if (!response?.success) {
        setEditError(response?.message || "Unable to update medicine.");
        return;
      }

      setEditingItem(null);
      setEditImageFile(null);
      await fetchData();
    } catch (error) {
      console.error("Unable to update medicine:", error);
      setEditError("Unable to send the update. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;

    try {
      const response = await deleteMedicine(id);
      if (!response?.success) {
        alert(response?.message || "Unable to delete medicine.");
        return;
      }
      setSelectedMedicines((current) => current.filter((item) => item !== id));
      await fetchData();
    } catch (error) {
      console.error("Unable to delete medicine:", error);
      alert("Unable to delete medicine. Please try again.");
    }
  };

  return (
    <div className="medicine-container">
      <h2>My Medicines</h2>

      <input
        type="search"
        placeholder="Search medicine..."
        className="search-bar"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="medicine-table-scroll" role="region" aria-label="Medicine inventory table" tabIndex="0">
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Image</th>
              <th>Type</th>
              <th>Wholesale price</th>
              <th>Stock</th>
              <th>MFD</th>
              <th>Expiry</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map((medicine) => (
              <tr key={medicine._id}>
                <td className="medicine-name">
                  <input
                    type="checkbox"
                    checked={selectedMedicines.includes(medicine._id)}
                    onChange={() => toggleSelect(medicine._id)}
                    aria-label={`Select ${medicine.name}`}
                  />
                  {medicine.name}
                </td>
                <td>
                  {medicine.image ? (
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="medicine-list-image"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                    />
                  ) : "—"}
                </td>
                <td>{medicine.type || "N/A"}</td>
                <td>₹{getWholesalePrice(medicine)}</td>
                <td>{medicine.stock}</td>
                <td>{toDisplayDate(medicine.mfd)}</td>
                <td>{toDisplayDate(medicine.expiry)}</td>
                <td className="action-buttons">
                  <button type="button" className="edit-btn" onClick={() => openEditor(medicine)}>Edit</button>
                  {selectedMedicines.includes(medicine._id) && (
                    <button type="button" className="delete-btn" onClick={() => handleDelete(medicine._id)}>Delete</button>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan="8">No Medicines Found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div className="dist-medicine-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeEditor()}>
          <div className="dist-medicine-modal" role="dialog" aria-modal="true" aria-labelledby="dist-edit-title">
            <div className="dist-medicine-modal-header">
              <div>
                <p>Distributor inventory</p>
                <h3 id="dist-edit-title">Edit medicine</h3>
              </div>
              <button type="button" onClick={closeEditor} disabled={saving} aria-label="Close edit form">×</button>
            </div>

            <form className="dist-medicine-edit-form" onSubmit={handleSave}>
              <div className="dist-medicine-modal-body">
                <section className="dist-edit-section">
                  <h4>Medicine details</h4>
                  <div className="dist-edit-grid">
                    <label className="dist-edit-field dist-edit-span-2">Medicine name
                      <input name="name" value={editForm.name} onChange={handleEditChange} required />
                    </label>
                    <label className="dist-edit-field">Company
                      <input name="company" value={editForm.company} onChange={handleEditChange} />
                    </label>
                    <label className="dist-edit-field">Medicine type
                      <input name="type" value={editForm.type} onChange={handleEditChange} placeholder="Tablet, Syrup..." />
                    </label>
                    <label className="dist-edit-field">Strength
                      <input name="strength" value={editForm.strength} onChange={handleEditChange} placeholder="500 mg" />
                    </label>
                    <label className="dist-edit-field">Batch number
                      <input name="batch" value={editForm.batch} onChange={handleEditChange} />
                    </label>
                  </div>
                </section>

                <section className="dist-edit-section">
                  <h4>Stock and packaging</h4>
                  <div className="dist-edit-grid">
                    <label className="dist-edit-field">Stock count
                      <input type="number" name="stock" value={editForm.stock} onChange={handleEditChange} min="0" step="1" required />
                    </label>
                    <label className="dist-edit-field">Units per pack
                      <input type="number" name="packSize" value={editForm.packSize} onChange={handleEditChange} min="1" step="1" required />
                    </label>
                    <label className="dist-edit-field">Pack type
                      <input name="packType" value={editForm.packType} onChange={handleEditChange} placeholder="Strip, Bottle..." />
                    </label>
                    <label className="dist-edit-field">Selling unit
                      <input name="sellingUnit" value={editForm.sellingUnit} onChange={handleEditChange} placeholder="pack, strip..." />
                    </label>
                    <label className="dist-edit-checkbox dist-edit-span-2">
                      <input type="checkbox" name="individualSaleAllowed" checked={editForm.individualSaleAllowed} onChange={handleEditChange} />
                      Allow individual-unit sales
                    </label>
                  </div>
                </section>

                <section className="dist-edit-section">
                  <h4>Dates and wholesale pricing</h4>
                  <div className="dist-edit-grid">
                    <label className="dist-edit-field">Manufacturing date
                      <input type="date" name="mfd" value={editForm.mfd} onChange={handleEditChange} />
                    </label>
                    <label className="dist-edit-field">Expiry date
                      <input type="date" name="expiry" value={editForm.expiry} onChange={handleEditChange} required />
                    </label>
                    <label className="dist-edit-field">MRP (₹)
                      <input type="number" name="mrp" value={editForm.mrp} onChange={handleEditChange} min="0" step="0.01" required />
                    </label>
                    <label className="dist-edit-field">Wholesale price (₹)
                      <input type="number" name="wholesalePrice" value={editForm.wholesalePrice} onChange={handleEditChange} min="0" step="0.01" required />
                    </label>
                    <div className="dist-edit-image dist-edit-span-2">
                      <MedicineImageInput
                        idPrefix="distributor-edit-image"
                        imageUrl={editForm.image}
                        imageFile={editImageFile}
                        onImageUrlChange={(image) => setEditForm((current) => ({ ...current, image }))}
                        onImageFileChange={setEditImageFile}
                      />
                    </div>
                  </div>
                </section>

                {editError && <div className="dist-edit-error" role="alert">{editError}</div>}
              </div>

              <div className="dist-medicine-modal-actions">
                <button type="button" onClick={closeEditor} disabled={saving}>Cancel</button>
                <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save medicine"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributor;
