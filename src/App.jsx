import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ScrollToTop from "./components/ScrollTop";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";

import Dashboard from "./pages/admin/Dashboard";
import Revenue from "./pages/admin/Revenue";
import FeedbacksList from "./pages/admin/FeedbacksList";

function App() {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/tracking/:orderId" element={<Tracking />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="feedbacks" element={<FeedbacksList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </Router>
  );
}

export default App;