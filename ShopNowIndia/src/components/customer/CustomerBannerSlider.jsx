import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveBanners } from "../../services/api";
import "./CustomerBannerSlider.css";

const CustomerBannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  useEffect(() => { getActiveBanners().then((response) => setBanners(response?.data || [])).catch(console.error); }, []);
  useEffect(() => {
    if (banners.length < 2) return undefined;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % banners.length), 5000);
    return () => window.clearInterval(timer);
  }, [banners.length]);
  if (!banners.length) return null;
  const banner = banners[current];
  const handleOpen = () => { if (banner.link?.startsWith("/")) navigate(banner.link); else if (banner.link) window.open(banner.link, "_blank", "noopener,noreferrer"); };
  return <section className="customer-banner" aria-label="Promotions">
    <button type="button" className="customer-banner-content" onClick={handleOpen} disabled={!banner.link} style={{ backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.72), rgba(15,23,42,.2)), url(${banner.image})` }}>
      <span>{banner.subtitle}</span><strong>{banner.title}</strong>{banner.link && <em>Explore offer →</em>}
    </button>
    {banners.length > 1 && <div className="customer-banner-dots">{banners.map((item, index) => <button key={item._id} type="button" aria-label={`Show ${item.title}`} className={index === current ? "active" : ""} onClick={() => setCurrent(index)} />)}</div>}
  </section>;
};

export default CustomerBannerSlider;
