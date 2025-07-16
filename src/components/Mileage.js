import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [log, setLog] = useState(null);

  useEffect(() => {
    const reserveRaw = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrolRaw = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    // Safely convert strings to numbers and parse dates
    const reserves = reserveRaw
      .filter(r => r.km && !isNaN(r.km))
      .map(r => ({
        ...r,
        type: "reserve",
        date: new Date(r.date),
        km: Number(r.km), // important!
      }));

    const petrols = petrolRaw
      .filter(p => p.km && p.litres && !isNaN(p.km) && !isNaN(p.litres))
      .map(p => ({
        ...p,
        type: "petrol",
        date: new Date(p.date),
        litres: Number(p.litres),
        km: Number(p.km),
      }));

    // Merge and sort by date
    const combined = [...reserves, ...petrols].sort((a, b) => a.date - b.date);

    // Look for latest valid R → P → R pattern
    for (let i = combined.length - 3; i >= 0; i--) {
      const a = combined[i];
      const b = combined[i + 1];
      const c = combined[i + 2];

      if (a.type === "reserve" && b.type === "petrol" && c.type === "reserve") {
        const distance = c.km - a.km;
        const mileage = b.litres > 0 ? (distance / b.litres).toFixed(2) : "N/A";

        setLog({
          beforeReserveKm: a.km,
          petrolLitres: b.litres,
          afterReserveKm: c.km,
          mileage,
        });
        return;
      }
    }

    setLog(null); // No valid match found
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>📊 Mileage Report</h3>
      {log ? (
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
            <tr>
              <td>1</td>
              <td>{log.beforeReserveKm}</td>
              <td>{log.petrolLitres}</td>
              <td>{log.afterReserveKm}</td>
              <td>{log.mileage}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>📭 No valid Reserve → Petrol → Reserve sequence found.</p>
      )}
    </div>
  );
};

export default Mileage;
