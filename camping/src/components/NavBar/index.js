import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    navigate('/auth/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Accueil</Link>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <Link to="/auth/login" className="text-white hover:underline">Se connecter</Link>
          ) : (
            <>
              {userRole === 'admin' && (
                <Link to="/compte/allCompte" className="text-white hover:underline">Comptes</Link>
              )}
              <Link to="/creneaux/allCreneaux" className="text-white hover:underline">Créneaux</Link>
              {userRole === 'admin' && (
                <Link to="/compte/compteBloque" className="text-white hover:underline">Comptes Bloqués</Link>
              )}
              <button 
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                Se déconnecter
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
