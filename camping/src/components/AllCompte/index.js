import React, { useEffect, useState } from 'react';

const AllCompte = () => {
  const [comptes, setComptes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComptes = async () => {
      const token = localStorage.getItem('token'); // Récupérer le token du localStorage
      if (!token) {
        setError('Token non trouvé');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/compte/allCompte', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
            'Content-Type': 'application/json', // Content-Type correctement défini
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la récupération des comptes');
        }

        const data = await response.json();
        setComptes(data); // Mettre à jour l'état avec les données récupérées
      } catch (err) {
        console.error(err);
        setError(err.message); // Mettre l'erreur dans l'état en cas d'échec
      }
    };

    fetchComptes(); // Appeler la fonction pour récupérer les comptes
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">All Comptes</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Afficher le message d'erreur */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comptes.length > 0 ? (
          comptes.map((compte) => (
            <div key={compte.id_compte} className="bg-white p-4 rounded shadow-md">
              <p><strong>Nom:</strong> {compte.nom}</p>
              <p><strong>Prénom:</strong> {compte.prenom}</p>
              <p><strong>Email:</strong> {compte.email}</p>
              <p><strong>Rôle:</strong> {compte.role}</p>
              <p><strong>Absences:</strong> {compte.absences}</p>
              <p><strong>Compte bloqué:</strong> {compte.compteBloque ? 'Oui' : 'Non'}</p>
            </div>
          ))
        ) : (
          <div className="text-red-500">Aucun compte trouvé</div>
        )}
      </div>
    </div>
  );
};

export default AllCompte;
