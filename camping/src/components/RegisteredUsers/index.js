import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RegisteredUsers = () => {
  const { activiteId } = useParams();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [absentUsers, setAbsentUsers] = useState({});

  useEffect(() => {
    const fetchCreneaux = async () => {
      const token = localStorage.getItem("token");
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
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Response status:', response.status);
          console.error('Error details:', errorData);
          throw new Error(`Échec de la récupération des créneaux: ${response.status} ${errorData}`);
        }

        const data = await response.json();
        console.log('Received data:', data); // Debug log
        setUsers(data);
        
        const initialAbsentState = {};
        data.forEach(user => {
          if (user.estAbs) {
            initialAbsentState[user.id_compte] = true;
          }
        });
        setAbsentUsers(initialAbsentState);
      } catch (err) {
        console.error('Detailed error:', err);
        setError(`Error: ${err.message}`);
      }
    };

    fetchCreneaux();
  }, [activiteId]);

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
      } else {
        window.location.reload();
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
        Liste des inscrits - Activité {activiteId}
      </h2>

      {users.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Nom</th>
                  <th className="px-6 py-3 text-left">Prénom</th>
                  <th className="px-6 py-3 text-center">Absent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr 
                    key={user.id_compte || index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-700">{user.nom.toUpperCase()}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {user.prenom.charAt(0).toUpperCase() + user.prenom.slice(1)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                        checked={absentUsers[user.id_compte] || user.estAbsent || false}
                        onChange={() => handleCheckboxChange(user.id_compte)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Enregistrer les absences
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center p-8">
          <p className="text-xl text-gray-600">
            Aucune personne n'est inscrite pour cette activité.
          </p>
          <p className="text-gray-500 mt-2">
            Les inscriptions apparaîtront ici une fois que des personnes se seront inscrites.
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisteredUsers;
