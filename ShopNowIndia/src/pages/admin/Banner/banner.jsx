import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBanner, getBanners } from "../../../services/api";
import "./Banner.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const load = async () => { const response = await getBanners(); setBanners(response?.data || []); };
  useEffect(() => { getBanners().then((response) => setBanners(response?.data || [])).catch(console.error); }, []);
  const filtered = useMemo(() => banners.filter((banner) => banner.title.toLowerCase().includes(search.toLowerCase())), [banners, search]);
  const remove = async (id) => { if (!window.confirm("Delete this banner?")) return; const response = await deleteBanner(id); if (!response.success) return alert(response.message || "Unable to delete banner."); load(); };
  return <section className="banner-page">
    <div className="banner-header"><h2>Banner Management</h2><button className="add-btn" onClick={() => navigate("/admin/banner/add")}>+ Add Banner</button></div>
    <div className="search-box"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search banner..." /></div>
    <div className="banner-table"><table><thead><tr><th>Banner Image</th><th>Title</th><th>Status</th><th>Action</th></tr></thead><tbody>
      {filtered.map((banner) => <tr key={banner._id}><td>{banner.image && <img src={banner.image} alt={banner.title} className="banner-image" />}</td><td>{banner.title}</td><td><span className={banner.status === "Active" ? "active" : "inactive"}>{banner.status}</span></td><td><button className="edit-btn" onClick={() => navigate("/admin/banner/add", { state: { banner } })}>Edit</button><button className="delete-btn" onClick={() => remove(banner._id)}>Delete</button></td></tr>)}
      {!filtered.length && <tr><td colSpan="4">No banners found.</td></tr>}
    </tbody></table></div>
  </section>;
};

export default Banner;
