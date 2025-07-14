import React, { useState } from "react";

const ReserveAlert = () => {
  const [reserveKm, setReserveKm] = useState("");
  const [alertTime, setAlertTime] = useState("6");

  const handleSave = () => {
    localStorage.setItem("reserveKm", reserveKm);
    localStorage.setItem("alertTime", alertTime);
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
    </div>
  );
};

export default ReserveAlert;
