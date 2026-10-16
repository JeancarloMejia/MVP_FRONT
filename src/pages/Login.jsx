import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginAdmin, cargando } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.warn("Por favor complete todos los campos");
      return;
    }

    try {
      const response = await loginAdmin({ username, password });
      
      localStorage.setItem("access_token", response.data.access_token);
      
      toast.success("Login exitoso");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container className="py-5" style={{ maxWidth: "500px" }}>
        <Card className="border-0 shadow-lg p-4 rounded-4 text-center" style={{ backgroundColor: "#ffffff", color: "#212529", border: "1px solid #dee2e6" }}>
          <div className="rounded-circle p-3 d-inline-flex mx-auto mb-3" style={{ backgroundColor: "#f8f9fa", color: "#FF4D4D" }}>
            <i className="bi bi-shield-lock fs-1"></i>
          </div>
          <h3 className="fw-bold mb-1" style={{ color: "#212529" }}>Panel Administrativo</h3>
          <p className="text-muted small mb-4">Ingresa tus credenciales para acceder al sistema.</p>
          
          <Form onSubmit={handleSubmit} className="text-start">
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ backgroundColor: "#f8f9fa", borderColor: "#ced4da", color: "#212529" }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-muted small">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: "#f8f9fa", borderColor: "#ced4da", color: "#212529" }}
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="w-100 py-2 fw-bold text-white border-0" 
              style={{ backgroundColor: "#FF4D4D" }}
              disabled={cargando}
            >
              {cargando ? "Verificando..." : "Iniciar Sesión"}
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Login;