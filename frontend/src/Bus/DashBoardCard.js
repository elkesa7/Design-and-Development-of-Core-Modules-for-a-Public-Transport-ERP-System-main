import React, { useEffect, useState } from "react";
import { Bus, ArrowUp, Milestone } from "lucide-react";
import Axios from "../api/axios";

const cardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  padding: "20px 24px",
  width: "260px",
  height: "120px",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  boxSizing: "border-box",
  marginRight: "12px",
  marginBottom: "20px",
};

const labelStyle = {
  color: "#64748b",
  fontSize: "14px",
  margin: 0,
};

const valueStyle = {
  color: "#0f172a",
  fontSize: "36px",
  fontWeight: 800,
  margin: "8px 0",
};

const iconWrapperStyle = {
  backgroundColor: "#eff6ff",
  borderRadius: "12px",
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};
const statusColors = {
  Active: { bg: "#d1fae5", text: "#047857" },
  Completed: { bg: "#aad5fe", text: "#0c67c2" },
  Cancelled: { bg: "#feb8aa", text: "#c2410c" },
};

const wrapperStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  padding: "24px 28px",
  fontFamily: "Arial, sans-serif",
  width: "85%",
};

const titleStyle = {
  color: "#0f172a",
  fontSize: "18px",
  fontWeight: 700,
  margin: 0,
};

const subtitleStyle = {
  color: "#64748b",
  fontSize: "13px",
  margin: "4px 0 20px 0",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

const thStyle = {
  textAlign: "left",
  color: "#64748b",
  fontWeight: 600,
  padding: "0 12px 12px 12px",
  borderBottom: "1px solid #e2e8f0",
};

const tdStyle = {
  padding: "14px 12px",
  color: "#1e293b",
  borderBottom: "1px solid #f1f5f9",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: 600,
};
export default function DashBoardCard() {
  const [movements, setMovements] = useState([]);
  const [countBus, setCountBus] = useState();
  const [countRoute, setCountRoute] = useState();
  useEffect(() => {
    try {
      Axios.get("http://localhost:1234/mouvement/")
        .then((res) => {
          setMovements(res.data.data);
          const activeBuses = res.data.data.filter(
            (bus) => bus.status === "Active",
          );
          setCountBus(activeBuses.length);
          const activeRoutes = res.data.data.filter(
            (bus) => bus.status === "Active",
          );
          setCountRoute(activeRoutes.length);
        })
        .catch((e) => {
          console.log(e.response?.data?.message);
        });
    } catch (error) {}
  }, []);
  return (
    <div style={{ width: "100vw" }}>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={cardStyle}>
          <div>
            <p style={labelStyle}>Bus en service</p>
            <p style={valueStyle}>{countBus}</p>
          </div>

          <div style={iconWrapperStyle}>
            <Bus size={22} color="#2563eb" />
          </div>
        </div>
        <div style={cardStyle}>
          <div>
            <p style={labelStyle}>Lignes actives</p>
            <p style={valueStyle}>{countRoute}</p>
          </div>

          <div style={iconWrapperStyle}>
            <Milestone size={22} color="#059669" />
          </div>
        </div>
      </div>

      <div style={wrapperStyle}>
        <h2 style={titleStyle}>Derniers mouvements</h2>
        <p style={subtitleStyle}>Exemple de données locales, sans serveur</p>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Heure</th>
              <th style={thStyle}>Bus</th>
              <th style={thStyle}>Ligne</th>
              <th style={thStyle}>Départ</th>
              <th style={thStyle}>Destination</th>
              <th style={thStyle}>État</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, i) => {
              const colors = statusColors[movement.status];
              const isLast = i === movements.length - 1;
              return (
                <tr key={i}>
                  <td
                    style={{
                      ...tdStyle,
                      borderBottom: isLast ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    {movement.route_affecte.heures_depart}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      borderBottom: isLast ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    {movement.bus_affecte.id_interne}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      borderBottom: isLast ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    {movement.route_affecte.id_interne}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      borderBottom: isLast ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    {movement.route_affecte.point_depart}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      borderBottom: isLast ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    {movement.route_affecte.destination}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      borderBottom: isLast ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    <span
                      style={{
                        ...badgeStyle,
                        backgroundColor: colors.bg,
                        color: colors.text,
                      }}
                    >
                      {movement.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
