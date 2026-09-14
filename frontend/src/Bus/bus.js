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

export default function Bus() {
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    try {
      Axios.get(`http://localhost:1234/bus/`)
        .then((res) => {
          setBuses(res.data.data);
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
          Axios.delete(`http://localhost:1234/bus/${id}`)
            .then(() => {
              Swal.fire(
                {
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                },
                setBuses((prev) => prev.filter((buses) => buses._id !== id)),
              );
            })
            .catch((e) => {
              console.log(e.response?.data?.message);
              Swal.fire({
                title: "You can't delete this bus!",
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
        <Link to="/bus/add" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>Add New Bus</button>
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
                Matricule Bus
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
                Bus Societe
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Marque
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Type de bus
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Situation actuelle
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Kilometrage
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Capacite bus
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Nombre de places debout
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Nombre de places assises
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Date fin visite
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Date fin assurance
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Rappels entretien
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
            {buses.map((bus, index) => (
              <tr
                key={bus._id}
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
                  {bus.matricule}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.id_interne}
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.bus_societe}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.bus_marque}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.bus_type}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.situation_actuelle}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.kilometrage}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.capacite_bus}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.nb_places_debout}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.nb_places_assises}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.date_fin_visite
                    ? bus.date_fin_visite.substring(0, 10)
                    : bus.date_fin_visite}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.date_fin_assurance
                    ? bus.date_fin_assurance.substring(0, 10)
                    : bus.date_fin_assurance}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {bus.rappels_entretien}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  <div style={{ display: "flex" }} className="actions">
                    <Link to={`/bus/edit/${bus._id}`}>
                      <button
                        style={{ ...editButtonStyle, marginRight: "5px" }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => {
                        handleClick(bus._id);
                      }}
                    >
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
