import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mileageConstants")) || [];

    const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const mileageRows = [];

    for (let i = 0; i < sorted.length - 2; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      const c = sorted[i + 2];

      if (a.type === "reserve" && b.type === "petrol" && c.type === "reserve") {
        const distance = c.km - a.km;
        const mileage = b.litres > 0 ? (distance / b.litres).toFixed(2) : "N/A";

        mileageRows.push({
          beforeReserve: a.km,
          petrolLitres: b.litres,
          afterReserve: c.km,
          mileage,
        });
      }
    }

    setLogs(mileageRows);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>📊 Mileage Report</h3>
      {logs.length > 0 ? (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Before Reserve KM</th>
              <th>Petrol Poured (Litres)</th>
              <th>After Reserve KM</th>
              <th>Mileage (km/l)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.beforeReserve}</td>
                <td>{row.petrolLitres}</td>
                <td>{row.afterReserve}</td>
                <td>{row.mileage}</td>
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
