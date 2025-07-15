import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [log, setLog] = useState(null); // Store only the latest valid log

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    // Convert all date strings to real Date objects and tag type
    const taggedReserves = reserves.map(r => ({
      ...r,
      type: "reserve",
      dateObj: new Date(r.date),
      km: parseFloat(r.km)
    }));

    const taggedPetrols = petrols.map(p => ({
      ...p,
      type: "petrol",
      dateObj: new Date(p.date),
      litres: parseFloat(p.litres),
      km: parseFloat(p.km)
    }));

    const allLogs = [...taggedReserves, ...taggedPetrols].sort(
      (a, b) => a.dateObj - b.dateObj
    );

    let latest = null;

    for (let i = 0; i < allLogs.length - 2; i++) {
      const first = allLogs[i];
      const second = allLogs[i + 1];
      const third = allLogs[i + 2];

      if (
        first.type === "reserve" &&
        second.type === "petrol" &&
        third.type === "reserve"
      ) {
        const distance = third.km - first.km;
        const mileage =
          second.litres && distance > 0
            ? (distance / second.litres).toFixed(2)
            : "N/A";

        latest = {
          beforeReserveKm: first.km,
          petrolLitres: second.litres,
          afterReserveKm: third.km,
          mileage,
        };
      }
    }

    setLog(latest);
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
