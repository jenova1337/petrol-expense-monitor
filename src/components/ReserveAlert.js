import React, { useState, useEffect } from "react";

const ReserveAlert = () => {
  const [reserveKm, setReserveKm] = useState("");
  const [alertTime, setAlertTime] = useState("6");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    setLogs(savedLogs);
  }, []);

  const handleSave = () => {
    const newEntry = {
      date: new Date().toLocaleString(),
      km: reserveKm,
    };

    const updated = [...logs, newEntry];
    localStorage.setItem("reserveLogs", JSON.stringify(updated));
    localStorage.setItem("alertTime", alertTime);
    setLogs(updated);
    setReserveKm("");

    // Also push into mileageConstants
    const mileageLog = JSON.parse(localStorage.getItem("mileageConstants")) || [];
    mileageLog.push({
      type: "reserve",
      km: parseFloat(reserveKm),
      date: new Date().toISOString(),
    });
    localStorage.setItem("mileageConstants", JSON.stringify(mileageLog));

    alert("✅ Reserve alert saved!");
  };

  return (
    <div style={{ padding: 20 }}>
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

      <h4 style={{ marginTop: 20 }}>📘 Reserve Log History</h4>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Reserved KM</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{log.date}</td>
              <td>{log.km}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReserveAlert;
