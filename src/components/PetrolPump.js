// ✅ PetrolPump.js
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

    const mileage = JSON.parse(localStorage.getItem("mileageConstants")) || {};
    mileage.lastPetrol = {
      km: entry.km,
      litres: litres,
    };
    localStorage.setItem("mileageConstants", JSON.stringify(mileage));

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
    </div>
  );
};

export default PetrolPump;
