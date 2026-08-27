import { useState } from "react";
import "./Customer.css";
import { useEffect } from "react";
import { getCustomers } from "../../../services/api";


const Customer = () => {
  const [customers, setCustomers] =useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async ()=>{
    try{
      const response = await getCustomers();
      setCustomers(response)
      console.log(response)
    }catch(err){
      console.error("Error featching customers", err)
    }
    }

    fetchCustomers();
  }, [])
  return (
    <div className="customer-page">

      <div className="page-header">
        <h2>Customers</h2>

      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>City</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {customers.filter((customer) => [customer.name, customer.mobile, customer.email, customer.city].filter(Boolean).some((value) => value.toLowerCase().includes(search.toLowerCase()))).map((customer) => (

              <tr key={customer._id}>

                <td>{customer._id}</td>
                <td>{customer.name}</td>
                <td>{customer.mobile}</td>
                <td>{customer.email}</td>
                <td>{customer.city}</td>

                <td>
                  <span
                    className={
                      customer.status === "Active"
                        ? "active"
                        : "pending"
                    }
                  >
                    {customer.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Customer;
