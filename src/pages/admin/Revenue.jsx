import React from "react";
import { useRevenue } from "../../hooks/useAdmin";

function Revenue() {
  const { revenue, loading, error } = useRevenue();

  if (loading) return <div>Calculando ganancias...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Ingresos Totales</h1>
      <h2>S/.{revenue.toFixed(2)}</h2>
    </div>
  );
}

export default Revenue;