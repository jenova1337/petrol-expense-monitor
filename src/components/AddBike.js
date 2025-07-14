import React, { useState } from "react";

const AddBike = ({ onAdd }) => {
  const [bike, setBike] = useState({
    name: "",
    model: "",
    year: "",
    kilometers: "",
    purchaseDate: "",
    color: "",
    regNumber: "",
    engineNumber: "",
    chassisNumber: "",
  });

  const handleChange = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, model, year, kilometers, purchaseDate, color, regNumber } = bike;

    if (!name || !model || !year || !kilometers || !purchaseDate || !color || !regNumber) {
      alert("❗ Please fill all required fields.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("bikes") || "[]");
    existing.push(bike);
    localStorage.setItem("bikes", JSON.stringify(existing));

    alert("✅ Bike added successfully!");
    setBike({
      name: "",
      model: "",
      year: "",
      kilometers: "",
      purchaseDate: "",
      color: "",
      regNumber: "",
      engineNumber: "",
      chassisNumber: "",
    });

    if (onAdd) onAdd(); // Refresh parent (App.js)
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h3>➕ Add Bike</h3>
      <input name="name" placeholder="Bike Name" value={bike.name} onChange={handleChange} required />
      <input name="model" placeholder="Model" value={bike.model} onChange={handleChange} required />
      <input name="year" placeholder="Year" value={bike.year} onChange={handleChange} required />
      <input name="kilometers" placeholder="Kilometers Run" value={bike.kilometers} onChange={handleChange} required />
      <input name="purchaseDate" type="date" value={bike.purchaseDate} onChange={handleChange} required />
      <input name="color" placeholder="Color" value={bike.color} onChange={handleChange} required />
      <input name="regNumber" placeholder="Reg Number" value={bike.regNumber} onChange={handleChange} required />
      <input name="engineNumber" placeholder="Engine Number (optional)" value={bike.engineNumber} onChange={handleChange} />
      <input name="chassisNumber" placeholder="Chassis Number (optional)" value={bike.chassisNumber} onChange={handleChange} />
      <button type="submit">Save Bike</button>
    </form>
  );
};

export default AddBike;
