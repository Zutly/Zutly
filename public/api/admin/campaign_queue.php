<?php
require_once __DIR__ . '/_auth.php';
require_admin();
require_once __DIR__ . '/../schema.php';

try {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    api_error(405, 'Method not allowed');
  }

  $pdo = get_pdo();
  ensure_newsletter_schema($pdo);

  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true) ?: [];
  $campaignId = (int)($data['campaign_id'] ?? 0);
  $start = (bool)($data['start'] ?? true);

  if ($campaignId <= 0) api_error(400, 'campaign_id ontbreekt');

  // Haal campagne op
  $cStmt = $pdo->prepare("SELECT * FROM newsletter_campaigns WHERE id = :id");
  $cStmt->execute([':id' => $campaignId]);
  $campaign = $cStmt->fetch();
  if (!$campaign) api_error(404, 'Campagne niet gevonden');

  if (!in_array($campaign['status'], ['draft', 'paused', 'queued'], true)) {
    api_error(400, 'Campagne kan niet gequeued worden in huidige status');
  }

  // Selecteer actieve subscribers die niet in suppressions staan
  $q = $pdo->query("
    SELECT s.email
    FROM newsletter_subscribers s
    LEFT JOIN newsletter_suppressions sup ON sup.email = s.email
    WHERE sup.email IS NULL
  ");
  $emails = $q->fetchAll(PDO::FETCH_COLUMN);

  // Voeg recipients toe (idempotent via UNIQUE KEY)
  $ins = $pdo->prepare("
    INSERT INTO newsletter_campaign_recipients (campaign_id, email, token, status)
    VALUES (:campaign_id, :email, :token, 'queued')
    ON DUPLICATE KEY UPDATE status = VALUES(status)
  ");

  $count = 0;
  foreach ($emails as $email) {
    $email = trim((string)$email);
    if ($email === '') continue;
    $token = bin2hex(random_bytes(16));
    $ins->execute([
      ':campaign_id' => $campaignId,
      ':email' => $email,
      ':token' => $token,
    ]);
    $count++;
  }

  // Status bijwerken
  $newStatus = $start ? 'sending' : 'queued';
  $pdo->prepare("UPDATE newsletter_campaigns SET status = :status, started_at = IF(:status='sending', NOW(), started_at) WHERE id = :id")
      ->execute([':status' => $newStatus, ':id' => $campaignId]);

  json_response(200, ['ok' => true, 'queued' => $count, 'status' => $newStatus]);
} catch (Throwable $e) {
  api_error(500, 'Fout bij queue', ['error' => $e->getMessage()]);
}