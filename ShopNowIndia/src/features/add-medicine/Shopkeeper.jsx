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

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

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

        // PRICE
        price: Number(form.offerPrice),

        discount: Number(form.discount),

        stock: Number(form.stock),

        batch: form.batch,

        image: form.image,

        // FIXED
        mfd: form.mfgDate,

        expiry: form.expDate,
      };
      console.log(dataToSend);
<<<<<<< HEAD
      if (
  Number(form.offerPrice) >
  Number(form.mrp)
) {
  return alert(
    "Offer price cannot exceed MRP"
  );
}

if (
  Number(form.discount) < 0 ||
  Number(form.discount) > 100
) {
  return alert(
    "Discount must be between 0 and 100"
  );
}

if (
  Number(form.stock) < 0
) {
  return alert(
    "Stock cannot be negative"
  );
}

if (
  form.mfgDate &&
  form.expDate &&
  new Date(form.expDate) <=
    new Date(form.mfgDate)
) {
  return alert(
    "Expiry date must be after manufacturing date"
  );
}
=======
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
      const res = await addMedicine(dataToSend);

      const responseData = res?.data || res;

      if (responseData.success) {

        alert("Medicine Added Successfully ✅");

        // RESET FORM
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

        alert(responseData.message || "Error ❌");
      }

    } catch (error) {

      console.log(error);

      console.log(error.response);

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (

    <div className="main-content">

      <div className="modern-form-container">

        {/* HEADER */}
        <div className="form-header">

          <div>

            <h1>
              💊 Add Medicine
            </h1>

            <p>
              Fill all medicine details carefully
            </p>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="modern-form-grid"
        >

          {/* NAME */}
          <div className="form-group">

            <label>
              Medicine Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter medicine name"
              required
            />

          </div>

          {/* COMPANY */}
          <div className="form-group">

            <label>
              Company
            </label>

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />

          </div>

          {/* TYPE */}
          <div className="form-group">

            <label>
              Medicine Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >

              <option value="">
                Select Type
              </option>

              <option value="Tablet">
                Tablet
              </option>

              <option value="Capsule">
                Capsule
              </option>

              <option value="Syrup">
                Syrup
              </option>

              <option value="Injection">
                Injection
              </option>

              <option value="Cream">
                Cream
              </option>

              <option value="Drops">
                Drops
              </option>

            </select>

          </div>

          {/* IMAGE */}
          <div className="form-group">

            <label>
              Medicine Image URL
            </label>

            <input
<<<<<<< HEAD
              type="url"
=======
              type="text"
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Paste image url"
            />

          </div>

          {/* STRENGTH */}
          <div className="form-group">

            <label>
              Strength
            </label>

            <input
              type="text"
              name="strength"
              value={form.strength}
              onChange={handleChange}
              placeholder="650mg"
            />

          </div>

          {/* PACK SIZE */}
          <div className="form-group">

            <label>
              Pack Size
            </label>

            <input
              type="number"
              name="packSize"
              value={form.packSize}
              onChange={handleChange}
              placeholder="10 / 15 / 20"
            />

          </div>

          {/* PACK TYPE */}
          <div className="form-group">

            <label>
              Pack Type
            </label>

            <select
              name="packType"
              value={form.packType}
              onChange={handleChange}
            >

              <option value="">
                Select Pack Type
              </option>

              <option value="Strip">
                Strip
              </option>

              <option value="Bottle">
                Bottle
              </option>

              <option value="Box">
                Box
              </option>

            </select>

          </div>

          {/* MRP */}
          <div className="form-group">

            <label>
              MRP ₹
            </label>

            <input
              type="number"
              name="mrp"
              value={form.mrp}
              onChange={handleChange}
              placeholder="Enter MRP"
            />

          </div>

          {/* OFFER PRICE */}
          <div className="form-group">

            <label>
              Offer Price ₹
            </label>

            <input
              type="number"
              name="offerPrice"
              value={form.offerPrice}
              onChange={handleChange}
              placeholder="Offer Price"
            />

          </div>

          {/* DISCOUNT */}
          <div className="form-group">

            <label>
              Discount %
            </label>

            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="Discount"
            />

          </div>

          {/* STOCK */}
          <div className="form-group">

            <label>
              Stock Quantity
            </label>

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
            />

          </div>

          {/* BATCH */}
          <div className="form-group">

            <label>
              Batch Number
            </label>

            <input
              type="text"
              name="batch"
              value={form.batch}
              onChange={handleChange}
              placeholder="Batch Number"
            />

          </div>

          {/* MFG DATE */}
          <div className="form-group">

            <label>
              Manufacturing Date
            </label>

            <input
              type="date"
              name="mfgDate"
              value={form.mfgDate}
              onChange={handleChange}
            />

          </div>

          {/* EXPIRY DATE */}
          <div className="form-group">

            <label>
              Expiry Date
            </label>

            <input
              type="date"
              name="expDate"
              value={form.expDate}
              onChange={handleChange}
              required
            />

          </div>

          {/* BUTTON */}
          <div className="form-button">

            <button type="submit">

              Add Medicine

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddMedicineShopkeeper;