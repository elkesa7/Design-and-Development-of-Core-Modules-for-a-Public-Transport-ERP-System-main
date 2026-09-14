import Axios from "../api/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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

export default function Mouvement() {
  const [mouvements, setMouvement] = useState([]);
  useEffect(() => {
    try {
      Axios.get("http://localhost:1234/mouvement/")
        .then((res) => {
          setMouvement(res.data.data);
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
          Axios.delete(`http://localhost:1234/mouvement/${id}`)
            .then(
              setMouvement((prev) =>
                prev.filter((mouvements) => mouvements._id !== id),
              ),
            )
            .catch((e) => {
              console.log(e);
            });
        } catch (error) {
          console.log(error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link to="/mouvement/add" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>Add New Mouvement</button>
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
                Route affecte
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Bus affecte
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Chauffeur affecte
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Convoyeur affecte
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Status
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
            {mouvements.map((mouvement, index) => (
              <tr
                key={mouvement._id}
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
                  {mouvement.route_affecte.id_interne}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {mouvement.bus_affecte.matricule}
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {mouvement.chauffeur_affecte?.prenom +
                    " " +
                    mouvement.chauffeur_affecte?.nom}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {mouvement.convoyeur_affecte?.prenom +
                    " " +
                    mouvement.convoyeur_affecte?.nom}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {mouvement.status}
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
                    <Link to={`/mouvement/edit/${mouvement._id}`}>
                      <button
                        style={{ ...editButtonStyle, marginRight: "5px" }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => {
                        handleClick(mouvement._id);
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
