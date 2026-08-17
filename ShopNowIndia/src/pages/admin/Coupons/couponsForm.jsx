import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCoupon, updateCoupon } from "../../../services/api";
import "./CouponsForm.css";

const initialCoupon = {
  code: "",
  discountType: "Percentage",
  discountValue: "",
  minOrder: "",
  expiryDate: "",
  status: "active",
  maxUsagePerUser: 1,
  maxTotalUsage: "",
};

const CouponsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(initialCoupon);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.coupon) {
      const selectedCoupon = location.state.coupon;
      setCoupon({
        code: selectedCoupon.code || "",
        discountType: selectedCoupon.discountType || "Percentage",
        discountValue: selectedCoupon.discountValue || "",
        minOrder: selectedCoupon.minOrder || "",
        expiryDate: selectedCoupon.expiryDate
          ? new Date(selectedCoupon.expiryDate).toISOString().slice(0, 10)
          : "",
        status: selectedCoupon.status || "active",
        maxUsagePerUser: selectedCoupon.maxUsagePerUser || 1,
        maxTotalUsage: selectedCoupon.maxTotalUsage ?? "",
      });
      setIsEditing(true);
    } else {
      setCoupon(initialCoupon);
      setIsEditing(false);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setCoupon({
      ...coupon,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      code: coupon.code.trim(),
      discountType: coupon.discountType,
      discountValue: Number(coupon.discountValue),
      minOrder: Number(coupon.minOrder || 0),
      expiryDate: coupon.expiryDate,
      status: coupon.status,
      maxUsagePerUser: Number(coupon.maxUsagePerUser),
      maxTotalUsage:
      coupon.maxTotalUsage === "" ? null : Number(coupon.maxTotalUsage),
    };

    try {
      setSaving(true);
      const response = isEditing
        ? await updateCoupon(location.state?.coupon?._id || location.state?.coupon?.id, payload)
        : await createCoupon(payload);

      if (response.success) {
        navigate("/admin/coupons");
      } else {
        setError(response.message || "Unable to save coupon");
      }
    } catch (err) {
      setError("Unable to save coupon");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="coupon-form-page">
      <div className="coupon-form-card">
        <h2>{isEditing ? "Edit Coupon" : "Add New Coupon"}</h2>

        {error && <p className="error-message">{error}</p>}

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
            <select name="discountType" value={coupon.discountType} onChange={handleChange}>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
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
            <label>Maximum Usage Per User</label>
            <input
              type="number"
              name="maxUsagePerUser"
              min="1"
              value={coupon.maxUsagePerUser}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Maximum Total Usage</label>
            <input
              type="number"
              name="maxTotalUsage"
              placeholder="Leave empty for unlimited"
              value={coupon.maxTotalUsage}
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
            <select name="status" value={coupon.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : isEditing ? "Update Coupon" : "Save Coupon"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/coupons")}
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