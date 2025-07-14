import React, { useState } from "react";

const PetrolPump = () => {
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [bike, setBike] = useState("");
  const [km, setKm] = useState("");

  const bikes = JSON.parse(localStorage.getItem("bikes") || "[]");

  const handleSave = () => {
    if (!bike || !rate || !amount || !km) {
      alert("Please fill all fields");
      return;
    }

    const litres = parseFloat(amount) / parseFloat(rate);
    const log = {
      bike,
      rate: parseFloat(rate),
      amount: parseFloat(amount),
      litres: parseFloat(litres.toFixed(2)),
      km: parseInt(km),
      date: new Date().toLocaleDateString()
    };

    const existing = JSON.parse(localStorage.getItem("petrolLogs") || "[]");
    existing.push(log);
    localStorage.setItem("petrolLogs", JSON.stringify(existing));

    alert("Petrol entry saved!");
    setRate("");
    setAmount("");
    setKm("");
  };

  return (
    <div>
      <h3>⛽ Petrol Pump Log</h3>
      <label>Select Bike</label><br />
      <select value={bike} onChange={(e) => setBike(e.target.value)}>
        <option value="">-- Select --</option>
        {bikes.map((b, i) => (
          <option key={i} value={b.name}>{b.name}</option>
        ))}
      </select><br /><br />

      <label>Petrol Rate ₹</label><br />
      <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} /><br /><br />

      <label>Amount ₹</label><br />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /><br /><br />

      <label>Current KM in Meter</label><br />
      <input type="number" value={km} onChange={(e) => setKm(e.target.value)} /><br /><br />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default PetrolPump;
