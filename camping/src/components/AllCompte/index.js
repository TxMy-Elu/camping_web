import React, { useEffect, useState } from "react";

const AllCompte = () => {
  const [comptes, setComptes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComptes = async () => {
      const token = localStorage.getItem("token"); // Récupérer le token du localStorage
      if (!token) {
        setError("Token non trouvé");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/compte/allCompte", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
            "Content-Type": "application/json", // Content-Type correctement défini
          },
        });

        if (!response.ok) {
          throw new Error("Échec de la récupération des comptes");
        }

        const data = await response.json();
        setComptes(data); // Mettre à jour l'état avec les données récupérées
      } catch (err) {
        console.error(err);
        setError(err.message); // Mettre l'erreur dans l'état en cas d'échec
      }
    };

    fetchComptes(); // Appeler la fonction pour récupérer les comptes
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Gestion des Comptes
          <span className="ml-4 text-lg text-gray-500 font-normal">
            ({comptes.length} {comptes.length > 1 ? "comptes" : "compte"})
          </span>
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p className="font-medium">Erreur</p>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comptes.length > 0 ? (
            comptes.map((compte) => (
              <div
                key={compte.id_compte}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                      {compte.prenom[0].toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {compte.nom.toUpperCase()}{" "}
                        {compte.prenom.charAt(0).toUpperCase() +
                          compte.prenom.slice(1).toLowerCase()}
                      </h3>
                      <p className="text-sm text-gray-500">{compte.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-t border-gray-100">
                      <span className="text-gray-600">Rôle</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          compte.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {compte.role}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-t border-gray-100">
                      <span className="text-gray-600">Absences</span>
                      <span
                        className={`font-medium ${
                          compte.absences > 2 ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {compte.absences}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-t border-gray-100">
                      <span className="text-gray-600">Statut</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          compte.compteBloque
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {compte.compteBloque ? "Bloqué" : "Actif"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucun compte trouvé
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucun compte n'est actuellement disponible dans le système.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCompte;
