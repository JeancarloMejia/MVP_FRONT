import React from "react";
import { useFeedbacks } from "../../hooks/useAdmin";

function FeedbacksList() {
  const { feedbacks, loading, error } = useFeedbacks();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
          <p style={{ color: "#4b5563", fontSize: "16px", fontWeight: "500" }}>Cargando opiniones...</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#991b1b", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>Ocurrió un error</h3>
        <p style={{ margin: 0 }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ marginBottom: "32px", borderBottom: "2px solid #f3f4f6", paddingBottom: "16px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "700", color: "#111827" }}>Opiniones de Clientes</h1>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>Revisa los comentarios y mensajes dejados por tus clientes recientes.</p>
      </div>

      {feedbacks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "2px dashed #e5e7eb" }}>
          <p style={{ margin: 0, color: "#4b5563", fontSize: "16px", fontWeight: "500" }}>No hay opiniones registradas por el momento</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>{fb.customer_name}</h3>
                  <span style={{ fontSize: "12px", color: "#9ca3af", backgroundColor: "#f3f4f6", padding: "4px 8px", borderRadius: "6px", fontWeight: "500" }}>
                    {fb.created_at}
                  </span>
                </div>
                
                <div style={{ marginBottom: "16px" }}>
                  <span style={{ display: "inline-block", fontSize: "13px", color: "#4b5563", backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "4px 10px", borderRadius: "20px", fontWeight: "500" }}>
                    Tel: {fb.phone}
                  </span>
                </div>

                <p style={{ margin: "0 0 16px 0", color: "#4b5563", fontSize: "15px", lineHeight: "1.6", fontStyle: "italic", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "8px", borderLeft: "4px solid #3b82f6" }}>
                  "{fb.message}"
                </p>
              </div>

              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>ID: {fb.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbacksList;