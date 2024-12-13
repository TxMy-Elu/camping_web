import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Accueil</Link>
        <div className="space-x-4">
          <Link to="/auth/login" className="text-white hover:underline">Se connecter</Link>
          <Link to="/compte/allCompte" className="text-white hover:underline">Comptes</Link>
          <Link to="/creneaux/allCreneaux" className="text-white hover:underline">Créneaux</Link>
          <Link to="/inscription/insertOrUpdateInscription" className="text-white hover:underline">Inscriptions</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
