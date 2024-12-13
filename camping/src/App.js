import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import AllCompte from './components/AllCompte';
import CompteDetails from './components/CompteDetails';
import CompteBloque from './components/CompteBloque';
import AllCreneaux from './components/AllCreneaux';
import InsertOrUpdateInscription from './components/InsertOrUpdateInscription';
import DeleteInscription from './components/DeleteInscription';
import RegisteredUsers from './components/RegisteredUsers';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/compte/allCompte" element={<AllCompte />} />
          <Route path="/compte/:id" element={<CompteDetails />} />
          <Route path="/compte/compteBloque" element={<CompteBloque />} />
          <Route path="/creneaux/allCreneaux" element={<AllCreneaux />} />
          <Route path="/inscription/insertOrUpdateInscription" element={<InsertOrUpdateInscription />} />
          <Route path="/inscription/deleteInscription" element={<DeleteInscription />} />
          <Route path="/inscription/getRegisteredUsers/:activiteId" element={<RegisteredUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
