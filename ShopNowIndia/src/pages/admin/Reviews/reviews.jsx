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

  const changeStatus = async (id, status) => {
    const response = await updateReviewState(id, status);
    if (!response.success) return alert(response.message || "Unable to update review.");
    fetchAllReviews();
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    const response = await removeReview(id);
    if (!response.success) return alert(response.message || "Unable to delete review.");
    fetchAllReviews();
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
                <th>Reviewer</th>
                <th>Reviewed item</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.reviewerId?.name || "Unknown"}</td>
                  <td>{review.targetId?.name || review.targetId?.companyName || review.targetModel}</td>
                  <td>{"⭐".repeat(review.rating)}</td>
                  <td>{review.reviewText}</td>
                  <td>
                    <span className={(review.status || "Pending").toLowerCase()}>
                      {review.status}
                    </span>
                  </td>
                  <td><button onClick={() => changeStatus(review._id, "Approved")}>Approve</button><button onClick={() => changeStatus(review._id, "Rejected")}>Reject</button><button onClick={() => deleteReview(review._id)}>Delete</button></td>
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
