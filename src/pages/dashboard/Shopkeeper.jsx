// import React, { useEffect, useState } from "react";
// import "./Shopkeeper.css";

// const Shopkeeper = () => {
//   const [meds, setMeds] = useState([]);

//   useEffect(() => {
//     setMeds(JSON.parse(localStorage.getItem("shopMedicines") || "[]"));
//   }, []);

//   const today = new Date();

//   const total = meds.length;
//   const expired = meds.filter(m => new Date(m.expiry) < today).length;
//   const lowStock = meds.filter(m => m.stock <= 5).length;

//   const expiringSoon = meds.filter(m => {
//     const diff = (new Date(m.expiry) - today) / (1000 * 60 * 60 * 24);
//     return diff <= 7 && diff > 0;
//   }).length;

//   return (
//     <div className="dashboard">

//       {/* HEADER */}
//       <h2>🏪 Shopkeeper Dashboard</h2>
//       <p className="sub">Anoop Medical Store • Shiamgir, India</p>

//       {/* STATS */}
//       <div className="stats">

//         <div className="stat-card blue">
//           <span>📦</span>
//           <h3>{total}</h3>
//           <p>Total</p>
//         </div>

//         <div className="stat-card red">
//           <span>❌</span>
//           <h3>{expired}</h3>
//           <p>Expired</p>
//         </div>

//         <div className="stat-card orange">
//           <span>⚠️</span>
//           <h3>{lowStock}</h3>
//           <p>Low Stock</p>
//         </div>

//         <div className="stat-card yellow">
//           <span>⏳</span>
//           <h3>{expiringSoon}</h3>
//           <p>Expiring Soon</p>
//         </div>

//       </div>

//       {/* ALERTS */}
//       <div className="box">
//         <h3>🔔 Alerts</h3>

//         {meds.length === 0 && <p>No alerts</p>}

//         {meds.map(m => {
//           const exp = new Date(m.expiry);

//           if (exp < today) {
//             return <p key={m.id} className="danger">❌ {m.name} expired</p>;
//           }

//           if (m.stock <= 5) {
//             return <p key={m.id} className="warning">⚠️ {m.name} low stock</p>;
//           }

//           return null;
//         })}
//       </div>

//       {/* TABLE */}
//       <div className="table">
//         <h3>💊 My Medicines</h3>

//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Stock</th>
//               <th>Expiry</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {meds.map(m => {
//               let status = "OK";
//               if (new Date(m.expiry) < today) status = "Expired";
//               else if (m.stock <= 5) status = "Low";

//               return (
//                 <tr key={m.id}>
//                   <td>{m.name}</td>
//                   <td>{m.stock}</td>
//                   <td>{m.expiry}</td>
//                   <td>{status}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// export default Shopkeeper;