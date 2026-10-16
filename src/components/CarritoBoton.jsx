import React from "react";
import { Offcanvas, Button, Badge, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function CarritoBoton({ carrito = [], setCarrito = () => {}, showOffcanvas, setShowOffcanvas }) {
  const navigate = useNavigate();

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const eliminarItem = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const modificarCantidad = (id, delta) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;
        return { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
      }
      return item;
    });
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const irACheckout = () => {
    handleClose();
    navigate("/checkout");
  };

  return (
    <>
      {!showOffcanvas && (
        <div 
          className="position-fixed" 
          style={{ bottom: "90px", right: "20px", zIndex: 1050 }}
        >
          <Button
            onClick={handleShow}
            style={{
              backgroundColor: "#333",
              borderColor: "#333",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.2s ease"
            }}
          >
            <i className="bi bi-cart3 fs-3 text-white"></i>
            {cantidadTotal > 0 && (
              <Badge 
                bg="danger" 
                className="position-absolute top-0 start-100 translate-middle rounded-pill px-2 py-1"
                style={{ fontSize: "0.8rem", border: "2px solid #ffffff" }}
              >
                {cantidadTotal}
              </Badge>
            )}
          </Button>
        </div>
      )}

      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end" style={{ width: "420px" }}>
        <Offcanvas.Header closeButton className="border-bottom py-4 px-4" style={{ backgroundColor: "#fafafa" }}>
          <Offcanvas.Title className="fw-bold fs-4 d-flex align-items-center text-dark">
            <div className="rounded-circle p-2 d-flex align-items-center justify-content-center me-3" style={{ backgroundColor: "#ffebee", color: "#D63447", width: "45px", height: "45px" }}>
              <i className="bi bi-bag-check fs-5"></i>
            </div>
            <div>
              <span>Tu Carrito</span>
              <div className="text-muted fs-6 fw-normal">{cantidadTotal} {cantidadTotal === 1 ? "producto" : "productos"}</div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column p-0 bg-light">
          {carrito.length === 0 ? (
            <div className="text-center my-auto p-5 text-muted">
              <div className="rounded-circle bg-white d-inline-flex p-4 shadow-sm mb-3 text-danger">
                <i className="bi bi-cart-x fs-1"></i>
              </div>
              <h5 className="fw-bold text-dark mb-1">Tu carrito está vacío</h5>
              <p className="text-muted small mb-0">Agrega deliciosos platos para comenzar tu pedido.</p>
            </div>
          ) : (
            <>
              <ListGroup variant="flush" className="flex-grow-1 overflow-auto p-3 gap-2">
                {carrito.map((item) => (
                  <ListGroup.Item key={item.id} className="border-0 shadow-sm rounded-4 p-3 bg-white d-flex align-items-center justify-content-between">
                    <div className="flex-grow-1 pe-2">
                      <h6 className="mb-1 fw-bold text-dark">{item.nombre}</h6>
                      <div className="text-muted small mb-2">S/ {item.precio.toFixed(2)} c/u</div>
                      <div className="d-inline-flex align-items-center border rounded-pill bg-light px-2 py-1">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 text-dark text-decoration-none px-1 shadow-none" 
                          onClick={() => modificarCantidad(item.id, -1)}
                        >
                          <i className="bi bi-dash"></i>
                        </Button>
                        <span className="mx-2 fw-bold small text-dark">{item.cantidad}</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 text-dark text-decoration-none px-1 shadow-none" 
                          onClick={() => modificarCantidad(item.id, 1)}
                        >
                          <i className="bi bi-plus"></i>
                        </Button>
                      </div>
                    </div>

                    <div className="text-end ps-2 d-flex flex-column align-items-end justify-content-between" style={{ minHeight: "70px" }}>
                      <Button 
                        variant="light" 
                        size="sm" 
                        className="p-0 text-danger border-0 rounded-circle shadow-none d-flex align-items-center justify-content-center" 
                        style={{ width: "28px", height: "28px", backgroundColor: "#fff5f5" }}
                        onClick={() => eliminarItem(item.id)}
                      >
                        <i className="bi bi-trash small"></i>
                      </Button>
                      <div className="fw-bold text-dark fs-6">S/ {(item.precio * item.cantidad).toFixed(2)}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <div className="bg-white border-top p-4 shadow-lg">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted fw-semibold">Subtotal a pagar</span>
                  <span className="fs-4 fw-bold text-dark">S/ {precioTotal.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-100 py-3 rounded-pill fs-6 fw-bold shadow-sm d-flex align-items-center justify-content-center text-white border-0" 
                  style={{ backgroundColor: "#D63447" }}
                  onClick={irACheckout}
                >
                  <span>Proceder al Pago</span>
                  <i className="bi bi-arrow-right ms-2 fs-5"></i>
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CarritoBoton;