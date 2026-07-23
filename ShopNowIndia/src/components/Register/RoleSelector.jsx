import React from "react";
import "./RoleSelector.css";

import {
  FaUser,
  FaStore,
  FaTruck
} from "react-icons/fa";

const RoleSelector = ({ form, setForm }) => {

  const changeRole = (role) => {
    setForm({
      ...form,
      role,
    });
  };

  return (

    <div className="role-container">

      <h3>Select Your Role</h3>

      <div className="role-grid">

        <div
          className={
            form.role === "customer"
              ? "role-card active"
              : "role-card"
          }
          onClick={() => changeRole("customer")}
        >

          <FaUser className="role-icon" />

          <h4>Customer</h4>

          <p>Buy Medicines</p>

        </div>

        <div
          className={
            form.role === "shopkeeper"
              ? "role-card active"
              : "role-card"
          }
          onClick={() => changeRole("shopkeeper")}
        >

          <FaStore className="role-icon" />

          <h4>Shopkeeper</h4>

          <p>Medical Store</p>

        </div>

        <div
          className={
            form.role === "distributor"
              ? "role-card active"
              : "role-card"
          }
          onClick={() => changeRole("distributor")}
        >

          <FaTruck className="role-icon" />

          <h4>Distributor</h4>

          <p>Medicine Supplier</p>

        </div>

      </div>

    </div>

  );

};

export default RoleSelector;