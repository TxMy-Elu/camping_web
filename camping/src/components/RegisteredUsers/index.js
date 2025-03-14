import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RegisteredUsers = () => {
  const { activiteId } = useParams();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [absentUsers, setAbsentUsers] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [activityDetails, setActivityDetails] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (role) {
      setIsClient(role === "client");
    }

    const fetchActivityDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/creneaux/allCreneaux`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Échec de la récupération des créneaux");
        const data = await response.json();
        const currentActivity = data.find(
          (creneau) => creneau.id_creneaux.toString() === activiteId
        );
        setActivityDetails(currentActivity);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les détails de l'activité");
      }
    };

    fetchActivityDetails();
    const fetchCreneaux = async () => {
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


    if (!token) {
      setError("Token non trouvé");
      return;
    }

    const absentData = Object.keys(absentUsers).map((userId) => ({
      compteId: parseInt(userId),
      estAbsent: absentUsers[userId],
    }));


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
    <div className="w-full p-8">
      {activityDetails && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={getActivityImage(activityDetails.nom_animation)}
              alt={activityDetails.nom_animation}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{activityDetails.nom_animation}</h1>
              <p className="text-lg mb-3">{activityDetails.descriptif_animation}</p>
              <div className="flex items-center space-x-6">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(activityDetails.date_heure).toLocaleString('fr-FR')}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activityDetails.Duree}h
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {activityDetails.places_prises} / {activityDetails.places_totales} places
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800">
            Liste des participants
            <span className="ml-3 text-lg font-normal text-gray-500">
              ({users.length} {users.length > 1 ? 'participants' : 'participant'})
            </span>
          </h2>
        </div>

        {users.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user, index) => (
                <div 
                  key={user.id_compte || index}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                      {user.prenom[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.nom.toUpperCase()}</h3>
                      <p className="text-gray-600">{user.prenom.charAt(0).toUpperCase() + user.prenom.slice(1)}</p>
                    </div>
                  </div>
                  {!isClient && (
                    <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-6 w-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                          checked={absentUsers[user.id_compte] || user.estAbsent || false}
                          onChange={() => handleCheckboxChange(user.id_compte)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!isClient && (
              <div className="mt-6 p-6 bg-gray-50 border-t flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out hover:shadow-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Enregistrer les absences
                </button>
              </div>
            )}
          </form>
        ) : (
          <div className="text-center py-12 px-6 bg-gray-50">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-4 text-xl font-semibold text-gray-600">
              Aucune personne n'est inscrite pour cette activité.
            </p>
            <p className="mt-2 text-gray-500">
              Les inscriptions apparaîtront ici une fois que des personnes se seront inscrites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredUsers;
