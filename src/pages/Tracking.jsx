import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Badge, Spinner, Form, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { API_HOST } from "../services/api";
import { useTrackingOrder } from "../hooks/useOrder";

function Tracking() {
  const { orderId: paramOrderId } = useParams();
  const navigate = useNavigate();
  
  const [inputOrderId, setInputOrderId] = useState("");
  const [activeOrderId, setActiveOrderId] = useState(paramOrderId || null);
  
  const { order, setOrder, loading, error } = useTrackingOrder(activeOrderId);

  useEffect(() => {
    if (paramOrderId) {
      setActiveOrderId(paramOrderId);
    }
  }, [paramOrderId]);

  useEffect(() => {
    if (!activeOrderId) return;

    const socket = io(API_HOST);

    socket.on("connect", () => {
      socket.emit("unirse_tracking", { order_id: activeOrderId });
    });

    socket.on("actualizacion_estado", (data) => {
      if (data.id === activeOrderId || data.order_id === activeOrderId) {
        setOrder((prev) => (prev ? { ...prev, status: data.status } : prev));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [activeOrderId, setOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedId = inputOrderId.trim();
    if (trimmedId) {
      navigate(`/tracking/${trimmedId}`);
    }
  };

  const handleReset = () => {
    setActiveOrderId(null);
    setInputOrderId("");
    navigate("/tracking");
  };

  if (!activeOrderId) {
    return (
      <Container className="py-5" style={{ maxWidth: "500px" }}>
        <Card className="border-0 shadow-sm p-4 rounded-4 text-center">
          <h3 className="fw-bold mb-3">Seguimiento de Pedido</h3>
          <p className="text-muted small mb-4">Ingresa tu código de seguimiento (Tracking ID) para ver el estado de tu pedido.</p>
          <Form onSubmit={handleSearch}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Ej. 33NAV6"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 py-2 fw-bold text-white border-0" style={{ backgroundColor: "#D63447" }}>
              Buscar Pedido
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: "500px" }}>
        <Card className="border-0 shadow-sm p-4 rounded-4">
          <h4 className="text-danger mb-3">{error}</h4>
          <Button variant="outline-dark" onClick={handleReset}>
            Intentar con otro ID
          </Button>
        </Card>
      </Container>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <Container className="py-5" style={{ maxWidth: "600px" }}>
      <Card className="border-0 shadow-sm p-4 rounded-4 text-center">
        <div className="rounded-circle p-3 bg-light d-inline-flex mx-auto mb-3 text-danger">
          <i className="bi bi-box-seam fs-1"></i>
        </div>
        <h3 className="fw-bold mb-1">Estado de tu Pedido</h3>
        <p className="text-muted small">Tracking ID: #{order.id}</p>

        <div className="my-4 p-3 bg-light rounded-4">
          <span className="text-muted d-block mb-1">Estado Actual</span>
          <Badge bg="warning" text="dark" className="fs-6 px-3 py-2 rounded-pill">
            {order.status}
          </Badge>
        </div>

        <div className="text-start border-top pt-3 mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Cliente:</span>
            <span className="fw-bold">{order.customer_name}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Tipo de pedido:</span>
            <span className="fw-bold">{order.order_type}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Total:</span>
            <span className="fw-bold">S/ {order.total_amount.toFixed(2)}</span>
          </div>
        </div>

        <Button variant="link" className="text-muted text-decoration-none small p-0" onClick={handleReset}>
          Consultar otro pedido
        </Button>
      </Card>
    </Container>
  );
}

export default Tracking;