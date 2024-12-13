import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const DeleteInscription = () => {
  const [inscriptionId, setInscriptionId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete(`${API_BASE_URL}/inscription/deleteInscription/${inscriptionId}`)
      .then(response => console.log('Inscription deleted:', response.data))
      .catch(error => console.error('Error deleting inscription:', error));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Delete Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Inscription ID</label>
          <input type="text" value={inscriptionId} onChange={(e) => setInscriptionId(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded">Delete</button>
      </form>
    </div>
  );
};

export default DeleteInscription;
