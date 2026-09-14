import "./App.css";
import Nav from "./nav";
import Bus from "./Bus/bus";
import Mouvement from "./Mouvement/mouvementComponent";
import RouteCom from "./RouteComponent/routeComponent";
import Personnel from "./Personnel/personnelComponent";
import AddPersonnel from "./Personnel/addPersonnelComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddBus from "./Bus/addBus";
import AddRoute from "./RouteComponent/addRoute";
import EditBus from "./Bus/editBus";
import EditRoute from "./RouteComponent/editRoute";
import EditPersonal from "./Personnel/editPersonnelComponent";
import AddMouvement from "./Mouvement/addMouvementComponent";
import EditMouvement from "./Mouvement/editMouvementComponent";
import DashBoardCard from "./Bus/DashBoardCard";
import LoginPage from "./login";
import { useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  return (
    <>
      {!isLoggedIn ? (
        // NOT LOGGED IN
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        // LOGGED IN
        <div className="container">
          <Nav setIsLoggedIn={setIsLoggedIn} />

          <Routes>
            <Route path="/mouvement" element={<Mouvement />} />
            <Route path="/mouvement/add" element={<AddMouvement />} />
            <Route path="/mouvement/edit/:_id" element={<EditMouvement />} />

            <Route path="/personnel" element={<Personnel />} />
            <Route path="/personnel/add" element={<AddPersonnel />} />
            <Route path="/personnel/edit/:_id" element={<EditPersonal />} />

            <Route path="/bus" element={<Bus />} />
            <Route path="/bus/add" element={<AddBus />} />
            <Route path="/bus/edit/:_id" element={<EditBus />} />

            <Route path="/route" element={<RouteCom />} />
            <Route path="/route/add" element={<AddRoute />} />
            <Route path="/route/edit/:_id" element={<EditRoute />} />

            <Route path="/" element={<DashBoardCard />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
