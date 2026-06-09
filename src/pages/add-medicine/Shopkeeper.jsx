import React, { useState } from "react";
import "./Shopkeeper.css";

const AddMedicine = () => {

  // ✅ STATE
  const [form, setForm] = useState({
    name: "",
    company: "",
    type: "",
    price: "",
    stock: "",
    batch: "",
    mfgDate: "",
    expDate: ""
  });

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("medicines")) || [];

    const updatedData = [...oldData, form];

    localStorage.setItem("medicines", JSON.stringify(updatedData));

    alert("Medicine Added Successfully ✅");

    // RESET FORM
    setForm({
      name: "",
      company: "",
      type: "",
      price: "",
      stock: "",
      batch: "",
      mfgDate: "",
      expDate: ""
    });
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <h2>Add Medicine</h2>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit} className="form-grid">

          <div className="field">
            <label>Medicine Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div className="field">
            <label>Company Name</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="field">
            <label>Medicine Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option>Tablet</option>
              <option>Syrup</option>
              <option>Injection</option>
              <option>Capsule</option>
              <option>Ointment</option>
              <option>Drops</option>
              <option>Inhaler</option>
              <option>Powder</option>
            </select>
          </div>

          <div className="field">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          <div className="field">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Enter stock"
            />
          </div>

          <div className="field">
            <label>Batch No</label>
            <input
              type="text"
              name="batch"
              value={form.batch}
              onChange={handleChange}
              placeholder="Enter batch number"
            />
          </div>

          <div className="field">
            <label>Manufacturing Date</label>
            <input
              type="date"
              name="mfgDate"
              value={form.mfgDate}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expDate"
              value={form.expDate}
              onChange={handleChange}
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="add-btn">
            Add Medicine
          </button>

        </form>
        {/* ✅ FORM END */}

      </div>
    </div>
  );
};

export default AddMedicine;