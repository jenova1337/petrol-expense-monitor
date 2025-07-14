// src/components/PetrolPump.js
import React, { useState, useEffect } from "react";

const PetrolPump = () => {
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [km, setKm] = useState("");
  const [log, setLog] = useState([]);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("petrolLogs")) || [];
    setLog(saved);

    const bikeList = JSON.parse(localStorage.getItem("bikes")) || [];
    setBikes(bikeList);
  }, []);

  const handleSave = () => {
    if (!bike || !rate || !amount || !km) {
      alert("Please fill all fields");
      return;
    }

    const litres = (parseFloat(amount) / parseFloat(rate)).toFixed(2);

    const entry = {
      date: new Date().toLocaleString(),
      bike,
      rate,
      amount,
      litres,
      km,
    };

    const updatedLog = [...log, entry];
    localStorage.setItem("petrolLogs", JSON.stringify(updatedLog));
    setLog(updatedLog);

    // Reset
    setBike("");
    setRate("");
    setAmount("");
    setKm("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>⛽ Petrol Pump Log</h3>

      <select value={bike} onChange={(e) => setBike(e.target.value)}>
        <option value="">Select Bike</option>
        {bikes.map((b, i) => (
          <option key={i} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <br />

      <input
        type="number"
        placeholder="Petrol Rate ₹"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Current KM in Meter"
        value={km}
        onChange={(e) => setKm(e.target.value)}
      />
      <br />

      <button onClick={handleSave}>Save</button>

      {log.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h4>🧾 Petrol Fill Log</h4>
          <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Bike</th>
                <th>Rate ₹</th>
                <th>Amount ₹</th>
                <th>Litres</th>
                <th>KM</th>
              </tr>
            </thead>
            <tbody>
              {log.map((l, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{l.date}</td>
                  <td>{l.bike}</td>
                  <td>{l.rate}</td>
                  <td>{l.amount}</td>
                  <td>{l.litres}</td>
                  <td>{l.km}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PetrolPump;
