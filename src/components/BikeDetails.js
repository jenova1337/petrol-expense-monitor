import React, { useEffect, useState } from "react";

const BikeDetails = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bikes") || "[]");
    setBikes(data);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Your Bike Details</h2>
      {bikes.length === 0 && <p>No bikes added yet.</p>}

      {bikes.map((bike, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10, borderRadius: 10 }}>
          <p><strong>Name:</strong> {bike.name}</p>
          <p><strong>Model & Year:</strong> {bike.model} ({bike.year})</p>
          <p><strong>Kilometers:</strong> {bike.kilometers}</p>
          <p><strong>Purchased:</strong> {bike.purchaseDate}</p>
          <p><strong>Color:</strong> {bike.color}</p>
          <p><strong>Reg Number:</strong> {bike.regNumber}</p>
          {bike.engineNumber && <p><strong>Engine No:</strong> {bike.engineNumber}</p>}
          {bike.chassisNumber && <p><strong>Chassis No:</strong> {bike.chassisNumber}</p>}
        </div>
      ))}
    </div>
  );
};

export default BikeDetails;
