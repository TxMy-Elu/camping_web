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
    <div className="p-4">
      <h2 className="text-2xl mb-4">
        Registered Users for Activité {activiteId}
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {users.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <ul>
            {users.map((user, index) => (
              <li key={user.id_compte || index} className="mb-2">
                {user.nom}
                <label className="inline-block ml-4">
                  Absent:
                  <input
                    type="checkbox"
                    checked={absentUsers[user.id_compte] || false}
                    onChange={() => handleCheckboxChange(user.id_compte)}
                  />
                </label>
              </li>
            ))}
          </ul>
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">
            Submit Absences
          </button>
        </form>
      ) : (
        <p>No users registered for this activity.</p>
      )}
    </div>
  );
};

export default RegisteredUsers;
