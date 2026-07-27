import { useNavigate } from "react-router-dom";
import "./Banner.css";


const banners = [
  {
    id: 1,
    title: "Monsoon Offer",
    image: "https://via.placeholder.com/120x70",
    status: "Active",
  },
  {
    id: 2,
    title: "Diwali Sale",
    image: "https://via.placeholder.com/120x70",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Health Care Week",
    image: "https://via.placeholder.com/120x70",
    status: "Active",
  },
];

const Banner = () => {
  const nav = useNavigate();
  const handleForm =() => {
    nav("/admin/banner/add")
  }
  return (
    <div className="banner-page">

      <div className="banner-header">
        <h2>Banner Management</h2>

        <button className="add-btn" onClick={handleForm}>
          + Add Banner
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Banner..."
        />
      </div>

      <div className="banner-table">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Banner Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {banners.map((banner) => (

              <tr key={banner.id}>

                <td>{banner.id}</td>

                <td>
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="banner-image"
                  />
                </td>

                <td>{banner.title}</td>

                <td>

                  <span
                    className={
                      banner.status === "Active"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {banner.status}
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

export default Banner;