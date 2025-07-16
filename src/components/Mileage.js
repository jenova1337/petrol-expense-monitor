import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [log, setLog] = useState(null);

  useEffect(() => {
    const constants = JSON.parse(localStorage.getItem("mileageConstants")) || {};
    const before = constants.lastReserveBefore;
    const petrol = constants.lastPetrol;
    const after = constants.lastReserveAfter;

    if (before && petrol && after) {
      const distance = parseFloat(after.km) - parseFloat(before.km);
      const mileage =
        petrol.litres > 0 && distance > 0
          ? (distance / parseFloat(petrol.litres)).toFixed(2)
          : "N/A";

      setLog({
        beforeReserveKm: before.km,
        petrolLitres: petrol.litres,
        afterReserveKm: after.km,
        mileage,
      });
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
        <p>📭 No valid Reserve → Petrol → Reserve sequence yet.</p>
      )}
    </div>
  );
};

export default Mileage;
