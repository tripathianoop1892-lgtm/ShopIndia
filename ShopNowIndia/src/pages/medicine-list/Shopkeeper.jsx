import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";

import {
  MedicinesList,
  addToCart
} from "../../services/api";

const ShopkeeperMedicineList = () => {

  // ALL MEDICINES
  const [medicines, setMedicines] = useState([]);

  // CUSTOMER QUANTITY
  const [qty, setQty] = useState({});

  // FETCH MEDICINES
  const fetchMedicines = async () => {

    try {

      // API CALL
      const res = await MedicinesList();

      // DATA
      const data = res?.data || [];

      console.log("MEDICINES =", data);

      setMedicines(data);

    } catch (error) {

      console.log(error);

    }
  };

  // PAGE LOAD
  useEffect(() => {

    fetchMedicines();

  }, []);

  // QUANTITY CHANGE
  const handleQtyChange = (id, value) => {

    setQty({
      ...qty,
      [id]: value
    });
  };

  // ADD TO CART
  const handleAddToCart = async (medicine) => {

    try {

      const quantity = qty[medicine._id] || 1;

      const cartData = {

        medicineId: medicine._id,

        name: medicine.name,

        company: medicine.company,

        image: medicine.image,

        price: medicine.offerPrice || medicine.price,

        quantity: Number(quantity),

        type: medicine.type,
      };

      await addToCart(cartData);

      alert("Added To Cart ✅");

    } catch (error) {

      console.log(error);

      alert("Error ❌");

    }
  };

  return (

    <div className="shopkeeper-container">

      {/* PAGE TITLE */}
      <h2 className="page-title">
        Available Medicines
      </h2>

      {/* GRID */}
      <div className="medicine-grid">

        {medicines.length > 0 ? (

          medicines.map((med) => (

            <div
              className="medicine-card"
              key={med._id}
            >

              {/* IMAGE */}
              <img
                src={med.image}
                alt={med.name}
                className="medicine-image"
              />

              {/* NAME */}
              <h3>{med.name}</h3>

              {/* COMPANY */}
              <p className="company-name">
                {med.company}
              </p>

              {/* TYPE */}
              <p>
                {med.type}
              </p>

              {/* STRENGTH */}
              <p>
                {med.strength}
              </p>

              {/* PACK */}
              <p>
                {med.packSize} {med.packType}
              </p>

              {/* PRICE */}
              <div className="price-box">

                <span className="offer-price">
                  ₹{med.offerPrice}
                </span>

                <span className="mrp">
                  ₹{med.mrp}
                </span>

              </div>

              {/* DISCOUNT */}
              <p className="discount">
                {med.discount}% OFF
              </p>

              {/* QUANTITY */}
              <div className="qty-section">

                <label>
                  Customer Qty
                </label>

                <input
                  type="number"
                  min="1"
                  value={qty[med._id] || 1}
                  onChange={(e) =>
                    handleQtyChange(
                      med._id,
                      e.target.value
                    )
                  }
                />

              </div>

              {/* BUTTON */}
              <button
                className="cart-btn"
                onClick={() =>
                  handleAddToCart(med)
                }
              >
                Add To Cart
              </button>

            </div>

          ))

        ) : (

          <h3>
            No Medicines Available
          </h3>

        )}

      </div>

    </div>
  );
};

export default ShopkeeperMedicineList;