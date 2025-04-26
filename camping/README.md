Here is a README that documents all your main React component routes, their file locations, and what each page displays. This will help users and developers understand the navigation and functionality of your camping web application.

---

# Camping Web Application

This project is a React-based web application for managing a camping site, including user accounts, activities, and registrations.

## Table of Contents

- [Routes & Components](#routes--components)
  - [Home (`/`)](#home-)
  - [Login (`/auth/login`)](#login-authlogin)
  - [All Créneaux (`/creneaux/allCreneaux`)](#all-créneaux-creneauxallcreneaux)
  - [Registered Users (`/inscription/getRegisteredUsers/:activiteId`)](#registered-users-inscriptiongetregisteredusersactiviteid)
  - [All Comptes (`/compte/allCompte`)](#all-comptes-compteallcompte)
  - [Comptes Bloqués (`/compte/compteBloque`)](#comptes-bloqués-comptecomptebloque)
  - [Navigation Bar (Navbar)](#navigation-bar-navbar)
- [File Structure](#file-structure)
- [Screenshots](#screenshots)

---

## Routes & Components

### Home (`/`)
**File:** <mcfile name="index.js" path="c:/wamp64/www/stage/camping_web/camping/src/components/Home/index.js"></mcfile>

- **What it displays:**  
  - Hero section with the camping name and a background image.
  - About section describing the camping site.
  - Activities section with cards for outdoor, aquatic, sports, entertainment, wellness, and kids activities.
  - Facilities section for accommodation and services.
  - Contact information.

---

### Login (`/auth/login`)
**File:** <mcfile name="index.js" path="c:/wamp64/www/stage/camping_web/camping/src/components/Login/index.js"></mcfile>

- **What it displays:**  
  - Login form for email and password.
  - Handles authentication and stores the JWT token and user role in localStorage.
  - Redirects to the home page on successful login.

---

### All Créneaux (`/creneaux/allCreneaux`)
**File:** <mcfile name="index.js" path="c:/wamp64/www/stage/camping_web/camping/src/components/AllCreneaux/index.js"></mcfile>

- **What it displays:**  
  - List of all activity slots (créneaux) as cards.
  - Each card shows activity name, date/time, duration, total places, and remaining places.
  - Buttons to register/unregister for an activity and to view registered users.
  - Handles registration and unregistration logic.

---

### Registered Users (`/inscription/getRegisteredUsers/:activiteId`)
**File:** <mcfile name="index.js" path="c:/wamp64/www/stage/camping_web/camping/src/components/RegisteredUsers/index.js"></mcfile>

- **What it displays:**  
  - Details of the selected activity (image, description, date, duration, places).
  - List of users registered for the activity.
  - For admins/animateurs: checkboxes to mark users as absent and submit absences.

---

### All Comptes (`/compte/allCompte`)
**File:** <mcfile name="index.js" path="c:/wamp64/www/stage/camping_web/camping/src/components/AllCompte/index.js"></mcfile>

- **What it displays:**  
  - List of all user accounts as cards.
  - Each card shows user name, email, role, number of absences, and account status (active/bloqué).
  - Error message if the token is missing or the fetch fails.

---

### Comptes Bloqués (`/compte/compteBloque`)
**File:** <mcfile name="index.js" path="c:/wamp64/www/stage/camping_web/camping/src/components/CompteBloque/index.js"></mcfile>

- **What it displays:**  
  - List of blocked user accounts.
  - Each card shows user info and a checkbox to unblock the account.
  - Button to submit unblocking requests.
  - Error message if the token is missing or the fetch fails.

---

### Navigation Bar (Navbar)
**File:** <mcfile name="index.js" path="c:/wamp64/www/stage/camping_web/camping/src/components/NavBar/index.js"></mcfile>

- **What it displays:**  
  - Top navigation bar with links:
    - Home
    - Login (if not authenticated)
    - Créneaux (if authenticated)
    - Comptes and Comptes Bloqués (if admin)
    - Logout button (if authenticated)
  - Handles logout logic and navigation.

---

## File Structure

```
src/
  components/
    AllCompte/
      index.js
    AllCreneaux/
      index.js
    CompteBloque/
      index.js
    Home/
      index.js
    Login/
      index.js
    NavBar/
      index.js
    RegisteredUsers/
      index.js
```

---

## Screenshots

> _You can add screenshots of each page here to visually document what each route displays._

---

## Notes

- All API calls require a valid JWT token stored in `localStorage` as `token`.
- User roles (`admin`, `client`, `animateur`) determine access to certain routes and features.
- The UI uses Tailwind CSS for styling.

---

If you need more details about a specific route or want to see example screenshots, let me know!