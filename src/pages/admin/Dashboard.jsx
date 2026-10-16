import React from "react";
import { useActiveOrders } from "../../hooks/useAdmin";

function Dashboard() {
  const { orders, loading, error, advanceOrderState, cancelOrder } = useActiveOrders();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pendiente":
        return { bg: "#FEF3C7", text: "#D97706", border: "#FCD34D" };
      case "en preparación":
      case "preparando":
        return { bg: "#E0F2FE", text: "#0284C7", border: "#7DD3FC" };
      case "listo":
      case "en camino":
        return { bg: "#DCFCE7", text: "#15803D", border: "#86EFAC" };
      default:
        return { bg: "#F3F4F6", text: "#4B5563", border: "#E5E7EB" };
    }
  };

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Cargando pedidos activos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.errorCard}>
          <span style={{ fontSize: "2rem" }}>⚠️</span>
          <p style={styles.errorText}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .order-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.12) !important;
        }
        .btn-advance {
          background-color: #2563EB;
          color: #FFFFFF;
          border: 1px solid #1D4ED8;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .btn-advance:hover {
          background-color: #1D4ED8;
        }
        .btn-advance:active {
          transform: scale(0.98);
        }
        .btn-cancel {
          background-color: #FFFFFF;
          color: #DC2626;
          border: 1px solid #FECACA;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
        }
        .btn-cancel:hover {
          background-color: #FEF2F2;
          border-color: #FCA5A5;
        }
        .btn-cancel:active {
          transform: scale(0.98);
        }
      `}</style>

      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard de Pedidos</h1>
          <p style={styles.subtitle}>Gestión y seguimiento en tiempo real</p>
        </div>
        <div style={styles.counterBadge}>
          {orders.length} {orders.length === 1 ? "pedido activo" : "pedidos activos"}
        </div>
      </header>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <h3 style={styles.emptyTitle}>No hay pedidos activos</h3>
          <p style={styles.emptySubtitle}>Los nuevos pedidos aparecerán aquí automáticamente.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {orders.map((order, index) => {
            const statusStyle = getStatusColor(order.status);
            return (
              <div
                key={order.id}
                className="order-card"
                style={{
                  ...styles.card,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div style={styles.cardHeader}>
                  <div>
                    <span style={styles.orderNumber}>Pedido #{order.id}</span>
                    <span style={styles.orderType}>{order.order_type}</span>
                  </div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text,
                      borderColor: statusStyle.border,
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <div style={styles.customerSection}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Cliente:</span>
                    <span style={styles.infoValue}>{order.customer_name}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Teléfono:</span>
                    <span style={styles.infoValue}>{order.customer_phone}</span>
                  </div>
                </div>

                <div style={styles.itemsSection}>
                  <h4 style={styles.itemsTitle}>Productos</h4>
                  <ul style={styles.itemList}>
                    {order.items.map((item, idx) => (
                      <li key={idx} style={styles.itemRow}>
                        <span style={styles.itemDetails}>
                          <strong style={styles.itemQty}>{item.quantity}x</strong> {item.product_name}
                        </span>
                        <span style={styles.itemSubtotal}>${item.subtotal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={styles.totalRow}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalAmount}>${order.total_amount}</span>
                </div>

                <div style={styles.actions}>
                  <button
                    className="btn-advance"
                    style={styles.button}
                    onClick={() => advanceOrderState(order.id)}
                  >
                    Avanzar Estado
                  </button>
                  <button
                    className="btn-cancel"
                    style={{ ...styles.button, ...styles.buttonCancel }}
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    margin: 0,
    color: "#0F172A",
    letterSpacing: "-0.025em",
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "0.875rem",
    color: "#64748B",
  },
  counterBadge: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    border: "1px solid #BFDBFE",
    padding: "6px 14px",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    padding: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    animation: "fadeIn 0.35s ease forwards",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: "12px",
    borderBottom: "1px solid #F1F5F9",
    marginBottom: "12px",
  },
  orderNumber: {
    fontSize: "1.125rem",
    fontWeight: "700",
    color: "#0F172A",
    display: "block",
  },
  orderType: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#64748B",
    fontWeight: "600",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "0.75rem",
    fontWeight: "600",
    border: "1px solid",
    textTransform: "capitalize",
  },
  customerSection: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.875rem",
  },
  infoLabel: {
    color: "#64748B",
  },
  infoValue: {
    fontWeight: "500",
    color: "#334155",
  },
  itemsSection: {
    backgroundColor: "#F8FAFC",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "16px",
    border: "1px solid #F1F5F9",
  },
  itemsTitle: {
    margin: "0 0 8px 0",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#64748B",
    fontWeight: "700",
  },
  itemList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.875rem",
  },
  itemDetails: {
    color: "#334155",
  },
  itemQty: {
    color: "#2563EB",
  },
  itemSubtotal: {
    color: "#64748B",
    fontSize: "0.8125rem",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "8px",
    marginBottom: "16px",
    borderTop: "1px solid #E2E8F0",
  },
  totalLabel: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#0F172A",
  },
  totalAmount: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#0F172A",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  button: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "0.875rem",
    cursor: "pointer",
    outline: "none",
  },
  buttonCancel: {
    flex: "0 0 auto",
  },
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #E2E8F0",
    borderTop: "3px solid #2563EB",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    marginTop: "16px",
    color: "#64748B",
    fontSize: "0.95rem",
  },
  errorCard: {
    backgroundColor: "#FEF2F2",
    border: "1px solid #FECACA",
    padding: "24px 32px",
    borderRadius: "16px",
    textAlign: "center",
  },
  errorText: {
    color: "#991B1B",
    fontWeight: "600",
    margin: "8px 0 0 0",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    padding: "48px 24px",
    textAlign: "center",
    maxWidth: "400px",
    margin: "40px auto 0 auto",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "12px",
  },
  emptyTitle: {
    fontSize: "1.125rem",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#0F172A",
  },
  emptySubtitle: {
    fontSize: "0.875rem",
    color: "#64748B",
    margin: 0,
  },
};

export default Dashboard;