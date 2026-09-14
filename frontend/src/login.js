import React, { useEffect, useState } from "react";
import { Bus, User, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "36px 32px",
  width: "360px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  boxSizing: "border-box",
};

const logoWrapperStyle = {
  backgroundColor: "#0b0f1e",
  width: "56px",
  height: "56px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px auto",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "22px",
  fontWeight: 800,
  color: "#0f172a",
  margin: 0,
};

const subtitleStyle = {
  textAlign: "center",
  fontSize: "13px",
  color: "#64748b",
  margin: "4px 0 28px 0",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px",
};

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "10px 12px",
  marginBottom: "18px",
};

const inputStyle = {
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  color: "#334155",
};

const signInButtonStyle = {
  width: "100%",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 700,
  padding: "12px 0",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default function LoginPage({ setIsLoggedIn }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:1234/auth/signIn", form)
        .then((res) => {
          setIsLoggedIn(true);

          localStorage.setItem("token", res.data.data.token);
          navigate("/");
        })
        .catch((e) => {
          setError(e.response?.data?.message || "Une erreur est survenue.");
        });
    } catch (error) {
      setError(e.response?.data || "Une erreur est survenue.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={pageStyle}>
        <form style={cardStyle} onSubmit={handleSubmit}>
          <div style={logoWrapperStyle}>
            <Bus size={26} color="#ffffff" />
          </div>

          <h1 style={titleStyle}>BusOps ERP</h1>
          <p style={subtitleStyle}>Fleet Management System</p>

          <label style={labelStyle}>Email or Username</label>
          <div style={inputWrapperStyle}>
            <User size={16} color="#94a3b8" />
            <input
              style={inputStyle}
              type="text"
              placeholder="dispatcher@busops.erp"
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>

          <label style={labelStyle}>Password</label>
          <div style={inputWrapperStyle}>
            <Lock size={16} color="#94a3b8" />
            <input
              style={inputStyle}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange("password")}
            />
          </div>
          {error && (
            <div
              style={{
                color: "#dc2626",
                backgroundColor: "#fee2e2",
                border: "1px solid #fecaca",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              {error}
            </div>
          )}
          <button type="submit" style={signInButtonStyle}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
