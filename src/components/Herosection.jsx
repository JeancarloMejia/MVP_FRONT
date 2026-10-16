import React from "react";
import { Container, Button } from "react-bootstrap";

export function HeroSection({
  title,
  subtitle,
  gradient = "linear-gradient(135deg, #D63447 0%, #9e1b2a 100%)",
  padding = "80px 0",
  textAlign = "center",
  buttonText,
  buttonLink,
  onButtonClick,
  children,
}) {
  return (
    <div 
      className="position-relative overflow-hidden text-white"
      style={{ 
        background: gradient, 
        padding, 
        textAlign,
        marginBottom: "50px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
      }}
    >
      <Container className="position-relative" style={{ zIndex: 2 }}>
        {title && <h1 className="display-4 fw-bold mb-3">{title}</h1>}
        
        {subtitle && (
          <p 
            className="lead fs-4 mx-auto mb-4" 
            style={{ 
              maxWidth: "700px", 
              opacity: "0.95",
              marginLeft: textAlign === "left" ? "0" : "auto",
              marginRight: textAlign === "right" ? "0" : "auto"
            }}
          >
            {subtitle}
          </p>
        )}

        {buttonText && (
          <div className="mt-4">
            <Button 
              variant="light" 
              size="lg" 
              href={buttonLink} 
              onClick={onButtonClick}
              className="fw-bold px-4 py-2 shadow-sm"
            >
              {buttonText}
            </Button>
          </div>
        )}

        {children}
      </Container>
    </div>
  );
}