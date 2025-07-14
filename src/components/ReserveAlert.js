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
    const newLog = {
      date: new Date().toLocaleString(),
      km: reserveKm,
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem("reserveLogs", JSON.stringify(updatedLogs));
    localStorage.setItem("alertTime", alertTime);
    alert("✅ Reserve KM & Alert saved!");
    setReserveKm("");
  };

  return (
    <div>
      <h3>🔔 Reserve Details & Alert</h3>
      <input
        type="number"
        placeholder="Reserve KM"
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

      <h4>📋 Reserve Log</h4>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>KM</th>
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
