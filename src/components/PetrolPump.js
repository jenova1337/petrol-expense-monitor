import React, { useState, useEffect } from "react";

const PetrolPump = () => {
  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [km, setKm] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bikes")) || [];
    setBikes(data);
    const fillLogs = JSON.parse(localStorage.getItem("petrolLogs")) || [];
    setLogs(fillLogs);
  }, []);

  const handleSave = () => {
    const liters = (parseFloat(amount) / parseFloat(rate)).toFixed(2);
    const entry = {
      date: new Date().toLocaleString(),
      bike,
      rate,
      amount,
      liters,
      km,
    };
    const updated = [...logs, entry];
    localStorage.setItem("petrolLogs", JSON.stringify(updated));
    setLogs(updated);
    setRate("");
    setAmount("");
    setKm("");
    alert("✅ Petrol log saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>⛽ Petrol Pump Log</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}>
        <select value={bike} onChange={(e) => setBike(e.target.value)}>
          <option value="">Select Bike</option>
          {bikes.map((b, i) => (
            <option key={i} value={b.name}>{b.name}</option>
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
          placeholder="Current KM in Meter"
          value={km}
          onChange={(e) => setKm(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <h4 style={{ marginTop: 20 }}>📋 Petrol Log</h4>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Liters</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{log.rate}</td>
              <td>{log.amount}</td>
              <td>{log.liters}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetrolPump;
