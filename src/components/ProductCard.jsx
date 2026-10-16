import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const customStyles = `
  .pro-card-container {
    transition: all 0.3s ease;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    overflow: hidden;
    height: 100%;
  }
  .pro-card-container:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    border-color: #dcdcdc;
  }
  .pro-btn-red {
    transition: all 0.2s ease;
    background-color: #d63346 !important;
    color: #ffffff !important;
    border-radius: 4px;
    font-weight: 700;
    border: none;
  }
  .pro-btn-red:hover {
    background-color: #c0293a !important;
  }
  .text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .mobile-title { font-size: 0.85rem !important; margin-bottom: 2px !important; }
    .mobile-desc { font-size: 0.65rem !important; margin-bottom: 6px !important; }
    .mobile-price { font-size: 1rem !important; margin-bottom: 6px !important; }
    .mobile-btn { font-size: 0.8rem !important; padding: 4px 0 !important; }
  }
`;

export function ProductCard({ producto, onAgregar }) {
  return (
    <>
      <style>{customStyles}</style>
      <Card className="pro-card-container p-2 p-md-3">
        <Row className="g-2 g-md-3 h-100 align-items-center">
          <Col xs={5}>
            <div style={{ aspectRatio: "892 / 800", position: "relative" }}>
              <Card.Img 
                src={producto.imagen} 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "contain",
                  position: "absolute",
                  top: 0,
                  left: 0
                }} 
              />
            </div>
          </Col>
          <Col xs={7} className="d-flex flex-column h-100 text-center justify-content-center">
            <div className="mb-auto">
              <h6 
                className="fw-bold text-dark mb-2 text-uppercase mobile-title" 
                style={{ fontSize: "1rem", lineHeight: "1.2" }}
              >
                {producto.nombre}
              </h6>
              <p 
                className="text-muted mb-3 text-truncate-2 text-uppercase mobile-desc mx-auto" 
                style={{ fontSize: "0.75rem", lineHeight: "1.3", maxWidth: "95%" }}
              >
                {producto.descripcion}
              </p>
            </div>
            <div className="mt-auto">
              <span 
                className="fw-bolder text-dark d-block mb-2 mobile-price" 
                style={{ fontSize: "1.2rem" }}
              >
                S/ {producto.precio.toFixed(2)}
              </span>
              <Button 
                onClick={() => onAgregar(producto)}
                className="pro-btn-red w-100 py-2 mobile-btn"
              >
                Agregar
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}