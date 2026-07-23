import React, { useState } from "react";
import "./Register.css";

import RegisterForm from "../../components/Register/RegisterForm";
import AddressForm from "../../components/Register/AddressForm";
import RoleSelector from "../../components/Register/RoleSelector";
import ShopkeeperFields from "../../components/Register/ShopkeeperFields";
import DistributorFields from "../../components/Register/DistributorFields";

import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

   const navigate = useNavigate();

   const [form,setForm]=useState({
      name:"",
      mobile:"",
      email:"",
      password:"",
      confirmPassword:"",
      role:"customer",

      state:"",
      district:"",
      city:"",
      pincode:"",
      address:"",

      shopName:"",
      gstNumber:"",
      drugLicense:"",

      companyName:"",
      warehouseAddress:""
   });

   const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value});
   }

   const handleRegister=async()=>{

      if(form.password!==form.confirmPassword){
          alert("Password not match");
          return;
      }

      const res=await registerUser(form);

      if(res.success){
          alert("Registered Successfully");
          navigate("/");
      }else{
          alert(res.message);
      }

   }

   return(

      <div className="register-page">

          <div className="left-panel">

    <h1>
        Welcome to
        <br />
        <span>OmSanjeevni</span>
    </h1>

    <p>
        India's Smart Medicine Supply Platform
    </p>

    <img
        src="/images/register.png"
        alt="Register"
    />

    <div className="features">
        <p>✔ Easy Registration</p>
        <p>✔ Verified Medicines</p>
        <p>✔ Fast Delivery</p>
        <p>✔ Trusted Shopkeepers</p>
        <p>✔ Direct Distributor Network</p>
    </div>

</div>

          <div className="right-panel">

              <RegisterForm
                   form={form}
                   handleChange={handleChange}
              />

              <RoleSelector
                   form={form}
                   setForm={setForm}
              />

              <AddressForm
                    form={form}
                    handleChange={handleChange}
              />

              {form.role==="shopkeeper" &&
                   <ShopkeeperFields
                       form={form}
                       handleChange={handleChange}
                   />
              }

              {form.role==="distributor" &&
                   <DistributorFields
                       form={form}
                       handleChange={handleChange}
                   />
              }

              <button
                className="register-btn"
                onClick={handleRegister}
              >
                   Register
              </button>

          </div>

      </div>

   )

}

export default Register;