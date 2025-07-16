import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const constants = JSON.parse(localStorage.getItem("mileageConstants")) || [];
    const sorted = constants
      .map(e => ({ ...e, dateObj: new Date(e.date) }))
      .sort((a, b) => a.dateObj - b.dateObj);

    const results = [];
    for (let i = 0; i < sorted.length - 2; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      const c = sorted[i + 2];

      if (a.type === "reserve" && b.type === "petrol" && c.type === "reserve") {
        const distance = c.km - a.km;
        const mileage = b.litres > 0 ? (distance / b.litres).toFixed(2) : "N/A";
        results.push({
          before: a.km,
          litres: b.litres,
          after: c.km,
          mileage,
        });
      }
    }
    setLogs(results);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>📊 Mileage Report</h3>
      {logs.length > 0 ? (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Before Petrol Reserved KM</th>
              <th>Petrol Poured (Litres)</th>
              <th>After Petrol Reserved KM</th>
              <th>Mileage (km/l)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{entry.before}</td>
                <td>{entry.litres}</td>
                <td>{entry.after}</td>
                <td>{entry.mileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>📭 No valid Reserve → Petrol → Reserve sequence found.</p>
      )}
    </div>
  );
};

export default Mileage;
