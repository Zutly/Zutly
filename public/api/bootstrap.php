<?php
// Algemene bootstrap voor API endpoints: CORS, headers en preflight.

header('Content-Type: application/json; charset=UTF-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
$originHost = $origin ? parse_url($origin, PHP_URL_HOST) : '';

$allowed = false;

// Als er een config bestaat, laad die, anders gaan we met defaults verder.
$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
  require_once $configPath;
}

// Bepaal of origin is toegestaan
if (!empty($origin)) {
  if (defined('ALLOWED_ORIGINS') && is_array(ALLOWED_ORIGINS) && !empty(ALLOWED_ORIGINS)) {
    $allowed = in_array($origin, ALLOWED_ORIGINS, true);
  } else {
    // Standaard: same-origin toestaan
    $allowed = ($originHost === $host);
  }
}

if ($allowed) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
}

// Basis CORS/headers
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Token');
header('Access-Control-Max-Age: 86400');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

// Helper om consistente JSON-responses te sturen
function json_response(int $status, array $data): void {
  http_response_code($status);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit();
}

// Helper om veilige foutmeldingen te sturen
function api_error(int $status, string $message, array $details = []): void {
  $debug = defined('API_DEBUG') ? API_DEBUG : false;
  $payload = ['ok' => false, 'error' => $message];
  if ($debug && !empty($details)) {
    $payload['details'] = $details;
  }
  json_response($status, $payload);
}