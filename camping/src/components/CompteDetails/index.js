import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../../config';

const CompteDetails = () => {
  const { id } = useParams();
  const [compte, setCompte] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/compte/${id}`)
      .then(response => setCompte(response.data))
      .catch(error => console.error('Error fetching compte:', error));
  }, [id]);

  if (!compte) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Compte Details</h2>
      <p>Name: {compte.name}</p>
      <p>Email: {compte.email}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CompteDetails;
