import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div 
        className="bg-cover bg-center h-96 text-white py-16"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.1")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-center">Camping Le Bois Doré</h1>
          <p className="text-xl text-center">Une oasis de nature au cœur de la côte Atlantique</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">À Propos de Notre Camping</h2>
          <div className="flex gap-8 items-center">
            <div className="flex-1">
              <p className="text-lg mb-4">
                Niché dans une pinède centenaire en bord de mer, Le Bois Doré vous accueille dans un cadre 
                exceptionnel. Notre camping 4 étoiles allie le charme de la nature à des prestations haut de gamme 
                pour des vacances inoubliables.
              </p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.1" 
              alt="Vue du camping" 
              className="w-1/2 rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Activities Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Nos Activités</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Outdoor Activities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.1" 
                alt="Activités plein air" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">🌿 Plein Air</h3>
              <ul className="list-disc pl-5">
                <li>Randonnées guidées</li>
                <li>Location de VTT</li>
                <li>Balades à cheval</li>
                <li>Course d'orientation</li>
                <li>Observation de la nature</li>
              </ul>
            </div>

            {/* Water Activities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.1" 
                alt="Activités aquatiques" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">🏊‍♂️ Activités Aquatiques</h3>
              <ul className="list-disc pl-5">
                <li>Piscine chauffée</li>
                <li>Toboggans aquatiques</li>
                <li>Location kayak et paddle</li>
                <li>Pêche en rivière</li>
                <li>Pédalos</li>
              </ul>
            </div>

            {/* Sports */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.1" 
                alt="Sports" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">⚽ Sports</h3>
              <ul className="list-disc pl-5">
                <li>Terrain multisports</li>
                <li>Courts de tennis</li>
                <li>Terrain de pétanque</li>
                <li>Mini-golf</li>
                <li>Tir à l'arc</li>
              </ul>
            </div>

            {/* Entertainment */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.1" 
                alt="Animations" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">🎭 Animations</h3>
              <ul className="list-disc pl-5">
                <li>Soirées à thème</li>
                <li>Cinéma plein air</li>
                <li>Tournois sportifs</li>
                <li>Cours de fitness</li>
                <li>Ateliers créatifs</li>
              </ul>
            </div>

            {/* Wellness */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.1" 
                alt="Bien-être" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">🍃 Détente & Bien-être</h3>
              <ul className="list-disc pl-5">
                <li>Espace spa</li>
                <li>Cours de yoga</li>
                <li>Massages</li>
                <li>Sauna</li>
                <li>Espace détente</li>
              </ul>
            </div>

            {/* Kids Activities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.1" 
                alt="Activités enfants" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">👨‍👩‍👧‍👦 Club Enfants</h3>
              <ul className="list-disc pl-5">
                <li>Mini-club (4-12 ans)</li>
                <li>Aires de jeux</li>
                <li>Structures gonflables</li>
                <li>Ateliers créatifs</li>
                <li>Mini-ferme</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Nos Installations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1520095972714-909e91b038e5?ixlib=rb-4.0.1" 
                alt="Hébergement" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Hébergement</h3>
              <ul className="list-disc pl-5">
                <li>Emplacements ombragés pour tentes</li>
                <li>Emplacements camping-cars avec électricité</li>
                <li>Mobil-homes tout confort</li>
                <li>Chalets en bois</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.1" 
                alt="Services" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Services</h3>
              <ul className="list-disc pl-5">
                <li>Restaurant et snack-bar</li>
                <li>Épicerie</li>
                <li>Wifi gratuit</li>
                <li>Sanitaires modernes</li>
                <li>Laverie</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-2"><strong>Adresse:</strong> 789 Avenue des Pins, 44500 La Baule</p>
            <p className="mb-2"><strong>Téléphone:</strong> 02.40.XX.XX.XX</p>
            <p className="mb-2"><strong>Email:</strong> contact@boisdore-camping.fr</p>
            <p><strong>Ouvert:</strong> Du 1er Avril au 30 Septembre</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
