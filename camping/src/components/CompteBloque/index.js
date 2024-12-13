import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const CompteBloque = () => {
  const [comptesBloques, setComptesBloques] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/compte/compteBloque`)
      .then(response => setComptesBloques(response.data))
      .catch(error => console.error('Error fetching comptes bloqués:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Comptes Bloqués</h2>
      <ul>
        {comptesBloques.map(compte => (
          <li key={compte.id} className="mb-2">{compte.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompteBloque;
