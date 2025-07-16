import React, { useState, useEffect } from "react";

const ReserveDetails = () => {
  const [reserveKm, setReserveKm] = useState("");
  const [alertTime, setAlertTime] = useState("6");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("reserveSettings"));
    if (savedData) {
      setReserveKm(savedData.reserveKm);
      setAlertTime(savedData.alertTime);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    const data = { reserveKm, alertTime };
    localStorage.setItem("reserveSettings", JSON.stringify(data));
    setSaved(true);
    alert("✅ Reserve details saved!");

    const timeMs = parseInt(alertTime) * 60 * 60 * 1000;
    setTimeout(() => {
      alert(`⛽ Reminder: Your reserve is expected around ${reserveKm} km!`);
    }, timeMs);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔔 Reserve Details & Alert</h2>
      <input
        type="number"
        placeholder="Reserve Km"
        value={reserveKm}
        onChange={(e) => setReserveKm(e.target.value)}
      />
      <br />
      <label>Alert me after: </label>
      <select value={alertTime} onChange={(e) => setAlertTime(e.target.value)}>
        <option value="6">6 hrs</option>
        <option value="12">12 hrs</option>
        <option value="24">24 hrs</option>
      </select>
      <br />
      <button onClick={handleSave}>Save Reserve Alert</button>
      {saved && <p>✅ Saved Reserve: {reserveKm} km | Alert in {alertTime} hrs</p>}
    </div>
  );
};

export default ReserveDetails;
