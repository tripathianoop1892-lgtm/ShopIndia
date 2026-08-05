import { useEffect } from "react";
import "./Categories.css";
//import { getCategorySummary } from "../../../../../backend/src/controllers/admin.controller"; //
import { useState } from "react";
//import { use } from "react"; //
import { useMemo } from "react";



const Categories = () => {
  const [categories,setCategories]= useState([]);
  const [searchTerm,setSearchTerm]= useState("");
  const [loading,setLoading]= useState(true);
  const [error, setError] = useState("");

  useEffect(() =>{
    const fetchCategories = async ()=>{
      try{
        setLoading(true);
        const response = await getCategorySummary();
        setCategories(Array.isArray(response)? response : []);

      }catch(error){
        setError("Unabale to load category Summery");
      }finally{
        setLoading(false);
      }
    }
    fetchCategories();
  },[]);

  const filteredCategories=useMemo(()=>{
    const term = searchTerm.trim().toLowerCase();
    if(!term) return categories;
    return categories.filter((item) =>{
      const category=(item.category || ""). toLowerCase ();
      return category.includes(term);
    });
  },[categories, searchTerm]);


  
  return (
    <div className="categories-page">

      <div className="categories-header">
        <h2>Medicine Categories</h2>

       
        
        
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Category..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {error && <p className="error-">{"error"} </p>}

      <div className="categories-table">
       {loading?(
        <p className="empaty-state">Loading Categories... </p>
       ) : filteredCategories.length === 0 ?(
         <p className="empaty-state">No Categories found. </p>
       ):(
       
        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Total Medicines</th>
              
            </tr>
          </thead>

          <tbody>

            { filteredCategories.map((item, index) => (

              <tr key={`${item.category}-${index}`}>

                <td>{index+1}</td>

                <td>{item.category || "uncategorized"}</td>

                <td>{item.totalMedicine || 0}</td>

             

              </tr>

            ))}

          </tbody>

        </table>
       )}

      </div>

    </div>
  );
};


export default Categories;