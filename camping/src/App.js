import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import AllCompte from "./components/AllCompte";
import CompteBloque from "./components/CompteBloque";
import AllCreneaux from "./components/AllCreneaux";
import RegisteredUsers from "./components/RegisteredUsers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/compte/allCompte"
            element={
              <ProtectedRoute
                element={<AllCompte />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/compte/compteBloque"
            element={
              <ProtectedRoute
                element={<CompteBloque />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/creneaux/allCreneaux"
            element={
              <ProtectedRoute
                element={<AllCreneaux />}
                allowedRoles={["client", "admin", "animateur"]}
              />
            }
          />
          <Route
            path="/inscription/getRegisteredUsers/:activiteId"
            element={
              <ProtectedRoute
                element={<RegisteredUsers />}
                allowedRoles={["admin", "animateur", "client"]}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
