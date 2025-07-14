import React, { useState, useEffect } from "react";

const ReserveAlert = () => {
  const [reserveKm, setReserveKm] = useState("");
  const [alertTime, setAlertTime] = useState("6");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reserve_alerts")) || [];
    setHistory(saved);
  }, []);

  const handleSave = () => {
    if (!reserveKm || isNaN(reserveKm)) {
      alert("❗ Please enter a valid Reserve KM.");
      return;
    }

    const newEntry = {
      reserveKm,
      alertTime,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const updated = [newEntry, ...history];
    localStorage.setItem("reserve_alerts", JSON.stringify(updated));
    setHistory(updated);
    setReserveKm("");
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

      {history.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h4>📋 Reserve History</h4>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", maxWidth: 600 }}>
            <thead>
              <tr style={{ background: "#ddd" }}>
                <th>S.No</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reserve KM</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, idx) => (
                <tr key={idx}>
                  <td>{history.length - idx}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.reserveKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReserveAlert;
