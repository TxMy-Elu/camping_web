import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllCreneaux = () => {
  const navigate = useNavigate();
  const [creneaux, setCreneaux] = useState([]);
  const [error, setError] = useState("");
  const [userInscriptions, setUserInscriptions] = useState({});
  const [registeredUsers, setRegisteredUsers] = useState({});

  useEffect(() => {
    const fetchCreneauxAndInscriptions = async () => {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");
      
      if (!token) {
        setError("Token non trouvé");
        return;
      }

      try {
        // Fetch all creneaux
        const creneauxResponse = await fetch("http://localhost:8080/creneaux/allCreneaux", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!creneauxResponse.ok) throw new Error("Échec de la récupération des créneaux");
        const creneauxData = await creneauxResponse.json();
        setCreneaux(creneauxData);

        // Check inscriptions for each creneau
        const inscriptionsMap = {};
        const usersMap = {};
        
        await Promise.all(creneauxData.map(async (creneau) => {
          const inscriptionResponse = await fetch(
            `http://localhost:8080/inscription/getRegisteredUsers/${creneau.id_creneaux}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          
          if (inscriptionResponse.ok) {
            const users = await inscriptionResponse.json();
            usersMap[creneau.id_creneaux] = users;
            // Check if current user is registered
            inscriptionsMap[creneau.id_creneaux] = users.some(user => user.email === userEmail);
          }
        }));
        
        setUserInscriptions(inscriptionsMap);
        setRegisteredUsers(usersMap);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchCreneauxAndInscriptions();
  }, []);

  const handleUnsubscribe = async (creneauId) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("Token non trouvé");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/inscription/deleteInscription", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwt: token,
          creneaux: {
            id_creneaux: creneauId
          }
        }),
      });

      if (!response.ok) throw new Error("Échec de la désinscription");

      // Update local state
      setUserInscriptions(prev => ({
        ...prev,
        [creneauId]: false
      }));
      
      // Remove user from registered users list
      setRegisteredUsers(prev => ({
        ...prev,
        [creneauId]: prev[creneauId].filter(user => user.email !== localStorage.getItem("userEmail"))
      }));

      alert("Désinscription réussie!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const nav = (id) => () => {
    navigate(`../inscription/getRegisteredUsers/${id}`);
  };

  const isPastDate = (dateString) => {
    const slotDate = new Date(dateString);
    const currentDate = new Date();
    return slotDate < currentDate;
  };

  const handleInscription = async (creneauId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token non trouvé");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/inscription/insertOrUpdateInscription",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jwt: token,
            inscription: {
              date_inscription: new Date().toISOString().split('T')[0]
            },
            creneaux: {
              id_creneaux: creneauId
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Échec de l'inscription");
      }

      alert("Inscription réussie!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const getActivityImage = (activityName) => {
      const activityImages = {
        // Activités en plein air
        'Randonnée': 'https://images.unsplash.com/photo-1551632811-561732d1e306',
        'VTT': 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0',
        'Balade à cheval': 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6',
        'Course d\'orientation': 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f',
        'Observation nature': 'https://images.unsplash.com/photo-1501555088652-021faa106b9b',
        'Volley': 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',

        // Activités aquatiques
        'Piscine': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7',
        'Toboggans aquatiques': 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1',
        'Pêche': 'https://images.unsplash.com/photo-1514469214021-1a6c3d08db2a',
        'Pédalo': 'https://images.unsplash.com/photo-1534254910684-f9c1c6e0f601',
        'Plongée': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',

        // Activités sportives
        'Volley-ball': 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',
        'Basket-ball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
        'Football': 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
        'Tennis': 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
        'Ping-pong': 'https://images.unsplash.com/photo-1534158914592-062992fbe900',
        'Tir à l\'arc': 'https://images.unsplash.com/photo-1584280795027-61e02c757b0e',
        'Mini-golf': 'https://images.unsplash.com/photo-1592919505780-303950717480',
        'Escalade': 'https://images.unsplash.com/photo-1522163182402-834f871fd851',

        // Animations et loisirs
        'Soirée karaoké': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81',
        'Spectacle': 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf',
        'Cinéma plein air': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
        'Tournoi sportif': 'https://images.unsplash.com/photo-1547347298-4074fc3086f0',
        'Cours de danse': 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4',
        'Chasse au trésor': 'https://images.unsplash.com/photo-1586107874284-ee5852c10fe1',
        'Atelier créatif': 'https://images.unsplash.com/photo-1499892477393-f675706cbe6e',

        // Activités détente et bien-être
        'Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        'Spa': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
        'Massage': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35',
        'Lecture': 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6',

        // Activités pour enfants
        'Club enfants': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
        'Aires de jeux': 'https://images.unsplash.com/photo-1542868727-869b1353c785',
        'Structures gonflables': 'https://images.unsplash.com/photo-1563396983906-b3795482a59a',
        'Atelier maquillage': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937',
        'Mini-ferme': 'https://images.unsplash.com/photo-1511044568932-338cba0ad803',

        // Excursions et découvertes
        'Visite touristique': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
        'Excursion bateau': 'https://images.unsplash.com/photo-1534447677768-be436bb09401',
        'Producteurs locaux': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9'
      };
      
      // Default image for unknown activities or if image is not found
      return activityImages[activityName] || 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&auto=format&fit=crop';
    };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl mb-6 text-center font-extrabold text-gray-900">
        All Créneaux
      </h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creneaux.map((creneau) => {
          const isExpired = isPastDate(creneau.date_heure);
          const isUserRegistered = userInscriptions[creneau.id_creneaux];
          const registeredCount = registeredUsers[creneau.id_creneaux]?.length || 0;

          return (
            <div key={creneau.id_creneaux} className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
              isExpired ? 'opacity-75' : ''
            }`}>
              <img 
                src={getActivityImage(creneau.nom_animation)}
                alt={creneau.nom_animation}
                className="w-full h-48 object-cover rounded-lg mb-4"
                crossOrigin="anonymous"
              />
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
                {!isExpired && (
                  <button
                    onClick={() => isUserRegistered 
                      ? handleUnsubscribe(creneau.id_creneaux)
                      : handleInscription(creneau.id_creneaux)
                    }
                    className={`mt-4 py-2 px-4 rounded transition-colors duration-300 ${
                      isUserRegistered
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isUserRegistered ? 'Se désinscrire' : "S'inscrire"}
                  </button>
                )}
                <button
                  onClick={nav(creneau.id_creneaux)}
                  className="mt-4 py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                >
                  Voir les inscrits
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCreneaux;
