<?php
require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Allow: POST');
  api_error(405, 'Method not allowed');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  api_error(400, 'Ongeldige JSON payload');
}

$email = isset($data['email']) ? trim((string)$data['email']) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  api_error(400, 'Voer een geldig e-mailadres in.');
}

require_once __DIR__ . '/db.php';

try {
  $pdo = get_pdo();

  // Tabel aanmaken als deze nog niet bestaat
  $pdo->exec("
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ");

  // Idempotent inschrijven: duplicate key wordt genegeerd
  $stmt = $pdo->prepare("
    INSERT INTO newsletter_subscribers (email)
    VALUES (:email)
    ON DUPLICATE KEY UPDATE created_at = created_at
  ");
  $stmt->execute([':email' => $email]);

  // Stuur bevestigingsmail via SMTP (From: info@zutly.nl)
  $emailSent = null;
  try {
    require_once __DIR__ . '/mailer.php';

    $subject = 'Bevestiging nieuwsbrief-inschrijving';
    $body = "Bedankt voor je inschrijving op de Zutly nieuwsbrief.\r\n\r\n".
            "Je ontvangt vanaf nu zo nu en dan updates en nieuws.\r\n\r\n".
            "Groet,\r\nZutly";

    send_smtp_mail($email, $subject, $body);
    $emailSent = true;
  } catch (Throwable $e) {
    // E-mail verzenden is optioneel voor de inschrijving zelf
    $emailSent = false;
    if (defined('API_DEBUG') && API_DEBUG) {
      json_response(200, [
        'ok' => true,
        'message' => 'Bedankt! Je bent ingeschreven voor de nieuwsbrief. (Waarschuwing: bevestigingsmail kon niet worden verzonden.)',
        'email_sent' => false,
        'error' => $e->getMessage(),
      ]);
    }
  }

  if ($emailSent === true) {
    json_response(200, [
      'ok' => true,
      'message' => 'Bedankt! Je bent ingeschreven voor de nieuwsbrief. We hebben je zojuist een bevestiging gemaild.',
      'email_sent' => true,
    ]);
  } else {
    // Als mail poging mislukte maar API_DEBUG uit staat, toch success teruggeven
    json_response(200, [
      'ok' => true,
      'message' => 'Bedankt! Je bent ingeschreven voor de nieuwsbrief.',
      'email_sent' => false,
    ]);
  }
} catch (Throwable $e) {
  api_error(500, 'Kon niet inschrijven.', ['error' => $e->getMessage()]);
}