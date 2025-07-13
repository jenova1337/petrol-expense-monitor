import React, { useState, useEffect } from "react";

const BikeDetails = ({ refresh }) => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bikes") || "[]");
    setBikes(saved);
  }, [refresh]);  // re-run on refresh change

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Your Bike Details</h2>
      {bikes.length === 0 ? (
        <p>No bikes added yet.</p>
      ) : (
        <ul>
          {bikes.map((bike, index) => (
            <li key={index}>
              {bike.name} - {bike.model} ({bike.year}) - {bike.regNumber}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BikeDetails;

