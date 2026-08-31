import { useEffect, useMemo, useState } from "react";
import { getCategorySummary } from "../../../services/api";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getCategorySummary();
      setCategories(Array.isArray(response) ? response : []);
    } catch (requestError) {
      console.error("Unable to load category summary", requestError);
      setError("Unable to load medicine categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategorySummary()
      .then((response) => setCategories(Array.isArray(response) ? response : []))
      .catch((requestError) => {
        console.error("Unable to load category summary", requestError);
        setError("Unable to load medicine categories. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term ? categories.filter((item) => (item.category || "").toLowerCase().includes(term)) : categories;
  }, [categories, searchTerm]);

  return <section className="categories-page">
    <div className="categories-header"><div><h2>Medicine Categories</h2><p>Live category summary from the medicine inventory</p></div><button className="add-btn" onClick={loadCategories} disabled={loading}>{loading ? "Refreshing..." : "Refresh"}</button></div>
    <div className="search-box"><input type="search" placeholder="Search category..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></div>
    {error && <div className="category-error" role="alert">{error}</div>}
    <div className="categories-table">
      {loading ? <p className="empty-state">Loading categories...</p> : filteredCategories.length === 0 ? <p className="empty-state">No categories found.</p> : <table><thead><tr><th>#</th><th>Category Name</th><th>Total Medicines</th></tr></thead><tbody>{filteredCategories.map((item, index) => <tr key={item.category || index}><td>{index + 1}</td><td>{item.category || "Uncategorized"}</td><td>{item.totalMedicine || 0}</td></tr>)}</tbody></table>}
    </div>
  </section>;
};

export default Categories;
