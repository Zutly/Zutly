<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(int $code, array $data): void {
  http_response_code($code);
  echo json_encode($data);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['ok' => false, 'message' => 'Alleen POST toegestaan.']);
}

$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST; // fallback voor form-encoded
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
  respond(400, ['ok' => false, 'message' => 'Vereiste velden ontbreken.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(400, ['ok' => false, 'message' => 'Ongeldig e-mailadres.']);
}

// Optionele config: public/api/config.php mag een array returnen, bv. ['recipient' => 'info@voorbeeld.nl', 'subject_prefix' => 'MijnSite']
$config = [];
$cfgPath = __DIR__ . '/config.php';
if (is_file($cfgPath)) {
  $loaded = include $cfgPath;
  if (is_array($loaded)) {
    $config = $loaded;
  }
}

$to = $config['recipient'] ?? 'info@zutly.nl';
$subjectPrefix = $config['subject_prefix'] ?? 'Zutly';
$subject = $subjectPrefix . ' - Nieuwe aanvraag via website';

$lines = [
  "Naam: {$name}",
  "E-mail: {$email}",
  $phone !== '' ? "Telefoon: {$phone}" : "Telefoon: (niet opgegeven)",
  "",
  "Bericht:",
  $message,
  "",
  "Verzonden op: " . date('Y-m-d H:i:s'),
  "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'onbekend'),
  "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'onbekend'),
];
$body = implode("\r\n", $lines);

$domain = $_SERVER['SERVER_NAME'] ?? 'zutly.nl';
$from = 'noreply@' . preg_replace('/[^a-z0-9\.\-]/i', '', $domain);

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: ' . $subjectPrefix . " <{$from}>",
  'Reply-To: ' . $email,
  'X-Mailer: PHP/' . phpversion(),
];

$ok = @mail(
  $to,
  '=?UTF-8?B?' . base64_encode($subject) . '?=',
  $body,
  implode("\r\n", $headers)
);

if ($ok) {
  respond(200, ['ok' => true, 'message' => 'Verzonden']);
}
respond(500, ['ok' => false, 'message' => 'Versturen mislukt.']);