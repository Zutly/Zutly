<?php
// Kopieer dit bestand naar public/api/config.php en vul je Strato DB-gegevens in.
// Bewaar dit bestand buiten versiebeheer (staat op .gitignore).

// Database instellingen (Strato)
const DB_HOST = 'database-5018832368.webspace-host.com';
const DB_NAME = 'dbs14870288';
const DB_USER = 'jouw_db_gebruiker';
const DB_PASS = 'jouw_db_wachtwoord';
const DB_PORT = 3306;
const DB_CHARSET = 'utf8mb4';

// Optioneel: beperk CORS naar bekende origins (inclusief je domein).
// Voor lokale ontwikkeling kun je 'http://localhost:8080' toevoegen.
const ALLOWED_ORIGINS = [
  // 'https://www.jouwdomein.nl',
  // 'http://localhost:8080',
];

// Optioneel: zet naar true voor meer foutdetails in responses (niet in productie).
const API_DEBUG = false;