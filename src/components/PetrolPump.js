import React, { useState, useEffect } from "react";

const PetrolPump = () => {
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const [bikes, setBikes] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const savedBikes = JSON.parse(localStorage.getItem("bikes")) || [];
    setBikes(savedBikes);

    const savedLogs = JSON.parse(localStorage.getItem("petrolLogs")) || [];
    setLogs(savedLogs);
  }, []);

  const handleSave = () => {
    const litres = (parseFloat(amount) / parseFloat(rate)).toFixed(2);
    const newLog = {
      date: new Date().toLocaleString(),
      bike,
      rate,
      amount,
      litres,
      currentKm,
    };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem("petrolLogs", JSON.stringify(updatedLogs));
    alert("✅ Petrol log saved!");
    setBike("");
    setRate("");
    setAmount("");
    setCurrentKm("");
  };

  return (
    <div>
      <h3>⛽ Petrol Pump Log</h3>
      <select value={bike} onChange={(e) => setBike(e.target.value)}>
        <option value="">Select Bike</option>
        {bikes.map((b, i) => (
          <option key={i} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Petrol Rate ₹"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Current KM"
        value={currentKm}
        onChange={(e) => setCurrentKm(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default PetrolPump;
