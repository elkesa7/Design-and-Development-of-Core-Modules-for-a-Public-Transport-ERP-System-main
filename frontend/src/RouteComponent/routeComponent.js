import { useState, useEffect } from "react";
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

export default function RouteCom() {
  const [routes, setRoute] = useState([]);

  useEffect(() => {
    try {
      Axios.get("http://localhost:1234/route/")
        .then((res) => {
          setRoute(res.data.data);
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
          Axios.delete(`http://localhost:1234/route/${id}`)
            .then(() => {
              Swal.fire(
                {
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                },
                setRoute((prev) => prev.filter((routes) => routes._id !== id)),
              );
            })
            .catch((e) => {
              console.log(e.response?.data?.message);
              Swal.fire({
                title: "You can't delete this route!",
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
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/route/add" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>Add New Route</button>
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
                Id interne route
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Nombre de stations
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Nature route
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Centre
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Point depart
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Destination
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Distance
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Heures depart
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  color: "#64748b",
                }}
              >
                Heures arrivee
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
            {routes.map((route, index) => (
              <tr
                key={route._id}
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
                  {route.id_interne}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.nb_stations}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.nature_route}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.centre}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.point_depart}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.destination}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.distance}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.heures_depart}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#2563eb",
                    fontWeight: 600,
                    verticalAlign: "top",
                  }}
                >
                  {route.heures_arrivee}
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
                    <Link to={`/route/edit/${route._id}`}>
                      <button
                        style={{ ...editButtonStyle, marginRight: "5px" }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => {
                        handleClick(route._id);
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
