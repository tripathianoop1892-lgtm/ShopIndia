import React, { useState } from "react";
import "./Distributor.css";
import { addMedicine } from "../../services/api";

const AddMedicine = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        name: form.name,
        company: form.company,
        type: form.type,
        price: Number(form.price) || 0,
        stock: Number(form.stock),
        batch: form.batch,
        mfd: form.mfgDate,
        expiry: form.expDate,
      };

      const res = await addMedicine(dataToSend);

      if (res.success) {
        alert("Medicine Added ✅");
      } else {
        alert(res.message || "Error ❌");
      }

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

    } catch (error) {
      console.error(error);
      alert("Error adding medicine ❌");
    }
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <h2>Add Medicine</h2>

        <form onSubmit={handleSubmit} className="form-grid">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Medicine Name"
            required
          />

          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
            <option value="Drops">Drops</option>
            <option value="Cream">Cream</option>
            <option value="Ointment">Ointment</option>
            <option value="Gel">Gel</option>
            <option value="Powder">Powder</option>
            <option value="Inhaler">Inhaler</option>
            <option value="Spray">Spray</option>
          </select>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />

          <input
            type="text"
            name="batch"
            value={form.batch}
            onChange={handleChange}
            placeholder="Batch"
          />

          {/* 🔥 DATE FIELDS WITH LABEL */}
          <div className="date-group">

            <div className="date-field">
              <label>MFG Date</label>
              <input
                type="date"
                name="mfgDate"
                value={form.mfgDate}
                onChange={handleChange}
              />
            </div>

            <div className="date-field">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expDate"
                value={form.expDate}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button type="submit">Add Medicine</button>

        </form>
      </div>
    </div>
  );
};

export default AddMedicine;