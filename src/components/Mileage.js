import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [log, setLog] = useState(null);

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    const all = [
      ...reserves.map(r => ({ ...r, type: "reserve", km: parseFloat(r.km), date: new Date(r.date) })),
      ...petrols.map(p => ({ ...p, type: "petrol", litres: parseFloat(p.litres), km: parseFloat(p.km), date: new Date(p.date) }))
    ].sort((a, b) => a.date - b.date);

    for (let i = 0; i < all.length - 2; i++) {
      const a = all[i];
      const b = all[i + 1];
      const c = all[i + 2];

      if (a.type === "reserve" && b.type === "petrol" && c.type === "reserve") {
        const distance = c.km - a.km;
        const mileage = (distance / b.litres).toFixed(2);
        setLog({
          beforeReserveKm: a.km,
          petrolLitres: b.litres,
          afterReserveKm: c.km,
          mileage
        });
        break;
      }
    }
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
        <p>No valid Reserve → Petrol → Reserve sequence found.</p>
      )}
    </div>
  );
};

export default Mileage;
