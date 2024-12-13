import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const AllCreneaux = () => {
  const [creneaux, setCreneaux] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/creneaux/allCreneaux`)
      .then(response => setCreneaux(response.data))
      .catch(error => console.error('Error fetching créneaux:', error));
  }, []);

  console.log(creneaux);

  const handleInscription = (id_creneaux) => {
    // Logique pour gérer l'inscription
    console.log(`Inscription au créneau ${id_creneaux}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-center font-bold text-gray-800">All Créneaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creneaux.map((creneau) => (
          <div key={creneau.id_creneaux} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{creneau.nom_animation}</h2>
            <p className="text-gray-700"><strong>Heure et date:</strong> {creneau.date_heure}</p>
            <p className="text-gray-700"><strong>Durée:</strong> {creneau.Duree}h</p>
            <p className="text-gray-700"><strong>Nombre de places:</strong> {creneau.places_totales}</p>
            <p className="text-gray-700"><strong>Places restantes:</strong> {creneau.places_totales - creneau.places_prises}</p>
            <button
              onClick={() => handleInscription(creneau.id_creneaux)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              S'inscrire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCreneaux;