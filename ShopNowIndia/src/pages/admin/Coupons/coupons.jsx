import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCoupon, getCoupons } from "../../../services/api";
import "./Coupons.css";

const Coupons = () => {
  const nav = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await getCoupons();
      if (response.success) {
        setCoupons(response.data || []);
      } else {
        setError(response.message || "Unable to load coupons");
      }
    } catch (err) {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const filteredCoupons = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return coupons;

    return coupons.filter((coupon) => {
      const code = (coupon.code || "").toLowerCase();
      const expiry = (coupon.expiryDate || "").toLowerCase();
      return code.includes(term) || expiry.includes(term);
    });
  }, [coupons, searchTerm]);

  const handleDelete = async (coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;

    try {
      const response = await deleteCoupon(coupon._id || coupon.id);
      if (response.success) {
        await fetchCoupons();
      } else {
        setError(response.message || "Unable to delete coupon");
      }
    } catch (err) {
      setError("Unable to delete coupon");
    }
  };

  return (
    <div className="coupons-page">
      <div className="coupons-header">
        <h2>Coupons Management</h2>

        <button className="add-btn" onClick={() => nav("/admin/coupons/add")}>
          + Add Coupon
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Coupon..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="coupons-table">
        {loading ? (
          <p className="empty-state">Loading coupons...</p>
        ) : filteredCoupons.length === 0 ? (
          <p className="empty-state">No coupons found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCoupons.map((coupon, index) => (
                <tr key={coupon._id || coupon.id}>
                  <td>{index + 1}</td>
                  <td>{coupon.code}</td>
                  <td>
                    {coupon.discountType === "Fixed"
                      ? `₹${coupon.discountValue}`
                      : `${coupon.discountValue}%`}
                  </td>
                  <td>{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : "-"}</td>
                  <td>
                    <span className={coupon.displayStatus === "Active" ? "active" : "expired"}>
                      {coupon.displayStatus || "Active"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => nav("/admin/coupons/add", { state: { coupon } })}
                    >
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(coupon)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Coupons;