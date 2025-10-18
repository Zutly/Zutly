<?php
require_once __DIR__ . '/bootstrap.php';

$api = [
  'ok' => true,
  'timestamp' => gmdate('c'),
  'php' => PHP_VERSION,
];

// DB status: alleen proberen te verbinden als config aanwezig is
$dbStatus = [
  'configured' => false,
  'ok' => null,
];

if (file_exists(__DIR__ . '/config.php')) {
  require_once __DIR__ . '/db.php';
  $dbStatus['configured'] = db_configured();

  if ($dbStatus['configured']) {
    try {
      $pdo = get_pdo();
      // Simpele check
      $pdo->query('SELECT 1');
      $dbStatus['ok'] = true;
    } catch (Throwable $e) {
      $dbStatus['ok'] = false;
      if (defined('API_DEBUG') && API_DEBUG) {
        $dbStatus['error'] = $e->getMessage();
      }
    }
  }
}

json_response(200, [
  'ok' => true,
  'api' => $api,
  'db' => $dbStatus,
]);