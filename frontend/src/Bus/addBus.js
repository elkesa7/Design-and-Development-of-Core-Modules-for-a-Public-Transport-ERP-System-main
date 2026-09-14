import React, { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import Axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const wrapperStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  height: "100%",
  borderRadius: "12px",
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

const selectWrapperStyle = {
  position: "relative",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
  backgroundColor: "#ffffff",
  cursor: "pointer",
};

const chevronStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#64748b",
  pointerEvents: "none",
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

export default function AddBus() {
  const [form, setForm] = useState({
    matricule: "",
    id_interne: "",
    bus_societe: "",
    bus_marque: "",
    bus_type: "",
    situation_actuelle: "",
    kilometrage: "",
    capacite_bus: "",
    nb_places_debout: "",
    nb_places_assises: "",
    date_fin_visite: "",
    date_fin_assurance: "",
    rappels_entretien: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handle = () => {
    try {
      Axios.post("http://localhost:1234/bus/", form)
        .then(() => {
          navigate("/bus");
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
        <h2 style={titleStyle}>Bus Information</h2>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Matricule <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.matricule}
            onChange={handleChange("matricule")}
          />
        </div>

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
      </div>
      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Bus Societe <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.bus_societe}
            onChange={handleChange("bus_societe")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Bus Marque <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="text"
            value={form.bus_marque}
            onChange={handleChange("bus_marque")}
          />
        </div>
      </div>
      <div style={{ fieldStyle, marginTop: "16px" }}>
        <label style={labelStyle}>
          Bus type <span style={requiredStyle}>*</span>
        </label>
        <div style={selectWrapperStyle}>
          <select
            style={selectStyle}
            value={form.bus_type}
            onChange={handleChange("bus_type")}
          >
            <option value="">Select Manufacturer</option>
            <option value="volvo">Volvo</option>
            <option value="minibus ">minibus</option>
            <option value="scania">Scania</option>
            <option value="byd">BYD</option>
          </select>
          <ChevronDown size={16} style={chevronStyle} />
        </div>
      </div>

      <div style={{ fieldStyle, marginTop: "16px" }}>
        <label style={labelStyle}>
          Situation Actuelle <span style={requiredStyle}>*</span>
        </label>
        <input
          style={inputStyle}
          type="text"
          value={form.situation_actuelle}
          onChange={handleChange("situation_actuelle")}
        />
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Kilometrage <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="number"
            value={form.kilometrage}
            onChange={handleChange("kilometrage")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Capacite Bus <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="number"
            value={form.capacite_bus}
            onChange={handleChange("capacite_bus")}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Nombre de places debout <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="number"
            value={form.nb_places_debout}
            onChange={handleChange("nb_places_debout")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Nombre de places assises <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="number"
            value={form.nb_places_assises}
            onChange={handleChange("nb_places_assises")}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Date fin visite <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="date"
            value={form.date_fin_visite}
            onChange={handleChange("date_fin_visite")}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Date fin assurance <span style={requiredStyle}>*</span>
          </label>
          <input
            style={inputStyle}
            type="date"
            value={form.date_fin_assurance}
            onChange={handleChange("date_fin_assurance")}
          />
        </div>
      </div>
      <div style={{ fieldStyle, marginTop: "16px" }}>
        <label style={labelStyle}>
          Rappels entretien <span style={requiredStyle}>*</span>
        </label>
        <input
          style={inputStyle}
          type="text"
          value={form.rappels_entretien}
          onChange={handleChange("rappels_entretien")}
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={cancelButtonStyle}
          onClick={() => {
            navigate("/bus");
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
