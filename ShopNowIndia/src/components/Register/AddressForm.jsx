import React from "react";
import "./AddressForm.css";

import {
  FaMapMarkerAlt,
  FaCity,
  FaMailBulk
} from "react-icons/fa";

const AddressForm = ({ form, handleChange }) => {

  return (

    <div className="address-container">

      <h3>Address Information</h3>

      <div className="address-grid">

        <div className="input-box">

          <FaMapMarkerAlt className="icon"/>

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
          />

        </div>

        <div className="input-box">

          <FaMapMarkerAlt className="icon"/>

          <input
            type="text"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
          />

        </div>

        <div className="input-box">

          <FaCity className="icon"/>

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

        </div>

        <div className="input-box">

          <FaMailBulk className="icon"/>

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
          />

        </div>

        <div className="input-box full">

          <FaMapMarkerAlt className="icon"/>

          <textarea
            name="address"
            placeholder="Complete Address"
            value={form.address}
            onChange={handleChange}
          />

        </div>

      </div>

    </div>

  );

};

export default AddressForm;