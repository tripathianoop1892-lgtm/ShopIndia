import "./Reviews.css";

const reviews = [
  {
    id: 1,
    customer: "Anoop Tripathi",
    medicine: "Paracetamol 650",
    rating: 5,
    review: "Very Good Service",
    status: "Approved",
  },
  {
    id: 2,
    customer: "Rahul Sharma",
    medicine: "Dolo 650",
    rating: 4,
    review: "Fast Delivery",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Priya Singh",
    medicine: "Vitamin C",
    rating: 2,
    review: "Late Delivery",
    status: "Rejected",
  },
];

const Reviews = () => {
  return (
    <div className="reviews-page">

      <div className="reviews-header">
        <h2>Customer Reviews</h2>

        <button className="add-btn">
          View All
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Review..."
        />
      </div>

      <div className="reviews-table">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Medicine</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {reviews.map((review) => (

              <tr key={review.id}>

                <td>{review.id}</td>

                <td>{review.customer}</td>

                <td>{review.medicine}</td>

                <td>{"⭐".repeat(review.rating)}</td>

                <td>{review.review}</td>

                <td>

                  <span
                    className={
                      review.status === "Approved"
                        ? "approved"
                        : review.status === "Pending"
                        ? "pending"
                        : "rejected"
                    }
                  >
                    {review.status}
                  </span>

                </td>

                <td>

                  <button className="approve-btn">
                    Approve
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

export default Reviews;