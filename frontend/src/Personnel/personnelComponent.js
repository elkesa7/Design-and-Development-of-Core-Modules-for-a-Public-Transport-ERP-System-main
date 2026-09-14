import { useEffect, useState } from "react";
import Axios from "../api/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../print.css";

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
};
const deleteButtonStyle = {
  marginTop: "24px",
  backgroundColor: "#e40707",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
const editButtonStyle = {
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

export default function Personnel() {
  const [personnel, setPersonnel] = useState([]);
  useEffect(() => {
    try {
      Axios.get("http://localhost:1234/personnel/")
        .then((res) => {
          setPersonnel(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          Axios.delete(`http://localhost:1234/personnel/${id}`)
            .then(() => {
              Swal.fire(
                {
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                },
                setPersonnel((prev) =>
                  prev.filter((personnels) => personnels._id !== id),
                ),
              );
            })
            .catch((e) => {
              console.log(e.response?.data?.message);
              Swal.fire({
                title: "You can't delete this personnel!",
                text: e.response?.data?.message,
                icon: "error",
              });
            });
        } catch (error) {
          console.log(error.response?.data?.message);
        }
      }
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        width: "100vw",
        overflowX: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/personnel/add" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>Add New Personnel</button>
        </Link>
        <button
          style={{ ...editButtonStyle, marginLeft: "6px", marginTop: "0px" }}
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
      <div className="table-container">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            minWidth: "600px",
            maxWidth: "1100px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Prenom
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Nom
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Id interne
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Role
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Dat mise en service
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                CIN
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Societe affecte
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Numero telephone
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Adresse
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Info permis
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Expiration permis
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Horaires travail
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Salaire
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {personnel.map((personnel, index) => (
              <tr
                key={personnel._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#eef2ff" : "#ffffff",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.prenom}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.nom}
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.id_interne}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.role}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.date_mise_en_service
                    ? personnel.date_mise_en_service.substring(0, 10)
                    : personnel.date_mise_en_service}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.cin}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.societe_affecte}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.numero_telephone}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.adresse}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.info_permis}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.expiration_permis
                    ? personnel.expiration_permis.substring(0, 10)
                    : personnel.expiration_permis}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.horaires_travail}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {personnel.salaire}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <Link to={`/personnel/edit/${personnel._id}`}>
                      <button
                        style={{ ...editButtonStyle, marginRight: "5px" }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => {
                        handleClick(personnel._id);
                      }}
                    >
                      {" "}
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
