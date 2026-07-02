import React, { useState } from "react";
import "./Shopkeeper.css";
import { addMedicine } from "../../services/api";

const AddMedicineShopkeeper = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    type: "",
    strength: "",
    packSize: "",
    packType: "",
    mrp: "",
    offerPrice: "",
    discount: "",
    stock: "",
    batch: "",
    image: "",
    mfgDate: "",
    expDate: ""
  });

  const calculateOfferPrice = (mrpValue, discountValue) => {
    const mrpNumber = Number(mrpValue);
    const discountNumber = Number(discountValue);

    if (mrpValue === "" || discountValue === "" || Number.isNaN(mrpNumber) || Number.isNaN(discountNumber)) {
      return "";
    }

    if (discountNumber < 0 || discountNumber > 100) {
      return "";
    }

    const calculated = mrpNumber * (1 - discountNumber / 100);
    return calculated >= 0 ? calculated.toFixed(2) : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    if (name === "mrp" || name === "discount") {
      updatedForm.offerPrice = calculateOfferPrice(
        name === "mrp" ? value : form.mrp,
        name === "discount" ? value : form.discount
      );
    }
    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.offerPrice) > Number(form.mrp)) {
      return alert("Offer price cannot exceed MRP");
    }
    if (Number(form.discount) < 0 || Number(form.discount) > 100) {
      return alert("Discount must be between 0 and 100");
    }
    if (Number(form.stock) < 0) {
      return alert("Stock cannot be negative");
    }
    if (form.mfgDate && form.expDate && new Date(form.expDate) <= new Date(form.mfgDate)) {
      return alert("Expiry date must be after manufacturing date");
    }

    try {
      const dataToSend = {
        name: form.name,
        company: form.company,
        type: form.type,
        strength: form.strength,
        packSize: Number(form.packSize),
        packType: form.packType,
        mrp: Number(form.mrp),
        offerPrice: Number(form.offerPrice),
        price: Number(form.offerPrice),
        discount: Number(form.discount),
        stock: Number(form.stock),
        batch: form.batch,
        image: form.image,
        mfd: form.mfgDate,
        expiry: form.expDate,
      };

      const res = await addMedicine(dataToSend);

      if (res && res.success) {
        alert("Medicine Added Successfully ✅");
        setForm({
          name: "",
          company: "",
          type: "",
          strength: "",
          packSize: "",
          packType: "",
          mrp: "",
          offerPrice: "",
          discount: "",
          stock: "",
          batch: "",
          image: "",
          mfgDate: "",
          expDate: ""
        });
      } else {
        alert(res?.message || "Error ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding medicine ❌");
    }
  };

  return (
    <div className="main-content">
      <div className="modern-form-container">
        <div className="form-header">
          <div>
            <h1>💊 Add Medicine (Shopkeeper)</h1>
            <p>Fill all medicine details carefully to seed retail inventory</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modern-form-grid">
          <div className="form-group">
            <label>Medicine Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter medicine name" required />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Enter company name" />
          </div>

          <div className="form-group">
            <label>Medicine Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
              <option value="Cream">Cream</option>
              <option value="Drops">Drops</option>
            </select>
          </div>

          <div className="form-group">
            <label>Medicine Image URL</label>
            <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="Paste image url" />
          </div>

          <div className="form-group">
            <label>Strength</label>
            <input type="text" name="strength" value={form.strength} onChange={handleChange} placeholder="650mg" />
          </div>

          <div className="form-group">
            <label>Pack Size</label>
            <input type="number" name="packSize" value={form.packSize} onChange={handleChange} placeholder="10" />
          </div>

          <div className="form-group">
            <label>Pack Type</label>
            <select name="packType" value={form.packType} onChange={handleChange}>
              <option value="">Select Pack Type</option>
              <option value="Strip">Strip</option>
              <option value="Bottle">Bottle</option>
              <option value="Box">Box</option>
            </select>
          </div>

          <div className="form-group">
            <label>MRP ₹</label>
            <input type="number" name="mrp" value={form.mrp} onChange={handleChange} placeholder="Enter MRP" />
          </div>

          <div className="form-group">
            <label>Discount %</label>
            <input type="number" name="discount" value={form.discount} onChange={handleChange} placeholder="Discount" />
          </div>

          <div className="form-group">
            <label>Retail Selling Price ₹</label>
            <input type="number" name="offerPrice" value={form.offerPrice} onChange={handleChange} placeholder="Offer Price" readOnly />
            <small style={{ color: '#64748b', marginTop: '6px', display: 'block' }}>Auto-calculated retail cost for consumers.</small>
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />
          </div>

          <div className="form-group">
            <label>Batch Number</label>
            <input type="text" name="batch" value={form.batch} onChange={handleChange} placeholder="Batch Number" />
          </div>

          <div className="form-group">
            <label>Manufacturing Date</label>
            <input type="date" name="mfgDate" value={form.mfgDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Expiry Date</label>
            <input type="date" name="expDate" value={form.expDate} onChange={handleChange} required />
          </div>

          <div className="form-button">
            <button type="submit">Add Medicine</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineShopkeeper;