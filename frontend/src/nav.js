import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bus,
  Milestone,
  Truck,
  Users,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  { key: "fleet", label: "Fleet Management", icon: Bus, path: "/bus" },
  { key: "routes", label: "Route Planner", icon: Milestone, path: "/route" },
  { key: "mouvements", label: "Mouvements", icon: Truck, path: "/mouvement" },
  { key: "staff", label: "Staff Directory", icon: Users, path: "/personnel" },
];

const sidebarStyle = {
  height: "95vh",
  width: "256px",
  backgroundColor: "#0b0f1e",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "24px 12px",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
  flexShrink: "0",
  marginRight: "20px",
};
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#ffffff",
  color: "#dc2626",
  fontSize: "14px",
  fontWeight: 600,
  padding: "10px 16px",
  border: "1px solid #fecaca",
  borderRadius: "8px",
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  color: "#fff",
  fontWeight: 700,
  fontSize: "18px",
  margin: 0,
};
const subtitleStyle = { color: "#64748b", fontSize: "12px", marginTop: "4px" };

const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 12px",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#94a3b8",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  textDecoration: "none",
  boxSizing: "border-box",
};

const activeItemStyle = {
  ...itemStyle,
  backgroundColor: "#2563eb",
  color: "#fff",
  fontWeight: 600,
};

export default function Nav({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <div style={sidebarStyle}>
      <div>
        <div style={{ padding: "0 12px", marginBottom: "32px" }}>
          <h1 style={titleStyle}>BusOps ERP</h1>
          <p style={subtitleStyle}>Fleet Management System</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.key}
                to={item.path}
                style={({ isActive }) =>
                  isActive ? activeItemStyle : itemStyle
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <button type="button" style={buttonStyle} onClick={handleLogout}>
        <LogOut size={16} strokeWidth={2.5} />
        Log Out
      </button>
    </div>
  );
}
