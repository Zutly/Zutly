<?php
require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/schema.php';

try {
  $pdo = get_pdo();
  ensure_newsletter_schema($pdo);

  $token = isset($_GET['t']) ? trim((string)$_GET['t']) : '';
  if ($token === '') {
    http_response_code(400);
    echo "<h1>Ongeldige link</h1>";
    exit;
  }

  // Zoek email bij token
  $stmt = $pdo->prepare("SELECT email FROM newsletter_campaign_recipients WHERE token = :t LIMIT 1");
  $stmt->execute([':t' => $token]);
  $row = $stmt->fetch();
  if (!$row) {
    http_response_code(404);
    echo "<h1>Link niet gevonden</h1>";
    exit;
  }

  $email = $row['email'];

  // Voeg toe aan suppressions (idempotent)
  $ins = $pdo->prepare("INSERT INTO newsletter_suppressions (email, reason) VALUES (:email, 'unsubscribed') ON DUPLICATE KEY UPDATE reason = VALUES(reason)");
  $ins->execute([':email' => $email]);

  // Markeer openstaande queue items als 'skipped'
  $pdo->prepare("UPDATE newsletter_campaign_recipients SET status = 'skipped' WHERE email = :email AND status = 'queued'")
      ->execute([':email' => $email]);

  // Simpele HTML response
  header('Content-Type: text/html; charset=UTF-8');
  echo "<!doctype html><html lang='nl'><meta charset='utf-8'><title>Uitschrijven</title><meta name='viewport' content='width=device-width,initial-scale=1'><body style='font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:2rem;'><h1>Je bent uitgeschreven</h1><p>$email ontvangt onze nieuwsbrief niet meer. Je kunt je altijd opnieuw inschrijven via de website.</p></body></html>";
} catch (Throwable $e) {
  http_response_code(500);
  echo "<h1>Er ging iets mis.</h1>";
}