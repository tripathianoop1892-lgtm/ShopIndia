import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { MedicinesList, updateMedicine } from "../../services/api";

const DistributorStock = () => {
  const [medicines, setMedicines] = useState([]);
  const [qty, setQty] = useState({});
  const [updating, setUpdating] = useState("");
  const [message, setMessage] = useState("");

  const fetchMedicines = async () => {
    const data = await MedicinesList();
    setMedicines(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchMedicines().catch(() => setMessage("Unable to load stock.")); }, []);

  const updateStock = async (medicine) => {
    const adjustment = Number(qty[medicine._id]);
    if (!Number.isFinite(adjustment) || adjustment === 0) {
      setMessage("Enter a non-zero stock adjustment.");
      return;
    }
    const stock = Number(medicine.stock || 0) + adjustment;
    if (stock < 0) {
      setMessage("Stock cannot be negative.");
      return;
    }

    try {
      setUpdating(medicine._id);
      const response = await updateMedicine(medicine._id, { stock });
      if (!response.success) throw new Error(response.message || "Unable to update stock.");
      setQty((previous) => ({ ...previous, [medicine._id]: "" }));
      setMessage("Stock updated.");
      await fetchMedicines();
    } catch (error) {
      setMessage(error.message || "Unable to update stock.");
    } finally {
      setUpdating("");
    }
  };

  return (
    <div className="stock-container">
      <h2>Stock Update</h2>
      {message && <p>{message}</p>}
      <table>
        <thead><tr><th>ID</th><th>Medicine</th><th>Stock</th><th>Adjustment</th></tr></thead>
        <tbody>
          {medicines.map((medicine) => <tr key={medicine._id}>
            <td>{medicine._id.slice(-4)}</td><td>{medicine.name}</td><td>{medicine.stock}</td>
            <td><input type="number" placeholder="+/- Qty" value={qty[medicine._id] || ""} onChange={(event) => setQty((previous) => ({ ...previous, [medicine._id]: event.target.value }))} /><button onClick={() => updateStock(medicine)} disabled={updating === medicine._id}>{updating === medicine._id ? "Updating..." : "Update"}</button></td>
          </tr>)}
          {!medicines.length && <tr><td colSpan="4">No medicines found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorStock;
