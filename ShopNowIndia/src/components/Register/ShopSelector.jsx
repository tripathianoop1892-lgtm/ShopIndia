import React, { useState } from "react";
import "./ShopSelector.css";

import { FaStore, FaSearch, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import { searchShops } from "../../services/api";

const ShopSelector = ({ form, setForm }) => {
  const [search, setSearch] = useState("");
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      setShops([]);
      return;
    }

    try {
      setLoading(true);

      const res = await searchShops(value);

      if (res.success) {
        setShops(res.shops || []);
      } else {
        setShops([]);
      }
    } catch (error) {
      console.log("SHOP SEARCH ERROR:", error);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);

    setForm({
      ...form,
      shopId: shop.shopId,
    });

    setSearch(shop.shopName || "");
    setShops([]);
  };

  return (
    <div className="shop-selector-container">

      <h3>
        <FaStore className="shop-title-icon" />
        Select Your Medical Shop
      </h3>

      <p className="shop-selector-subtitle">
        Search by Shop Name / Mobile / Email
      </p>

      <div className="shop-search-box">

        <FaSearch className="shop-search-icon" />

        <input
          type="text"
          placeholder="Search medical shop..."
          value={search}
          onChange={handleSearch}
        />

      </div>

      {loading && (
        <p className="shop-search-status">
          Searching medical shops...
        </p>
      )}

      {!loading && search.trim() && shops.length === 0 && (
        <p className="shop-search-status">
          No medical shop found.
        </p>
      )}

      {shops.length > 0 && (
        <div className="shop-results">

          {shops.map((shop) => (
            <div
              className="shop-result-card"
              key={shop._id}
            >

              <div className="shop-result-info">

                <h4>
                  <FaStore />
                  {shop.shopName}
                </h4>

                <p>
                  <FaPhoneAlt />
                  {shop.mobile || "Mobile not available"}
                </p>

                <p>
                  <FaEnvelope />
                  {shop.email || "Email not available"}
                </p>

                <span className="shop-id">
                  Shop ID: {shop.shopId}
                </span>

              </div>

              <button
                type="button"
                className="select-shop-btn"
                onClick={() => handleSelectShop(shop)}
              >
                Select
              </button>

            </div>
          ))}

        </div>
      )}

      {selectedShop && (
        <div className="selected-shop">

          <div>
            <strong>Selected Medical Shop</strong>

            <p>
              {selectedShop.shopName}
            </p>

            <span>
              Shop ID: {selectedShop.shopId}
            </span>
          </div>

          <span className="selected-check">
            ✓
          </span>

        </div>
      )}

    </div>
  );
};

export default ShopSelector;