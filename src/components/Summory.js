import React, { useEffect, useState } from "react";

const Summary = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("petrolLogs") || "[]");
    setLogs(saved);
  }, []);

  const groupedByBike = logs.reduce((acc, log) => {
    if (!acc[log.bike]) acc[log.bike] = [];
    acc[log.bike].push(log);
    return acc;
  }, {});

  return (
    <div>
      <h3>📊 Summary</h3>
      {logs.length === 0 ? (
        <p>No data to show.</p>
      ) : (
        Object.entries(groupedByBike).map(([bike, entries], idx) => (
          <div key={idx}>
            <h4>{bike}</h4>
            <table border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Petrol Rate ₹</th>
                  <th>Amount ₹</th>
                  <th>Litres</th>
                  <th>Bike KM</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((log, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{log.date}</td>
                    <td>{log.rate}</td>
                    <td>{log.amount}</td>
                    <td>{log.litres}</td>
                    <td>{log.km}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
          </div>
        ))
      )}
    </div>
  );
};

export default Summary;
