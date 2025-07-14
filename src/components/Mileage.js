import React, { useState, useEffect } from "react";

const Mileage = () => {
  const [reserveLogs, setReserveLogs] = useState([]);
  const [petrolLogs, setPetrolLogs] = useState([]);
  const [mileage, setMileage] = useState(null);

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLogs")) || [];

    const sortedEvents = [
      ...reserves.map((r) => ({ type: "reserve", ...r })),
      ...petrols.map((p) => ({ type: "petrol", ...p })),
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    let A = null, B = null, C = null, L = null;

    for (let i = 0; i < sortedEvents.length; i++) {
      if (sortedEvents[i].type === "reserve") {
        if (!A) {
          A = parseFloat(sortedEvents[i].km);
        } else if (B && !C) {
          C = parseFloat(sortedEvents[i].km);
          break;
        }
      } else if (A && !B && sortedEvents[i].type === "petrol") {
        B = parseFloat(sortedEvents[i].currentKm);
        L = parseFloat(sortedEvents[i].litres);
      }
    }

    if (A !== null && B !== null && C !== null && L) {
      const calculated = ((C - A) / L).toFixed(2);
      setMileage(calculated);
    }
  }, []);

  return (
    <div>
      <h3>📊 Mileage Report</h3>
      {mileage ? (
        <p>
          Mileage: <strong>{mileage} km/l</strong>
        </p>
      ) : (
        <p>No mileage data to show. Add at least Reserve → Petrol → Reserve.</p>
      )}
    </div>
  );
};

export default Mileage;
