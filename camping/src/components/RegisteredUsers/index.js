import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RegisteredUsers = () => {
  const { activiteId } = useParams();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [absentUsers, setAbsentUsers] = useState({});

  useEffect(() => {
    const fetchCreneaux = async () => {
      const token = localStorage.getItem("token"); // Récupérer le token du localStorage
      if (!token) {
        setError("Token non trouvé");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/inscription/getRegisteredUsers/${activiteId}`,
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
        setUsers(data); // Mettre à jour l'état avec les données récupérées
      } catch (err) {
        console.error(err);
        setError(err.message); // Mettre l'erreur dans l'état en cas d'échec
      }
    };

    fetchCreneaux(); // Appeler la fonction pour récupérer les créneaux
  }, [activiteId]); // Added activiteId to dependency array

  const handleCheckboxChange = (userId) => {
    setAbsentUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log("token:", token);
    if (!token) {
      setError("Token non trouvé");
      return;
    }

    const absentData = Object.keys(absentUsers).map((userId) => ({
      compteId: parseInt(userId),
      estAbsent: absentUsers[userId],
    }));

    console.log("data:", absentData);

    try {
      const response = await fetch("http://localhost:8080/appel/gererAbsence", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(absentData),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi des absences");
      }

      alert("Absences envoyées avec succès");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Registered Users for Activité {activiteId}
      </h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {users.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={user.id_compte || index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">{user.nom}</span>
                  <span className="text-gray-600">{user.prenom}</span>
                </div>
                <label className="flex items-center space-x-2">
                  <span className="text-gray-600">Absent:</span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={absentUsers[user.id_compte] || false}
                    onChange={() => handleCheckboxChange(user.id_compte)}
                  />
                </label>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Submit Absences
          </button>
        </form>
      ) : (
        <p className="text-gray-600">No users registered for this activity.</p>
      )}
    </div>
  );
};

export default RegisteredUsers;
