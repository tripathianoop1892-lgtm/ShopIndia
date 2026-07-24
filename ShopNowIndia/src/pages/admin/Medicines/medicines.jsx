import { useState } from "react";
import { getMedicine } from "../../../services/api";
import "./Medicines.css";
import { useEffect } from "react";


const Medicines = () => {
      const [medicines, setMedicines] =useState([]);
    
      useEffect(() => {
        const fetchMedicines = async ()=>{
        try{
          const response = await getMedicine();
          setMedicines(response)
          console.log(response)
        }catch(err){
          console.error("Error featching medicines", err)
        }
        }
         fetchMedicines();
    }, [])
  return (
    <div className="medicine-page">

      <div className="page-header">
        <h2>Medicines</h2>

        <button className="add-btn">
          + Add Medicine
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Medicine..."
        />
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine</th>
              <th>Category</th>
              <th>Company</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {medicines.map((medicine) => (

              <tr key={medicine.id}>

                <td>{medicine._id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.packType}</td>
                <td>{medicine.company}</td>
                <td>{medicine.price}</td>
                <td>{medicine.stock}</td>

                <td>
                  <span
                    className={
                      medicine.status === "Available"
                        ? "available"
                        : "low-stock"
                    }
                  >
                    {medicine.status}
                  </span>
                </td>

                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Medicines;