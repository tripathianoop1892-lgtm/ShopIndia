import React, { useState } from "react";
import "./CouponsForm.css";

const CouponsForm = () => {
  const [coupon, setCoupon] = useState({
    code: "",
    discountType: "Percentage",
    discountValue: "",
    minOrder: "",
    expiryDate: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setCoupon({
      ...coupon,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(coupon);

    alert("Coupon Added Successfully!");

    setCoupon({
      code: "",
      discountType: "Percentage",
      discountValue: "",
      minOrder: "",
      expiryDate: "",
      status: "Active",
    });
  };

  return (
    <div className="coupon-form-page">
      <div className="coupon-form-card">

        <h2>Add New Coupon</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Coupon Code</label>
            <input
              type="text"
              name="code"
              placeholder="Enter Coupon Code"
              value={coupon.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Discount Type</label>

            <select
              name="discountType"
              value={coupon.discountType}
              onChange={handleChange}
            >
              <option>Percentage</option>
              <option>Fixed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Discount Value</label>

            <input
              type="number"
              name="discountValue"
              placeholder="Enter Discount"
              value={coupon.discountValue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Minimum Order Amount</label>

            <input
              type="number"
              name="minOrder"
              placeholder="Enter Minimum Order"
              value={coupon.minOrder}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Expiry Date</label>

            <input
              type="date"
              name="expiryDate"
              value={coupon.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={coupon.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="button-group">

            <button type="submit" className="save-btn">
              Save Coupon
            </button>

            <button
              type="reset"
              className="cancel-btn"
              onClick={() =>
                setCoupon({
                  code: "",
                  discountType: "Percentage",
                  discountValue: "",
                  minOrder: "",
                  expiryDate: "",
                  status: "Active",
                })
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CouponsForm;