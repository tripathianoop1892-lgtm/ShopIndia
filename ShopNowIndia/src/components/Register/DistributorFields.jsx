import React from "react";
import "./DistributorFields.css";

import {
  FaBuilding,
  FaIdCard,
  FaFileMedical,
  FaWarehouse,
} from "react-icons/fa";

const DistributorFields = ({ form, handleChange }) => {
  return (
    <div className="distributor-container">

      <h3>Distributor Information</h3>

      <div className="distributor-grid">

        <div className="input-box">
          <FaBuilding className="icon" />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
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
          <FaWarehouse className="icon" />
          <textarea
            name="warehouseAddress"
            placeholder="Warehouse Address"
            value={form.warehouseAddress}
            onChange={handleChange}
          />
        </div>

      </div>

    </div>
  );
};

export default DistributorFields;