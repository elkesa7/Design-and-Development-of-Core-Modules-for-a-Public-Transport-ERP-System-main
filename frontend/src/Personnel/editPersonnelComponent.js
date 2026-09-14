import { useEffect, useState } from "react";
import Axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const wrapperStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  height: "100%",
  padding: "24px 28px",
  maxWidth: "700px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#1e293b",
  margin: "0 0 12px 0",
  paddingBottom: "16px",
  borderBottom: "1px solid #e2e8f0",
};

const rowStyle = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const fieldStyle = { flex: 1 };

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px",
};

const requiredStyle = { color: "#dc2626" };

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "10px 12px",
};

const inputStyle = {
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  color: "#334155",
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

export default function EditPersonal() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    id_interne: "",
    role: "",
    date_mise_en_service: "",
    cin: "",
    societe_affecte: "",
    numero_telephone: "",
    adresse: "",
    info_permis: "",
    expiration_permis: "",
    horaires_travail: "",
    salaire: "",
  });
  const [error, setError] = useState("");

  const { _id } = useParams();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  useEffect(() => {
    Axios.get(`http://localhost:1234/personnel/${_id}`).then((res) => {
      setForm({
        prenom: res.data.data.prenom,
        nom: res.data.data.nom,
        id_interne: res.data.data.id_interne,
        role: res.data.data.role,
        date_mise_en_service: res.data.data.date_mise_en_service.split("T")[0],
        cin: res.data.data.cin,
        societe_affecte: res.data.data.societe_affecte,
        numero_telephone: res.data.data.numero_telephone,
        adresse: res.data.data.adresse,
        info_permis: res.data.data.info_permis,
        expiration_permis: res.data.data.expiration_permis.split("T")[0],
        horaires_travail: res.data.data.horaires_travail,
        salaire: res.data.data.salaire,
      });
    });
  }, []);
  const handle = () => {
    try {
      Axios.patch(`http://localhost:1234/personnel/${_id}`, form)
        .then(() => {
          navigate("/personnel");
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
      <h2 style={titleStyle}>Personal Information</h2>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Prenom <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.prenom}
              onChange={handleChange("prenom")}
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Nom<span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.nom}
              onChange={handleChange("nom")}
            />
          </div>
        </div>
      </div>

      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>
            Id interne <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.id_interne}
              onChange={handleChange("id_interne")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>
            Role <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.role}
              onChange={handleChange("role")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>
            Date mise en service <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="date"
              value={form.date_mise_en_service}
              onChange={handleChange("date_mise_en_service")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>
            CIN <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.cin}
              onChange={handleChange("cin")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>
            Societe affecte <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.societe_affecte}
              onChange={handleChange("societe_affecte")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>
            Numero telephone <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.numero_telephone}
              onChange={handleChange("numero_telephone")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>
            Adresse <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.adresse}
              onChange={handleChange("adresse")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>Info Permis</label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.info_permis}
              onChange={handleChange("info_permis")}
            />
          </div>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ ...fieldStyle, flex: "unset", width: "100%" }}>
          <label style={labelStyle}>Expiration Permis</label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="date"
              value={form.expiration_permis}
              onChange={handleChange("expiration_permis")}
            />
          </div>
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Horaires travail <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="text"
              value={form.horaires_travail}
              onChange={handleChange("horaires_travail")}
            />
          </div>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Salaire <span style={requiredStyle}>*</span>
          </label>
          <div style={inputWrapperStyle}>
            <input
              style={inputStyle}
              type="number"
              value={form.salaire}
              onChange={handleChange("salaire")}
            />
          </div>
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
            navigate("/personnel");
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
