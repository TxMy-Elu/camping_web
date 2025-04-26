


          
Je vais mettre à jour le README pour inclure une documentation complète des routes API. Voici la version mise à jour :

# Application Web de Camping Le Bois Doré

Cette application React permet la gestion d'un camping, incluant les comptes utilisateurs, les activités et les inscriptions.

## Table des Matières

- [Routes Frontend](#routes-frontend)
- [Routes API](#routes-api)
- [Structure des Fichiers](#structure-des-fichiers)
- [Notes Techniques](#notes-techniques)

## Routes Frontend

_[Section des routes frontend existante conservée...]_

## Routes API

### Routes d'Authentification

#### POST `/auth/login`
- **Description** : Authentification de l'utilisateur
- **Corps de la requête** :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse** : Token JWT
- **Accès** : Public

#### POST `/compte/role`
- **Description** : Récupération du rôle utilisateur
- **Corps de la requête** :
  ```json
  {
    "jwt": "string"
  }
  ```
- **Réponse** :
  ```json
  {
    "role": "admin|client|animateur",
    "id_compte": "number",
    "email": "string"
  }
  ```
- **Accès** : Authentifié

### Routes des Créneaux

#### GET `/creneaux/allCreneaux`
- **Description** : Liste de tous les créneaux d'activités
- **Headers** : Authorization Bearer Token
- **Réponse** : Liste des créneaux avec détails
- **Accès** : Authentifié

### Routes des Inscriptions

#### GET `/inscription/getRegisteredUsers/:activiteId`
- **Description** : Liste des inscrits à une activité
- **Paramètres** : `activiteId` (ID de l'activité)
- **Headers** : Authorization Bearer Token
- **Accès** : Authentifié

#### POST `/inscription/insertOrUpdateInscription`
- **Description** : Inscription à une activité
- **Corps de la requête** :
  ```json
  {
    "jwt": "string",
    "inscription": {
      "date_inscription": "YYYY-MM-DD"
    },
    "creneaux": {
      "id_creneaux": "number"
    }
  }
  ```
- **Accès** : Authentifié

#### DELETE `/inscription/deleteInscription`
- **Description** : Désinscription d'une activité
- **Corps de la requête** :
  ```json
  {
    "jwt": "string",
    "creneaux": {
      "id_creneaux": "number"
    }
  }
  ```
- **Accès** : Authentifié

### Routes de Gestion des Comptes

#### GET `/compte/allCompte`
- **Description** : Liste de tous les comptes
- **Headers** : Authorization Bearer Token
- **Accès** : Admin uniquement

#### GET `/compte/compteBloque`
- **Description** : Liste des comptes bloqués
- **Headers** : Authorization Bearer Token
- **Accès** : Admin uniquement

### Routes de Gestion des Absences

#### PUT `/appel/gererAbsence`
- **Description** : Marquer des utilisateurs absents
- **Headers** : Authorization Bearer Token
- **Corps de la requête** :
  ```json
  {
    "absences": [
      {
        "id_compte": "number",
        "id_creneaux": "number"
      }
    ]
  }
  ```
- **Accès** : Admin, Animateur

#### PUT `/appel/debloquerCompte`
- **Description** : Débloquer un compte
- **Headers** : Authorization Bearer Token
- **Corps de la requête** :
  ```json
  {
    "compteId": "number"
  }
  ```
- **Accès** : Admin uniquement

## Structure des Fichiers

```
src/
  components/           # Composants React
  services/            # Services API
  utils/               # Utilitaires
  assets/             # Ressources statiques
```

## Notes Techniques

- **Authentification** : Utilisation de JWT stocké dans `localStorage`
- **Autorisations** :
  - `admin` : Accès complet
  - `animateur` : Gestion des créneaux et absences
  - `client` : Inscription aux activités
- **Sécurité** :
  - Toutes les routes API (sauf login) nécessitent un token JWT
  - Validation des rôles côté serveur
- **Interface** : Tailwind CSS pour le style

        