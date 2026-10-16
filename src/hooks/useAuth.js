import { useState } from "react";
import { API_HOST } from "../services/api";

export function useAuth() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  const loginAdmin = async (credentials) => {
    setCargando(true);
    setError(null);
    setExito(false);

    try {
      const response = await fetch(`${API_HOST}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Usuario o contraseña incorrectos");
      }

      const token = data.data?.access_token || data.access_token || data.token || data.data?.token || data.access;
      
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.error("Respuesta del login sin token detectado:", data);
        throw new Error("El servidor no devolvió un token de acceso válido.");
      }

      setExito(true);
      setCargando(false);
      return data;
    } catch (err) {
      setError(err.message);
      setCargando(false);
      throw err;
    }
  };

  return { loginAdmin, cargando, error, exito };
}