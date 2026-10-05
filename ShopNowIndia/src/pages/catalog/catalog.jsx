import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { getPublicCatalog } from "../../services/api";
import "./catalog.css";

const money = (value) => Number(value || 0).toLocaleString("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    getPublicCatalog()
      .then((response) => {
        if (!response?.success) throw new Error(response?.message || "Unable to load medicines.");
        if (active) setItems(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => active && setMessage(error.message || "Unable to load medicines."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const visibleItems = items.filter((item) =>
    [item.name, item.company, item.type, item.strength, item.sellerName]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <main className="public-catalog">
        <header className="catalog-hero">
          <span>Public product information</span>
          <h1>Medicine Catalogue</h1>
          <p>Review currently listed products, pack information, participating pharmacy, and prices in Indian Rupees before creating an account.</p>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by medicine, company, type, or pharmacy"
            aria-label="Search public medicine catalogue"
          />
        </header>

        <section className="catalog-body" aria-live="polite">
          {loading && <p className="catalog-message">Loading current catalogue…</p>}
          {!loading && message && <p className="catalog-message error">{message}</p>}
          {!loading && !message && visibleItems.length === 0 && (
            <p className="catalog-message">No matching retail medicine listing is currently available.</p>
          )}
          <div className="catalog-grid">
            {visibleItems.map((item) => (
              <article className="catalog-card" key={item.id}>
                {item.image && <img src={item.image} alt="" loading="lazy" />}
                <div className="catalog-card-body">
                  <p className="catalog-company">{item.company || "Company not specified"}</p>
                  <h2>{item.name}</h2>
                  <p>{[item.strength, item.type, item.packSize && `${item.packSize} ${item.packType || "units"}`].filter(Boolean).join(" • ")}</p>
                  <p className="catalog-seller">Listed by: {item.sellerName}</p>
                  <div className="catalog-price-row">
                    <strong>{money(item.price)}</strong>
                    {item.mrp > item.price && <span>MRP {money(item.mrp)}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="catalog-notice">
            <strong>Important:</strong> Availability and sale remain subject to pharmacy confirmation, applicable law, and a valid prescription where required. Prices and charges are confirmed before payment. <Link to="/shipping">Delivery policy</Link> · <Link to="/refunds">Refund policy</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Catalog;

