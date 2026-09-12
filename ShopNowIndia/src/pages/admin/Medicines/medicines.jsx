import { useState } from "react";
import { asList, getMedicine } from "../../../services/api";
import "./Medicines.css";
import { useEffect } from "react";


const Medicines = () => {
      const [medicines, setMedicines] =useState([]);
      const [search, setSearch] = useState("");
    
      useEffect(() => {
        const fetchMedicines = async ()=>{
        try{
          const response = await getMedicine();
          setMedicines(asList(response, ["medicines"]));
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

      <div className="search-box">
          <input
            type="text"
            placeholder="Search Medicine..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
      </div>
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
            </tr>
          </thead>

          <tbody>

            {medicines.filter((medicine) => [medicine.name, medicine.packType, medicine.company].filter(Boolean).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))).map((medicine) => (

              <tr key={medicine._id}>

                <td>{medicine._id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.packType}</td>
                <td>{medicine.company}</td>
                <td>{medicine.price}</td>
                <td>{medicine.stock}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Medicines;
