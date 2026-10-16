import { useState, useEffect } from "react";
import { API_HOST } from "../services/api";

export function useProducts() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_HOST}/api/public/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los productos");
        }
        return res.json();
      })
      .then((data) => {
        const items = data.data || data;
        const productosMapeados = items.map((item) => ({
          id: item.id,
          nombre: item.name,
          descripcion: item.description,
          precio: item.price,
          imagen: item.image
        }));
        setProductos(productosMapeados);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { productos, loading, error };
}