import React, { useEffect, useState } from "react";

const CompteBloque = () => {
  const [comptesBloques, setComptesBloques] = useState([]);
  const [error, setError] = useState("");
  const [bloqueCompte, setBloqueCompte] = useState({});

  useEffect(() => {
    const fetchCreneaux = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token non trouvé");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/compte/compteBloque",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Échec de la récupération des comptes bloqués");
        }

        const data = await response.json();
        setComptesBloques(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchCreneaux();
  }, []);

  const handleCheckboxChange = (userId) => {
    setBloqueCompte((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log("token:", token);
    if (!token) {
      setError("Token non trouvé");
      return;
    }

    const absentData = Object.keys(bloqueCompte).map((userId) => ({
      compteId: parseInt(userId),
    }));

    console.log("data:", absentData);

    try {
      const response = await fetch(
        "http://localhost:8080/appel/debloquerCompte",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(absentData[0]), // Send the first object in the array
        }
      );

      if (!response.ok) {
        throw new Error("Échec de l'envoi des absences");
      }

      alert("Absences envoyées avec succès");
      refreshPage(); // Refresh the page after successful submission
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Comptes Bloqués
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <ul className="list-none p-0">
          {comptesBloques.map((compte) => (
            <li
              key={compte.id_compte}
              className="p-4 mb-4 bg-white border border-gray-200 rounded-md flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-gray-700">
                  {compte.nom}
                </span>
                <span className="text-lg text-gray-600">{compte.prenom}</span>
              </div>
              <label className="flex items-center space-x-2">
                <span className="text-gray-600">Absent:</span>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={bloqueCompte[compte.id_compte] || false}
                  onChange={() => handleCheckboxChange(compte.id_compte)}
                />
              </label>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 w-full"
        >
          Submit Absences
        </button>
      </form>
    </div>
  );
};

export default CompteBloque;
