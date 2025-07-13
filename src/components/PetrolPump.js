// PetrolPump.js - React component
import React, { useState } from "react";

const PetrolPump = () => {
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [kilometer, setKilometer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const liter = parseFloat(amount) / parseFloat(rate);
    const entry = {
      date: new Date().toLocaleString(),
      bike,
      rate: parseFloat(rate),
      amount: parseFloat(amount),
      liter: liter.toFixed(2),
      kilometer: parseFloat(kilometer),
    };

    let existing = JSON.parse(localStorage.getItem("petrol_logs") || "[]");
    existing.push(entry);
    localStorage.setItem("petrol_logs", JSON.stringify(existing));
    alert("✅ Petrol data saved!");
    setBike("");
    setRate("");
    setAmount("");
    setKilometer("");
  };

  const bikes = JSON.parse(localStorage.getItem("bikes") || "[]");

  return (
    <div style={{ padding: 20 }}>
      <h2>⛽ Petrol Pump Log</h2>
      <form onSubmit={handleSubmit}>
        <select value={bike} onChange={(e) => setBike(e.target.value)} required>
          <option value="">Select Bike</option>
          {bikes.map((b, i) => (
            <option key={i} value={b.name + " (" + b.regNumber + ")"}>
              {b.name} ({b.regNumber})
            </option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Petrol Rate ₹"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Current KM in Meter"
          value={kilometer}
          onChange={(e) => setKilometer(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PetrolPump;
