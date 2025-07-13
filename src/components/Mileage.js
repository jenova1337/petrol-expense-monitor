import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("petrol_logs") || "[]");
    setLogs(data);
  }, []);

  const calculateMileage = () => {
    const result = [];
    for (let i = 1; i < logs.length; i++) {
      if (logs[i].bike === logs[i - 1].bike) {
        const kmDiff = logs[i].kilometer - logs[i - 1].kilometer;
        const mileage = kmDiff / logs[i - 1].liter;
        result.push({
          date: logs[i].date,
          bike: logs[i].bike,
          mileage: mileage.toFixed(2),
          km: kmDiff,
        });
      }
    }
    return result;
  };

  const data = calculateMileage();

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Mileage Report</h2>
      {data.length === 0 && <p>No mileage data to show.</p>}
      {data.map((m, index) => (
        <div
          key={index}
          style={{
            marginBottom: 10,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 10,
          }}
        >
          <p><strong>Bike:</strong> {m.bike}</p>
          <p><strong>Date:</strong> {m.date}</p>
          <p><strong>Distance Travelled:</strong> {m.km} km</p>
          <p><strong>Mileage:</strong> {m.mileage} km/l</p>
        </div>
      ))}
    </div>
  );
};

export default Mileage;
