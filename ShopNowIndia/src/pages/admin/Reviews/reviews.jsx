import { useEffect, useState } from "react";
import { getReviews, updateReviewState, removeReview } from "../../../services/api";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReviews = async () => {
    try {
      const response = await getReviews();
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error loading reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleStatusChange = async (id, status) => {
    const res = await updateReviewState(id, status);
    if (res.success) fetchAllReviews();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const res = await removeReview(id);
      if (res.success) fetchAllReviews();
    }
  };

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
      </div>
      
      <div className="reviews-table">
        {loading ? (
          <p>Loading reviews...</p>
        ) : (
          <table>
            <thead>
              <tr>
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
                <tr key={review._id}>
                  <td>{review.customerId?.name || "Unknown"}</td>
                  <td>{review.medicineId?.name || "Unknown"}</td>
                  <td>{"⭐".repeat(review.rating)}</td>
                  <td>{review.reviewText}</td>
                  <td>
                    <span className={review.status.toLowerCase()}>
                      {review.status}
                    </span>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(review._id)}>
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

export default Reviews;