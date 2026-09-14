import React, { useState } from "react";
import { Info } from "lucide-react";
import Axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const wrapperStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  height: "100%",
  padding: "24px 28px",
  maxWidth: "700px",
  fontFamily: "Arial, sans-serif",
};

const titleRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  paddingBottom: "16px",
  borderBottom: "1px solid #e2e8f0",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#1e293b",
  margin: 0,
};

const rowStyle = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const fieldStyle = { flex: 1 };
const requiredStyle = { color: "#dc2626" };

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "14px",
  color: "#334155",
  outline: "none",
};

const confirmButtonStyle = {
  marginTop: "24px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
const cancelButtonStyle = {
  marginTop: "24px",
  marginRight: "8px",
  backgroundColor: "#ffffff",
  color: "#334155",
  fontSize: "14px",
  fontWeight: 600,
  padding: "10px 20px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  cursor: "pointer",
};

export default function AddRoute() {
  const [form, setForm] = useState({
    id_interne: "",
    nb_stations: "",
    nature_route: "",
    centre: "",
    point_depart: "",
    destination: "",
    distance: "",
    heures_depart: "",
    heures_arrivee: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handle = () => {
    try {
      Axios.post("http://localhost:1234/route/", form)
        .then(() => {
          navigate("/route");
        })
        .catch((e) => {
          setError(e.response?.data?.message || "Une erreur est survenue.");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={titleRowStyle}>
        <Info size={20} color="#1e293b" />
        <h2 style={titleStyle}>Route Information</h2>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Id interne <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.id_interne}
            onChange={handleChange("id_interne")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Nombre de stations <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="number"
            value={form.nb_stations}
            onChange={handleChange("nb_stations")}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Nature route <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.nature_route}
            onChange={handleChange("nature_route")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Centre <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.centre}
            onChange={handleChange("centre")}
          />
        </div>
      </div>

      <div style={{ fieldStyle, marginTop: "16px" }}>
        <label style={labelStyle}>
          Point depart <span style={requiredStyle}>*</span>
        </label>
        <input
          style={inputStyle}
          type="text"
          value={form.point_depart}
          onChange={handleChange("point_depart")}
        />
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Destination <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.destination}
            onChange={handleChange("destination")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Distance <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="number"
            value={form.distance}
            onChange={handleChange("distance")}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Heures depart <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.heures_depart}
            onChange={handleChange("heures_depart")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Heures arrivee <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.heures_arrivee}
            onChange={handleChange("heures_arrivee")}
          />
        </div>
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={cancelButtonStyle}
          onClick={() => {
            navigate("/route");
          }}
        >
          Cancel
        </button>
        <button style={confirmButtonStyle} onClick={handle}>
          Confirm
        </button>
      </div>
    </div>
  );
}
