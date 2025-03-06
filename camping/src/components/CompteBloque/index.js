import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const CompteBloque = () => {
  const [comptesBloques, setComptesBloques] = useState([]);
    const [error, setError] = useState("");

  useEffect(() => {
    const fetchCreneaux = async () => {
      const token = localStorage.getItem("token"); // Récupérer le token du localStorage
      if (!token) {
        setError("Token non trouvé");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/creneaux/allCreneaux",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
              "Content-Type": "application/",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Échec de la récupération des créneaux");
        }

        const data = await response.json();
        //setCreneaux(data); // Mettre à jour l'état avec les données récupérées
      } catch (err) {
        console.error(err);
        setError(err.message); // Mettre l'erreur dans l'état en cas d'échec
      }
    };

    fetchCreneaux(); // Appeler la fonction pour récupérer les créneaux
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
