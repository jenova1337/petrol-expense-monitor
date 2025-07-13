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
    if (
      !bike.name ||
      !bike.model ||
      !bike.kilometers ||
      !bike.purchaseDate ||
      !bike.color ||
      !bike.regNumber
    ) {
      alert("Please fill all required fields.");
      return;
    }

    let existing = JSON.parse(localStorage.getItem("bikes") || "[]");
    existing.push(bike);
    localStorage.setItem("bikes", JSON.stringify(existing));
    alert("✅ Bike added!");

    if (onAdd) onAdd(); // ✅ safe check for onAdd to prevent crash
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>➕ Add Bike</h2>
      <input name="name" placeholder="Bike Name" onChange={handleChange} required />
      <input name="model" placeholder="Model" onChange={handleChange} required />
      <input name="year" placeholder="Year" onChange={handleChange} required />
      <input name="kilometers" placeholder="Kilometers Run" onChange={handleChange} required />
      <input name="purchaseDate" type="date" onChange={handleChange} required />
      <input name="color" placeholder="Color" onChange={handleChange} required />
      <input name="regNumber" placeholder="Reg Number" onChange={handleChange} required />
      <input name="engineNumber" placeholder="Engine Number (optional)" onChange={handleChange} />
      <input name="chassisNumber" placeholder="Chassis Number (optional)" onChange={handleChange} />
      <button type="submit">Save Bike</button>
    </form>
  );
};

export default AddBike;
