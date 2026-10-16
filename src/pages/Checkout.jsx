import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "../hooks/useOrder";

function Checkout({ carrito = [], setCarrito = () => {} }) {
  const navigate = useNavigate();
  const { createOrder, loading, error } = useCreateOrder();
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const carritoActual = carrito && carrito.length > 0 ? carrito : JSON.parse(localStorage.getItem("carrito") || "[]");

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    order_type: "DELIVERY",
    delivery_address: "",
    payment_type: "EFECTIVO"
  });

  const subtotal = carritoActual.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const deliveryFee = formData.order_type === "DELIVERY" ? 5.00 : 0.00;
  const totalAmount = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (carritoActual.length === 0) {
      setFormError("El carrito está vacío. Agrega productos antes de continuar.");
      return;
    }

    setFormError("");

    const orderPayload = {
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      order_type: formData.order_type,
      delivery_address: formData.order_type === "DELIVERY" ? formData.delivery_address : "",
      payment_type: formData.payment_type,
      items: carritoActual.map((item) => ({
        product_id: item.id,
        quantity: item.cantidad
      }))
    };

    try {
      const trackingIdResult = await createOrder(orderPayload);
      
      setTrackingId(trackingIdResult);
      
      setCarrito([]);
      localStorage.removeItem("carrito");
      
      setShowModal(true);
    } catch (err) {
      setFormError(err.message || "Ocurrió un error al procesar el pedido.");
    }
  };

  if (!carritoActual || carritoActual.length === 0 && !showModal) {
    return (
      <Container className="py-5 text-center">
        <div className="rounded-circle bg-light d-inline-flex p-4 shadow-sm mb-3 text-danger">
          <i className="bi bi-cart-x fs-1"></i>
        </div>
        <h3 className="fw-bold text-dark mb-2">Tu carrito está vacío</h3>
        <p className="text-muted mb-4">No hay productos seleccionados para procesar el pedido.</p>
        <Button style={{ backgroundColor: "#D63447", border: "none" }} className="rounded-pill px-4 py-2" onClick={() => navigate("/")}>
          Volver al Menú
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-dark mb-4">Finalizar Pedido</h2>
      {(error || formError) && <Alert variant="danger">{error || formError}</Alert>}
      <Row>
        <Col lg={7} className="mb-4">
          <Card className="border-0 shadow-sm p-4 rounded-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h5 className="fw-bold mb-3">Tus Datos</h5>
              <Form.Group className="mb-3" controlId="customer_name">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                />
                <Form.Control.Feedback type="invalid">Por favor ingresa tu nombre.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="customer_phone">
                <Form.Label>Teléfono / Celular</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  placeholder="Ej. 987654321"
                />
                <Form.Control.Feedback type="invalid">Por favor ingresa tu teléfono.</Form.Control.Feedback>
              </Form.Group>

              <h5 className="fw-bold mb-3 mt-4">Tipo de Entrega</h5>
              <Form.Group className="mb-3">
                <Form.Select name="order_type" value={formData.order_type} onChange={handleChange}>
                  <option value="DELIVERY">Delivery (+ S/ 5.00)</option>
                  <option value="RECOJO_TIENDA">Recojo en Tienda (Gratis)</option>
                </Form.Select>
              </Form.Group>

              {formData.order_type === "DELIVERY" && (
                <Form.Group className="mb-3" controlId="delivery_address">
                  <Form.Label>Dirección de Entrega</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    placeholder="Av. Principal 123, Depto 402"
                  />
                  <Form.Control.Feedback type="invalid">Ingresa tu dirección de entrega.</Form.Control.Feedback>
                </Form.Group>
              )}

              <h5 className="fw-bold mb-3 mt-4">Método de Pago</h5>
              <Form.Group className="mb-4">
                <Form.Select name="payment_type" value={formData.payment_type} onChange={handleChange}>
                  <option value="EFECTIVO">Efectivo</option>
                  <option value="YAPE">Yape</option>
                  <option value="PLIN">PLIN</option>
                </Form.Select>
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-3 rounded-pill fw-bold text-white border-0 shadow-sm"
                style={{ backgroundColor: "#D63447" }}
                disabled={loading}
              >
                {loading ? "Procesando pedido..." : "Confirmar y Enviar Pedido"}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="border-0 shadow-sm p-4 rounded-4 bg-light">
            <h5 className="fw-bold mb-3">Resumen del Pedido</h5>
            {carritoActual.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-2 small">
                <span>{item.cantidad}x {item.nombre}</span>
                <span className="fw-bold">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Delivery</span>
              <span>S/ {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 text-dark">
              <span>Total a pagar</span>
              <span style={{ color: "#D63447" }}>S/ {totalAmount.toFixed(2)}</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center p-5">
          <div className="rounded-circle bg-success bg-opacity-10 d-inline-flex p-4 shadow-sm mb-3 text-success mx-auto">
            <i className="bi bi-check-circle-fill fs-1"></i>
          </div>
          <h3 className="fw-bold text-dark mb-2">¡Pedido creado con éxito!</h3>
          <p className="text-muted mb-4">Tu pedido ha sido procesado correctamente y ya está en marcha.</p>
          
          <div className="bg-light p-3 rounded-3 mb-4">
            <span className="text-muted d-block small mb-1">Tu ID de seguimiento es:</span>
            <span className="fw-bold fs-3 text-dark">{trackingId}</span>
          </div>

          <Button
            style={{ backgroundColor: "#D63447", border: "none" }}
            className="w-100 rounded-pill py-3 fw-bold text-white shadow-sm"
            onClick={() => navigate(`/tracking/${trackingId}`)}
          >
            Ir a Seguir mi Pedido
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Checkout;