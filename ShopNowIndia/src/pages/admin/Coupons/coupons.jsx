import "./Coupons.css";

const coupons = [
  {
    id: 1,
    code: "WELCOME10",
    discount: "10%",
    expiry: "31-12-2026",
    status: "Active",
  },
  {
    id: 2,
    code: "SAVE20",
    discount: "20%",
    expiry: "15-08-2026",
    status: "Active",
  },
  {
    id: 3,
    code: "NEWUSER50",
    discount: "50%",
    expiry: "30-07-2026",
    status: "Expired",
  },
];

const Coupons = () => {
  return (
    <div className="coupons-page">

      <div className="coupons-header">
        <h2>Coupons Management</h2>

        <button className="add-btn">
          + Add Coupon
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Coupon..."
        />
      </div>

      <div className="coupons-table">

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

            {coupons.map((coupon) => (

              <tr key={coupon.id}>

                <td>{coupon.id}</td>

                <td>{coupon.code}</td>

                <td>{coupon.discount}</td>

                <td>{coupon.expiry}</td>

                <td>

                  <span
                    className={
                      coupon.status === "Active"
                        ? "active"
                        : "expired"
                    }
                  >
                    {coupon.status}
                  </span>

                </td>

                <td>

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Coupons;