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
        throw new Error("Échec de l'envoi du deblockage des comptes");
      }

      alert("Comptes debloqués avec succès");
      refreshPage(); // Refresh the page after successful submission
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Comptes Bloqués
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-slate-100">
                <th className="py-3 px-6 text-left first:rounded-tl-lg">Nom</th>
                <th className="py-3 px-6 text-left">Prénom</th>
                <th className="py-3 px-6 text-center last:rounded-tr-lg">Débloquer</th>
              </tr>
            </thead>
            <tbody>
              {comptesBloques.map((compte, index) => (
                <tr 
                  key={compte.id_compte}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className={`py-4 px-6 text-gray-700 font-bold ${
                    index === comptesBloques.length - 1 ? 'rounded-bl-lg' : ''
                  }`}>
                    {compte.nom.toUpperCase()} 
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-semibold">
                    {compte.prenom.charAt(0).toUpperCase() + compte.prenom.slice(1).toLowerCase()}
                  </td>
                  <td className={`py-4 px-6 text-center ${
                    index === comptesBloques.length - 1 ? 'rounded-br-lg' : ''
                  }`}>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={bloqueCompte[compte.id_compte] || false}
                      onChange={() => handleCheckboxChange(compte.id_compte)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 w-32"
          >
            Débloquer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompteBloque;
