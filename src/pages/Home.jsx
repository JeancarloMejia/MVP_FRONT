import React from "react";
import { useOutletContext } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { HeroSection } from "../components/Herosection";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const homeStyles = `
  .menu-wrapper {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    padding: 40px 30px;
    width: 100%;
  }
  .section-title {
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    text-align: center;
  }
  @media (max-width: 768px) {
    .menu-wrapper {
      padding: 20px 10px;
      border-radius: 8px;
    }
    .section-title {
      font-size: 1.25rem;
    }
  }
`;

export default function Home() {
  const { carrito, setCarrito } = useOutletContext();
  const { productos, loading, error } = useProducts();

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find((item) => item.id === producto.id);
      if (itemExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const pollosYCombos = productos.slice(0, 6);
  const platosExtras = productos.slice(6);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f6f8", paddingBottom: "60px" }}>
      <style>{homeStyles}</style>
      <HeroSection 
        title="¡Bienvenido a Pollería La Fogata!"
        subtitle="Disfruta del mejor pollo a la brasa, jugoso, crujiente y con ese sabor inconfundible que te encanta. ¡Haz tu pedido ahora!"
      />

      <Container fluid className="px-2 px-md-4 mt-4" style={{ maxWidth: "1800px" }}>
        <div className="menu-wrapper mx-auto">
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
            </div>
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              Error al cargar los productos: {error}
            </Alert>
          )}

          {!loading && !error && (
            <>
              <div className="mb-5">
                <h3 className="fw-bold text-dark text-uppercase section-title mb-4">
                  POLLOS Y COMBOS
                </h3>
                <Row className="g-2 g-md-4">
                  {pollosYCombos.map((prod) => (
                    <Col key={prod.id} xs={6} sm={6} md={4} lg={4}>
                      <ProductCard producto={prod} onAgregar={agregarAlCarrito} />
                    </Col>
                  ))}
                </Row>
              </div>

              <div className="mt-5">
                <h3 className="fw-bold text-dark text-uppercase section-title mb-4">
                  PLATOS EXTRAS
                </h3>
                <Row className="g-2 g-md-4">
                  {platosExtras.map((prod) => (
                    <Col key={prod.id} xs={6} sm={6} md={4} lg={4}>
                      <ProductCard producto={prod} onAgregar={agregarAlCarrito} />
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}