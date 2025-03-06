import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllCreneaux = () => {
  const navigate = useNavigate();
  const [creneaux, setCreneaux] = useState([]);
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
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Échec de la récupération des créneaux");
        }

        const data = await response.json();
        setCreneaux(data); // Mettre à jour l'état avec les données récupérées
      } catch (err) {
        console.error(err);
        setError(err.message); // Mettre l'erreur dans l'état en cas d'échec
      }
    };

    fetchCreneaux(); // Appeler la fonction pour récupérer les créneaux
  }, []);

  const nav = (id) => () => {
    navigate(`../inscription/getRegisteredUsers/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl mb-6 text-center font-extrabold text-gray-900">
        All Créneaux
      </h1>
      {error && <p className="text-red-600 text-center">{error}</p>}{" "}
      {/* Afficher l'erreur s'il y en a une */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creneaux.map((creneau) => (
          <div
            key={creneau.id_creneaux}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              {creneau.nom_animation}
            </h2>
            <p className="text-gray-800 mb-2">
              <strong>Heure et date:</strong> {creneau.date_heure}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Durée:</strong> {creneau.Duree}h
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Nombre de places:</strong> {creneau.places_totales}
            </p>
            <p className="text-gray-800 mb-4">
              <strong>Places restantes:</strong>{" "}
              {creneau.places_totales - creneau.places_prises}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => alert("Inscription à implémenter")}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-300"
              >
                S'inscrire
              </button>
              <button
                onClick={nav(creneau.id_creneaux)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-300"
              >
                Appel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCreneaux;
