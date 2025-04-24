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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Comptes Bloqués</h1>
          <p className="mt-2 text-gray-600">
            {comptesBloques.length}{" "}
            {comptesBloques.length > 1 ? "comptes bloqués" : "compte bloqué"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            <p className="font-medium">Une erreur est survenue</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {comptesBloques.length > 0 ? (
              comptesBloques.map((compte, index) => (
                <div
                  key={compte.id_compte}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                    index !== comptesBloques.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-semibold text-lg">
                        {compte.prenom[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {compte.nom.toUpperCase()}{" "}
                        {compte.prenom.charAt(0).toUpperCase()}
                        {compte.prenom.slice(1).toLowerCase()}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Compte bloqué pour absences excessives
                      </p>
                    </div>
                  </div>

                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={bloqueCompte[compte.id_compte] || false}
                      onChange={() => handleCheckboxChange(compte.id_compte)}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Débloquer
                    </span>
                  </label>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucun compte bloqué
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Il n'y a actuellement aucun compte bloqué dans le système.
                </p>
              </div>
            )}
          </div>

          {comptesBloques.length > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Débloquer les comptes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompteBloque;
