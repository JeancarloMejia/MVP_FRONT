import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../assets/logo.png";

function MyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarStyle = {
    transition: "all 0.3s ease",
    backgroundColor: scrolled ? "#121212" : "#181515",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
    borderBottom: "none",
  };

  const baseLinkStyle = {
    color: "#f0f0f0",
    fontWeight: "500",
    fontSize: "1.25rem",
    padding: "10px 18px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  };

  const getLinkStyle = (name) => {
    if (hoveredLink === name) {
      return { 
        ...baseLinkStyle, 
        color: "#ffffff", 
        backgroundColor: "#FF4D4D",
      };
    }
    return baseLinkStyle;
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={navbarStyle}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="py-3"
    >
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center p-0 m-0"
          as={Link}
          to="/"
          onClick={() => setExpanded(false)}
        >
          <img
            src={Logo}
            alt="Logo La Fogata"
            style={{ 
              height: "85px", 
              width: "auto", 
              objectFit: "contain",
              filter: "drop-shadow(0 2px 10px rgba(255, 77, 77, 0.3))"
            }}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="border-0 shadow-none"
          style={{ filter: "invert(1) grayscale(100%) brightness(200%)" }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2 gap-lg-3 mt-3 mt-lg-0">
            <Nav.Link
              as={Link}
              to="/"
              style={getLinkStyle("Inicio")}
              onClick={() => setExpanded(false)}
              onMouseEnter={() => setHoveredLink("Inicio")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/tracking"
              style={getLinkStyle("Tracking")}
              onClick={() => setExpanded(false)}
              onMouseEnter={() => setHoveredLink("Tracking")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Seguir Pedido
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/feedback"
              style={getLinkStyle("Feedback")}
              onClick={() => setExpanded(false)}
              onMouseEnter={() => setHoveredLink("Feedback")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Opiniones
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/login"
              style={getLinkStyle("Login")}
              onClick={() => setExpanded(false)}
              onMouseEnter={() => setHoveredLink("Login")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;