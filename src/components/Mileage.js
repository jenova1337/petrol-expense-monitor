// src/components/Mileage.js
import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [mileageLogs, setMileageLogs] = useState([]);

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    const sortedReserves = reserves.map((r) => ({
      ...r,
      type: "reserve",
      km: parseFloat(r.km),
      date: new Date(r.date),
    }));

    const sortedPetrols = petrols.map((p) => ({
      ...p,
      type: "petrol",
      km: parseFloat(p.km),
      litres: parseFloat(p.litres),
      date: new Date(p.date),
    }));

    const all = [...sortedReserves, ...sortedPetrols].sort(
      (a, b) => a.date - b.date
    );

    const logs = [];
    for (let i = 0; i < all.length - 2; i++) {
      if (
        all[i].type === "reserve" &&
        all[i + 1].type === "petrol" &&
        all[i + 2].type === "reserve"
      ) {
        const beforeReserve = all[i];
        const petrol = all[i + 1];
        const afterReserve = all[i + 2];

        const distance = afterReserve.km - beforeReserve.km;
        const mileage =
          petrol.litres && petrol.litres !== 0
            ? (distance / petrol.litres).toFixed(2)
            : "N/A";

        logs.push({
          date: afterReserve.date.toLocaleString(),
          bike: petrol.bike,
          beforeReserveKm: beforeReserve.km,
          petrolKm: petrol.km,
          afterReserveKm: afterReserve.km,
          litres: petrol.litres,
          mileage,
        });
      }
    }

    setMileageLogs(logs);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>📊 Mileage Report</h3>
      {mileageLogs.length === 0 ? (
        <p>No mileage data to show. Add at least Reserve → Petrol → Reserve.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Bike</th>
              <th>Before Reserve (Km)</th>
              <th>Petrol Fill (Km)</th>
              <th>After Reserve (Km)</th>
              <th>Litres</th>
              <th>Mileage (Km/L)</th>
            </tr>
          </thead>
          <tbody>
            {mileageLogs.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.date}</td>
                <td>{entry.bike}</td>
                <td>{entry.beforeReserveKm}</td>
                <td>{entry.petrolKm}</td>
                <td>{entry.afterReserveKm}</td>
                <td>{entry.litres}</td>
                <td>{entry.mileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Mileage;
