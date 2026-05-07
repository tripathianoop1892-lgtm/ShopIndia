import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";

const ShopkeeperEarnings = () => {
  const [earnings, setEarnings] = useState({
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  });

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await fetch("http://localhost:5000/earnings");
      const data = await res.json();
      setEarnings(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-content">
      <h2>Earnings</h2>

      <div className="earnings-container">
        <div className="earning-card">
          <h3>Today</h3>
          <p>₹{earnings.today}</p>
        </div>

        <div className="earning-card">
          <h3>This Week</h3>
          <p>₹{earnings.week}</p>
        </div>

        <div className="earning-card">
          <h3>This Month</h3>
          <p>₹{earnings.month}</p>
        </div>
      </div>

      <div className="total-earning">
        Total Earnings: ₹{earnings.total}
      </div>
    </div>
  );
};

export default ShopkeeperEarnings;