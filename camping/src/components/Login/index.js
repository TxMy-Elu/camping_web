import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur au début de chaque soumission

    // Création du body dans le format x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
      // Envoi des données à l'API pour la connexion avec x-www-form-urlencoded
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(), // Encodage des données dans le format attendu par l'API
      });

      // Lecture de la réponse brute
      const text = await response.text();
      //console.log('Réponse brute:', text); // Debug : vérifier ce qui est renvoyé par l'API

      const data = text ? JSON.parse(text) : {}; // Parse la réponse JSON

      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }

      if (!data.token) {
        throw new Error('Aucun token reçu');
      }

      // Stockage du token dans localStorage
      localStorage.setItem('token', data.token);
     
      console.log("connecté");
      navigate('/creneaux/allCreneaux');
      // Redirection ou autre action à effectuer après connexion réussie
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message); // Affichage de l'erreur dans l'interface utilisateur
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Affichage de l'erreur si présente */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
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
