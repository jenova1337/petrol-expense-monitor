import React, { useState, useEffect } from "react";

const Mileage = () => {
  const [mileage, setMileage] = useState(null);

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    const all = [
      ...reserves.map(r => ({ type: "reserve", date: new Date(r.date), km: parseFloat(r.km) })),
      ...petrols.map(p => ({ type: "petrol", date: new Date(p.date), km: parseFloat(p.km), liters: parseFloat(p.liters) }))
    ].sort((a, b) => a.date - b.date);

    let A = null, B = null, C = null, L = null;

    for (let i = 0; i < all.length; i++) {
      if (all[i].type === "reserve") {
        if (!A) A = all[i];
        else if (B && !C) {
          C = all[i];
          break;
        }
      } else if (A && !B && all[i].type === "petrol") {
        B = all[i];
        L = all[i].liters;
      }
    }

    if (A && B && C && L) {
      const result = ((C.km - A.km) / L).toFixed(2);
      setMileage(result);
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>📊 Mileage Report</h3>
      {mileage ? (
        <p><strong>🛵 Mileage:</strong> {mileage} km/l</p>
      ) : (
        <p>No mileage data to show. Add at least Reserve → Petrol → Reserve.</p>
      )}
    </div>
  );
};

export default Mileage;
