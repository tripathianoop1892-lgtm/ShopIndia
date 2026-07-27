import React, { useState } from "react";
import "./BannerForm.css";

const BannerForm = () => {
  const [banner, setBanner] = useState({
    title: "",
    status: "Active",
    image: null,
    preview: "",
  });

  const handleChange = (e) => {
    setBanner({
      ...banner,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBanner({
        ...banner,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(banner);

    alert("Banner Added Successfully!");

    setBanner({
      title: "",
      status: "Active",
      image: null,
      preview: "",
    });
  };

  return (
    <div className="banner-form-page">

      <div className="banner-form-card">

        <h2>Add New Banner</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Banner Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Banner Title"
              value={banner.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              required
            />
          </div>

          {banner.preview && (
            <div className="image-preview">
              <img src={banner.preview} alt="Preview" />
            </div>
          )}

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={banner.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="btn-group">
            <button type="submit" className="save-btn">
              Save Banner
            </button>

            <button
              type="reset"
              className="cancel-btn"
              onClick={() =>
                setBanner({
                  title: "",
                  status: "Active",
                  image: null,
                  preview: "",
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

export default BannerForm;