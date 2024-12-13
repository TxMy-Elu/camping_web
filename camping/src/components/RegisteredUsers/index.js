import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../../config';

const RegisteredUsers = () => {
  const { activiteId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/inscription/getRegisteredUsers/${activiteId}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching registered users:', error));
  }, [activiteId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Registered Users for Activité {activiteId}</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2">{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RegisteredUsers;
