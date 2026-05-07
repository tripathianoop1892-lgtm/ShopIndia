import React, { useState } from "react";
import "./Shopkeeper.css";
import { addMedicine } from "../../services/api"; // ✅ ADD THIS

const AddMedicineShopkeeper = () => {
  const [form, setForm] = useState({
    company: "",
    type: "",
    price: "",
    stock: "",
    batch: "",
    mfg: "",
    exp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Backend ke format me convert
    const dataToSend = {
      name: form.company,   // backend me name hai
      stock: form.stock,
      expiry: form.exp,
    };

    try {
      const res = await addMedicine(dataToSend);
      console.log(res);

      alert("Medicine Added Successfully ✅");

      setForm({
        company: "",
        type: "",
        price: "",
        stock: "",
        batch: "",
        mfg: "",
        exp: "",
      });
    } catch (err) {
      console.log(err);
      alert("Error adding medicine ❌");
    }
  };

  return (
    <div className="main-content">
      <h2>Add Medicine</h2>

      <form className="medicine-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange} required>
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
          <option value="Solution">Solution</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="batch"
          placeholder="Batch No"
          value={form.batch}
          onChange={handleChange}
          required
        />

        <label>MFG Date</label>
        <input
          type="date"
          name="mfg"
          value={form.mfg}
          onChange={handleChange}
          required
        />

        <label>EXP Date</label>
        <input
          type="date"
          name="exp"
          value={form.exp}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicineShopkeeper;