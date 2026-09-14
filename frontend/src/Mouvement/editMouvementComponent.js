import React, { useEffect, useState } from "react";
import { Milestone, ChevronDown } from "lucide-react";
import Axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const wrapperStyle = {
  fontFamily: "Arial, sans-serif",
  maxWidth: "700px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "24px 28px",
};

const titleRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "20px",
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
  marginBottom: "12px",
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

const selectWrapperStyle = {
  position: "relative",
};

const selectStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "10px 36px 10px 12px",
  fontSize: "14px",
  color: "#1e293b",
  outline: "none",
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

export default function EditMouvement() {
  const [form, setForm] = useState({
    route_affecte: "",
    bus_affecte: "",
    chauffeur_affecte: "",
    convoyeur_affecte: "",
    status: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { _id } = useParams();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };
  useEffect(() => {
    try {
      Axios.get(`http://localhost:1234/mouvement/${_id}`)
        .then((res) => {
          setForm({
            route_affecte: res.data.data.route_affecte,
            bus_affecte: res.data.data.bus_affecte,
            chauffeur_affecte: res.data.data.chauffeur_affecte,
            convoyeur_affecte: res.data.data.convoyeur_affecte,
            status: res.data.data.status,
          });
        })
        .catch((e) => {
          console.log(e.respone?.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const [routes_affecte, setRoutes_affecte] = useState([]);
  const [buses_affecte, setbuses_affecte] = useState([]);
  const [chauffeurs_affecte, setChauffeurs_affecte] = useState([]);
  const [convoyeurs_affecte, setConvoyeurs_affecte] = useState([]);

  useEffect(() => {
    try {
      Axios.get("http://localhost:1234/route/")
        .then((res) => {
          const route_affecte = res.data.data.map((route) => ({
            _id: route._id,
            id_interne: route.id_interne,
          }));
          setRoutes_affecte(route_affecte);
        })
        .catch((e) => {
          console.log(e);
        });

      Axios.get("http://localhost:1234/bus/")
        .then((res) => {
          const bus_affecte = res.data.data.map((bus) => ({
            _id: bus._id,
            matricule: bus.matricule,
          }));
          setbuses_affecte(bus_affecte);
        })
        .catch((e) => {
          console.log(e);
        });

      Axios.get("http://localhost:1234/personnel/")
        .then((res) => {
          const chauffeur_affecte = res.data.data
            .filter((personnel) => personnel.role === "chauffeur")
            .map((personnel) => ({
              _id: personnel._id,
              nom_prenom: personnel.nom + " " + personnel.prenom,
            }));

          setChauffeurs_affecte(chauffeur_affecte);

          const convoyeur_affecte = res.data.data
            .filter((personnel) => personnel.role === "convoyeur")
            .map((personnel) => ({
              _id: personnel._id,
              nom_prenom: personnel.nom + " " + personnel.prenom,
            }));

          setConvoyeurs_affecte([...convoyeur_affecte, ...chauffeur_affecte]);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handle = () => {
    try {
      Axios.patch(`http://localhost:1234/mouvement/${_id}`, form)
        .then(() => {
          navigate("/mouvement");
        })
        .catch((e) => {
          console.log(e.response?.data);
          setError(e.response?.data?.message || "Une erreur est survenue.");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={titleRowStyle}>
        <Milestone size={20} color="#2563eb" />
        <h2 style={titleStyle}>Route & Schedule</h2>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Sélectionnez Route <span style={requiredStyle}>*</span>
          </label>
          <div style={selectWrapperStyle}>
            <select
              style={selectStyle}
              value={form.route_affecte._id}
              onChange={handleChange("route_affecte")}
            >
              <option value="">Sélectionnez route...</option>

              {routes_affecte.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.id_interne}
                </option>
              ))}
            </select>
            <ChevronDown size={16} style={chevronStyle} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Sélectionnez Bus affecté <span style={requiredStyle}>*</span>
          </label>
          <div style={selectWrapperStyle}>
            <select
              style={selectStyle}
              value={form.bus_affecte._id}
              onChange={handleChange("bus_affecte")}
            >
              <option value="">Sélectionnez Bus</option>
              {buses_affecte.map((bus) => (
                <option key={bus._id} value={bus._id}>
                  {bus.matricule}
                </option>
              ))}
            </select>
            <ChevronDown size={16} style={chevronStyle} />
          </div>
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Sélectionnez chauffeur affecté <span style={requiredStyle}>*</span>
          </label>
          <div style={selectWrapperStyle}>
            <select
              style={selectStyle}
              value={form.chauffeur_affecte._id}
              onChange={handleChange("chauffeur_affecte")}
            >
              <option value="">Sélectionnez chauffeur...</option>
              {chauffeurs_affecte.map((chauffeur) => (
                <option key={chauffeur?._id} value={chauffeur?._id}>
                  {chauffeur?.nom_prenom}
                </option>
              ))}
            </select>
            <ChevronDown size={16} style={chevronStyle} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Sélectionnez convoyeur affecté <span style={requiredStyle}>*</span>
          </label>
          <div style={selectWrapperStyle}>
            <select
              style={selectStyle}
              value={form.convoyeur_affecte._id}
              onChange={handleChange("convoyeur_affecte")}
            >
              <option value="">Sélectionnez convoyeur</option>

              {convoyeurs_affecte.map((convoyeur) => (
                <option key={convoyeur?._id} value={convoyeur?._id}>
                  {convoyeur?.nom_prenom}
                </option>
              ))}
            </select>
            <ChevronDown size={16} style={chevronStyle} />
          </div>
        </div>
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>
          Sélectionner le statut <span style={requiredStyle}>*</span>
        </label>
        <div style={selectWrapperStyle}>
          <select
            style={selectStyle}
            value={form.status}
            onChange={handleChange("status")}
          >
            <option value="">Sélectionnez le statut de la route...</option>
            <option key="Active" value="Active">
              Active
            </option>
            <option key="Completed" value="Completed">
              Completed
            </option>
            <option key="Cancelled" value="Cancelled">
              Cancelled
            </option>
          </select>
          <ChevronDown size={16} style={chevronStyle} />
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
            navigate("/mouvement");
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
