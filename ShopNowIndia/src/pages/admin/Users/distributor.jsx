import { useState } from "react";
import { getDistributors } from "../../../services/api";
import "./Distributor.css";
import { useEffect } from "react";

const Distributors = () => {
  
    const [distributor, setDistributor] =useState([]);
  
    useEffect(() => {
      const fetchDistributor = async ()=>{
      try{
        const response = await getDistributors();
        setDistributor(response)
        console.log(response)
      }catch(err){
        console.error("Error featching distributors", err)
      }
      }
       fetchDistributor();
  }, [])
  return (
    <div className="distributor-page">

      <div className="page-header">
        <h2>Distributors</h2>

        <button className="add-btn">
          + Add Distributor
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Distributor..."
        />
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Owner</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {distributor.map((item) => (

              <tr key={item.id}>

                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.owner}</td>
                <td>{item.mobile}</td>
                <td>{item.city}</td>

                <td>
                  <span
                    className={
                      item.status === "Active"
                        ? "active"
                        : "pending"
                    }
                  >
                    {item.status}
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

export default Distributors;