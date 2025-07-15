import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [log, setLog] = useState(null); // Only one latest mileage log

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    // Sort all by date
    const sortedReserves = reserves.map(r => ({ ...r, type: "reserve", date: new Date(r.date) }));
    const sortedPetrols = petrols.map(p => ({ ...p, type: "petrol", date: new Date(p.date) }));
    const all = [...sortedReserves, ...sortedPetrols].sort((a, b) => a.date - b.date);

    // Find the latest Reserve → Petrol → Reserve sequence
    let latestLog = null;
    for (let i = 0; i < all.length - 2; i++) {
      if (
        all[i].type === "reserve" &&
        all[i + 1].type === "petrol" &&
        all[i + 2].type === "reserve"
      ) {
        const before = all[i];
        const petrol = all[i + 1];
        const after = all[i + 2];

        const distance = after.km - before.km;
        const mileage = petrol.litres
          ? (distance / parseFloat(petrol.litres)).toFixed(2)
          : "N/A";

        latestLog = {
          beforeReserveKm: before.km,
          petrolLitres: petrol.litres,
          afterReserveKm: after.km,
          mileage
        };
      }
    }

    setLog(latestLog);
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
