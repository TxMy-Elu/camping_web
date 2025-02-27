import React, { useEffect, useState } from 'react';

const AllCreneaux = () => {
  const [creneaux, setCreneaux] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCreneaux = async () => {
      const token = localStorage.getItem('token'); // Récupérer le token du localStorage
      if (!token) {
        setError('Token non trouvé');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/creneaux/allCreneaux', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
            'Content-Type': 'application/',
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la récupération des créneaux');
        }

        const data = await response.json();
        setCreneaux(data); // Mettre à jour l'état avec les données récupérées
      } catch (err) {
        console.error(err);
        setError(err.message); // Mettre l'erreur dans l'état en cas d'échec
      }
    };

    fetchCreneaux(); // Appeler la fonction pour récupérer les créneaux
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-center font-bold text-gray-800">All Créneaux</h1>
      {error && <p className="text-red-600 text-center">{error}</p>} {/* Afficher l'erreur s'il y en a une */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creneaux.map((creneau) => (
          <div key={creneau.id_creneaux} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{creneau.nom_animation}</h2>
            <p className="text-gray-700"><strong>Heure et date:</strong> {creneau.date_heure}</p>
            <p className="text-gray-700"><strong>Durée:</strong> {creneau.Duree}h</p>
            <p className="text-gray-700"><strong>Nombre de places:</strong> {creneau.places_totales}</p>
            <p className="text-gray-700"><strong>Places restantes:</strong> {creneau.places_totales - creneau.places_prises}</p>
            <button
              onClick={() => alert('Inscription à implémenter')}
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