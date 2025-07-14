import React, { useState, useEffect } from "react";

const ReserveAlert = () => {
  const [reserveKm, setReserveKm] = useState("");
  const [alertTime, setAlertTime] = useState("6");
  const [savedReserve, setSavedReserve] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reserve_alert"));
    if (saved) setSavedReserve(saved);
  }, []);

  const handleSave = () => {
    if (!reserveKm || isNaN(reserveKm)) {
      alert("❗ Please enter a valid Reserve KM.");
      return;
    }

    const data = {
      reserveKm,
      alertTime,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    localStorage.setItem("reserve_alert", JSON.stringify(data));
    setSavedReserve(data);
    alert("✅ Reserve alert saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>🔔 Reserve Details & Alert</h3>

      <input
        type="number"
        placeholder="Reserve Kilometers"
        value={reserveKm}
        onChange={(e) => setReserveKm(e.target.value)}
        style={{ padding: 8, marginBottom: 10, width: "100%", maxWidth: 300 }}
      />
      <br />

      <label>Alert me after: </label>
      <select
        value={alertTime}
        onChange={(e) => setAlertTime(e.target.value)}
        style={{ marginLeft: 10, padding: 6 }}
      >
        <option value="6">6 hrs</option>
        <option value="12">12 hrs</option>
        <option value="24">24 hrs</option>
      </select>
      <br /><br />

      <button onClick={handleSave} style={{ padding: "10px 20px" }}>
        Save Reserve Alert
      </button>

      {savedReserve && (
        <div style={{ marginTop: 20, background: "#f0f0f0", padding: 10, borderRadius: 5 }}>
          <h4>✅ Saved Reserve Info</h4>
          <p>📅 Date: <strong>{savedReserve.date}</strong></p>
          <p>⏰ Time: <strong>{savedReserve.time}</strong></p>
          <p>🔢 Reserve KM: <strong>{savedReserve.reserveKm} km</strong></p>
          <p>⏳ Alert After: <strong>{savedReserve.alertTime} hrs</strong></p>
        </div>
      )}
    </div>
  );
};

export default ReserveAlert;
