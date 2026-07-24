import { useState } from "react";
import { getShopkeeper } from "../../../services/api";
import "./shopkeeper.css";
import { useEffect } from "react";

const Shopkeeper = () => {
  
    const [shopkeeper, setShopkeeper] =useState([]);
  
    useEffect(() => {
      const fetchShopkeeper = async ()=>{
      try{
        const response = await getShopkeeper();
        setShopkeeper(response)
        console.log(response)
      }catch(err){
        console.error("Error featching shopkeepers", err)
      }
      }
       fetchShopkeeper();
  }, [])
  return (
    <div className="shopkeeper-page">

      <div className="page-header">
        <h2>Shopkeepers</h2>

        <button className="add-btn">
          + Add Shopkeeper
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Shopkeeper..."
        />
      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Shop Name</th>
              <th>Owner</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {shopkeeper.map((shop) => (

              <tr key={shop.id}>

                <td>{shop._id}</td>
                <td>{shop.shopName}</td>
                <td>{shop.name}</td>
                <td>{shop.mobile}</td>
                <td>{shop.city}</td>

                <td>
                  <span
                    className={
                      shop.status === "Active"
                        ? "active"
                        : "pending"
                    }
                  >
                    {shop.status}
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

export default Shopkeeper;