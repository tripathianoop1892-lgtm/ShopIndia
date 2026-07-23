import React from "react";
import "./ShopkeeperFields.css";

import {
  FaStore,
  FaIdCard,
  FaFileMedical,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ShopkeeperFields = ({ form, handleChange }) => {
  return (
    <div className="shopkeeper-container">

      <h3>Shop Information</h3>

      <div className="shop-grid">

        <div className="input-box">
          <FaStore className="icon" />
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={form.shopName}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaIdCard className="icon" />
          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            value={form.gstNumber}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaFileMedical className="icon" />
          <input
            type="text"
            name="drugLicense"
            placeholder="Drug License Number"
            value={form.drugLicense}
            onChange={handleChange}
          />
        </div>

        <div className="input-box full">
          <FaMapMarkerAlt className="icon" />
          <textarea
            name="shopAddress"
            placeholder="Shop Address"
            value={form.shopAddress}
            onChange={handleChange}
          />
        </div>

      </div>

    </div>
  );
};

export default ShopkeeperFields;