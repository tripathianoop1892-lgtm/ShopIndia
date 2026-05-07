import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { addMedicine, updateMedicine, MedicinesList } from "../../services/api"; // ✅ FIX

const Distributor = () => {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await MedicinesList();
      setMedicines(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 Search
  const filteredData = search
    ? medicines.filter(
        (item) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.type?.toLowerCase().includes(search.toLowerCase())
      )
    : medicines;

  // ✏️ Change
  const handleChange = (e, id, field) => {
    const value = e.target.value;

    setMedicines((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // 💾 Save (UPDATED)
  const handleSave = async (id) => {
    try {
      const med = medicines.find((m) => m._id === id);

      await updateMedicine(id, med); // ✅ FIX (JWT + correct API)

      setEditId(null);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // 📅 date fix
  const formatDate = (date) => {
    if (!date) return "";
    return date.slice(0, 10);
  };

  return (
    <div className="medicine-container">
      <h2>My Medicines</h2>

      <input
        type="text"
        placeholder="Search medicine..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Stock</th>
            <th>MFD</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((med) => (
              <tr key={med._id}>
                
                {/* NAME */}
                <td>
                  {editId === med._id ? (
                    <input
                      value={med.name || ""}
                      onChange={(e) =>
                        handleChange(e, med._id, "name")
                      }
                    />
                  ) : (
                    med.name
                  )}
                </td>

                {/* TYPE */}
                <td>
                  {editId === med._id ? (
                    <select
                      value={med.type || ""}
                      onChange={(e) =>
                        handleChange(e, med._id, "type")
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Injection">Injection</option>
                      <option value="Drops">Drops</option>
                      <option value="Cream">Cream</option>
                      <option value="Ointment">Ointment</option>
                      <option value="Gel">Gel</option>
                      <option value="Powder">Powder</option>
                      <option value="Inhaler">Inhaler</option>
                      <option value="Spray">Spray</option>
                      <option value="Solution">Solution</option>
                    </select>
                  ) : (
                    med.type || "N/A"
                  )}
                </td>

                {/* STOCK */}
                <td>
                  {editId === med._id ? (
                    <input
                      value={med.stock || ""}
                      onChange={(e) =>
                        handleChange(e, med._id, "stock")
                      }
                    />
                  ) : (
                    med.stock
                  )}
                </td>

                {/* MFD */}
                <td>
                  {editId === med._id ? (
                    <input
                      type="date"
                      value={formatDate(med.mfd)}
                      onChange={(e) =>
                        handleChange(e, med._id, "mfd")
                      }
                    />
                  ) : (
                    med.mfd || "N/A"
                  )}
                </td>

                {/* EXPIRY */}
                <td>
                  {editId === med._id ? (
                    <input
                      type="date"
                      value={formatDate(med.expiry)}
                      onChange={(e) =>
                        handleChange(e, med._id, "expiry")
                      }
                    />
                  ) : (
                    med.expiry
                  )}
                </td>

                {/* ACTION */}
                <td>
                  {editId === med._id ? (
                    <button onClick={() => handleSave(med._id)}>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => setEditId(med._id)}>
                      Edit
                    </button>
                  )}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Medicine Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Distributor; // ✅ FIX export name