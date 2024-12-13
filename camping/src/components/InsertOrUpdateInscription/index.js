import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const InsertOrUpdateInscription = () => {
  const [formData, setFormData] = useState({
    userId: '',
    activiteId: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/inscription/insertOrUpdateInscription`, formData)
      .then(response => console.log('Inscription updated:', response.data))
      .catch(error => console.error('Error updating inscription:', error));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Insert or Update Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">User ID</label>
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Activité ID</label>
          <input type="text" name="activiteId" value={formData.activiteId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        {/* Add more fields as needed */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default InsertOrUpdateInscription;
