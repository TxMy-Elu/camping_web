import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const AllCompte = () => {
  const [comptes, setComptes] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/compte/allCompte`)
      .then(response => {
        console.log('API response:', response.data); // Vérifiez la réponse de l'API
        setComptes(response.data);
      })
      .catch(error => console.error('Error fetching comptes:', error));
  }, []);

  console.log('Comptes:', comptes); // Vérifiez les données des comptes

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">All Comptes</h2>
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