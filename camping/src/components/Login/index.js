import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
      // First API call for login
      const loginResponse = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formData.toString(),
      });

      // Check if response is empty
      const responseText = await loginResponse.text();
      console.log('Raw login response:', responseText);

      let loginData;
      try {
        loginData = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('Parse error:', parseError);
        throw new Error('Invalid server response');
      }

      console.log('Login response:', loginData);

      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Authentication failed (403)');
      }

      // Update to use 'token' instead of 'jwt'
      const token = loginData.token;
      if (!token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('jwt', token);

      // Wait for 1 second to ensure token is properly registered
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Second API call for role with Bearer token
      const roleResponse = await fetch('http://localhost:8080/compte/role', {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ jwt: token })
      });

      console.log('Request body:', { jwt: token });
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`
      });

      console.log('Role response status:', roleResponse.status);
      const roleText = await roleResponse.text();
      console.log('Role response text:', roleText);

      if (!roleResponse.ok) {
        console.error('Role response error:', roleText);
        throw new Error(`Failed to fetch user role (${roleResponse.status})`);
      }

      const roleData = roleText ? JSON.parse(roleText) : {};
      console.log('Role data:', roleData);

      // Store the received data
      localStorage.setItem('userRole', roleData.role);
      localStorage.setItem('userId', roleData.id_compte); // Changed to match the response format
      localStorage.setItem('userEmail', roleData.email);
      navigate('/creneaux/allCreneaux');
    } catch (err) {
      console.error('Full error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
