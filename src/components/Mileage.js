import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [mileageLogs, setMileageLogs] = useState([]);

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    // Tag types for sorting and sequencing
    const sortedReserves = reserves.map((r) => ({ ...r, type: "reserve" }));
    const sortedPetrols = petrols.map((p) => ({ ...p, type: "petrol" }));
    const all = [...sortedReserves, ...sortedPetrols].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
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

        // Ensure numeric values
        const beforeKm = parseFloat(beforeReserve.km);
        const afterKm = parseFloat(afterReserve.km);
        const petrolKm = parseFloat(petrol.km);
        const litres = parseFloat(petrol.litres);

        const distance = afterKm - beforeKm;
        const mileage = litres ? (distance / litres).toFixed(2) : "N/A";

        logs.push({
          date: new Date(afterReserve.date).toLocaleString(),
          bike: petrol.bike,
          beforeReserveKm: beforeKm,
          petrolKm: petrolKm,
          afterReserveKm: afterKm,
          litres,
          mileage,
        });
      }
    }

    setMileageLogs(logs);
  }, []);

  return (
    <div>
      <h3>📊 Mileage Report</h3>
      {mileageLogs.length === 0 ? (
        <p>No mileage data to show. Add at least Reserve → Petrol → Reserve.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
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

