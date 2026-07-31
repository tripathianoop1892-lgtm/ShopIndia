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
              <option value="Drops">Drops</option>
              <option value="Ointment">Ointment</option>
              <option value="Cream">Cream</option>
              <option value="Gel">Gel</option>
              <option value="Lotion">Lotion</option>
              <option value="Powder">Powder</option>
              <option value="Spray">Spray</option>
              <option value="Inhaler">Inhaler</option>
              <option value="Suspension">Suspension</option>
              <option value="Solution">Solution</option>
              <option value="Soap">Medicated Soap</option>
              <option value="Shampoo">Medicated Shampoo</option>
              <option value="Patch">Transdermal Patch</option>
              <option value="Suppository">Suppository</option>
              <option value="Eye Drops">Eye Drops</option>
              <option value="Ear Drops">Ear Drops</option>
              <option value="Nasal Drops">Nasal Drops</option>
              <option value="Softgel">Softgel Capsule</option>
              <option value="Chewable Tablet">Chewable Tablet</option>
              <option value="Dispersible Tablet">Dispersible Tablet</option>
              <option value="Effervescent Tablet">Effervescent Tablet</option>
              <option value="Mouth Dissolving Tablet">Mouth Dissolving Tablet (MD)</option>
              <option value="Lozenge">Lozenge</option>
              <option value="Mouthwash">Mouthwash</option>
              <option value="Oral Gel">Oral Gel</option>
              <option value="Oral Paste">Oral Paste</option>
              <option value="Nebulizer Solution">Nebulizer Solution</option>
              <option value="Respules">Respules</option>
              <option value="Infusion">Infusion</option>
              <option value="IV Fluid">IV Fluid</option>
              <option value="Vaccine">Vaccine</option>
              <option value="Ampoule">Ampoule</option>
              <option value="Vial">Vial</option>
              <option value="Sachet">Sachet</option>
              <option value="Granules">Granules</option>
              <option value="Oral Powder">Oral Powder</option>
              <option value="Dental Gel">Dental Gel</option>
              <option value="Dental Cream">Dental Cream</option>
              <option value="Liniment">Liniment</option>
              <option value="Foam">Foam</option>
              <option value="Medicated Wipes">Medicated Wipes</option>
              <option value="Enema">Enema</option>
              <option value="Pessary">Pessary</option>
              <option value="Implant">Implant</option>
              <option value="Kit">Kit</option>
              <option value="Medical Device">Medical Device</option>
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
                <option value="Strip">Strip</option>
                <option value="Bottle">Bottle</option>
                <option value="Box">Box</option>
                <option value="Tube">Tube</option>
                <option value="Jar">Jar</option>
                <option value="Vial">Vial</option>
                <option value="Ampoule">Ampoule</option>
                <option value="Sachet">Sachet</option>
                <option value="Pouch">Pouch</option>
                <option value="Blister Pack">Blister Pack</option>
                <option value="Carton">Carton</option>
                <option value="Can">Can</option>
                <option value="Tin">Tin</option>
                <option value="Bag">Bag</option>
                <option value="Bottle with Dropper">Bottle with Dropper</option>
                <option value="Pump Bottle">Pump Bottle</option>
                <option value="Roll-On">Roll-On</option>
                <option value="Spray Bottle">Spray Bottle</option>
                <option value="Kit">Kit</option>
                <option value="Single Unit">Single Unit</option>
                </select>
                   </div>
                {form.packType === "Bottle" && (
                <div className="form-group">
               <label>Bottle Size</label>
               <select
               name="bottleSize"
               value={form.bottleSize}
               onChange={handleChange}
              >
            <option value="">Select Bottle Size</option>
            <option value="30 ml">30 ml</option>
            <option value="60 ml">60 ml</option>
            <option value="100 ml">100 ml</option>
            <option value="200 ml">200 ml</option>
           </select>
                 </div>
                         )}

            {form.packType === "Tube" && (
            <div className="form-group">
            <label>Tube Size</label>
            <select
            name="tubeSize"
            value={form.tubeSize}
            onChange={handleChange}
                 >
           <option value="">Select Tube Size</option>
           <option value="10 g">10 g</option>
           <option value="15 g">15 g</option>
           <option value="30 g">30 g</option>
           <option value="50 g">50 g</option>
            </select>
                 </div>
                    )}

           {(form.packType === "Vial" || form.packType === "Ampoule") && (
           <div className="form-group">
           <label>Volume</label>
          <select
          name="volume"
          value={form.volume}
          onChange={handleChange}
          >
          <option value="">Select Volume</option>
          <option value="1 ml">1 ml</option>
          <option value="2 ml">2 ml</option>
          <option value="5 ml">5 ml</option>
          <option value="10 ml">10 ml</option>
          </select>
          </div>
            )}

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