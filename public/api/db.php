<?php
// Vereist bootstrap voor config en helpers
require_once __DIR__ . '/bootstrap.php';

function db_configured(): bool {
  return defined('DB_HOST') && defined('DB_NAME') && defined('DB_USER') && defined('DB_PASS');
}

function get_pdo(): PDO {
  if (!db_configured()) {
    throw new RuntimeException('Databaseconfiguratie ontbreekt. Kopieer config.sample.php naar config.php en vul je gegevens in.');
  }

  $host = DB_HOST;
  $dbname = DB_NAME;
  $port = defined('DB_PORT') ? DB_PORT : 3306;
  $charset = defined('DB_CHARSET') ? DB_CHARSET : 'utf8mb4';

  $dsn = "mysql:host={$host};dbname={$dbname};port={$port};charset={$charset}";

  $options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ];

  return new PDO($dsn, DB_USER, DB_PASS, $options);
}