<?php
require_once __DIR__ . '/_auth.php';
require_admin();
require_once __DIR__ . '/../schema.php';

try {
  $pdo = get_pdo();
  ensure_newsletter_schema($pdo);

  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = (int)($_GET['campaign_id'] ?? 0);
    if ($id <= 0) api_error(400, 'campaign_id ontbreekt');

    $c = $pdo->prepare("SELECT id, subject, status, batch_size, created_at, started_at, finished_at FROM newsletter_campaigns WHERE id = :id");
    $c->execute([':id' => $id]);
    $campaign = $c->fetch();
    if (!$campaign) api_error(404, 'Campagne niet gevonden');

    $counts = $pdo->prepare("
      SELECT status, COUNT(*) as cnt
      FROM newsletter_campaign_recipients
      WHERE campaign_id = :id
      GROUP BY status
    ");
    $counts->execute([':id' => $id]);
    $byStatus = [];
    foreach ($counts->fetchAll() as $row) $byStatus[$row['status']] = (int)$row['cnt'];

    json_response(200, ['ok' => true, 'campaign' => $campaign, 'recipients' => $byStatus]);
  }

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];
    $id = (int)($data['campaign_id'] ?? 0);
    $action = (string)($data['action'] ?? '');

    if ($id <= 0) api_error(400, 'campaign_id ontbreekt');
    if (!in_array($action, ['start', 'pause', 'resume', 'stop'], true)) api_error(400, 'Ongeldige actie');

    $map = [
      'start' => 'sending',
      'resume' => 'sending',
      'pause' => 'paused',
      'stop'  => 'stopped',
    ];
    $new = $map[$action];

    // Gebruik unieke placeholders voor compatibiliteit met native prepared statements
    $stmt = $pdo->prepare("
      UPDATE newsletter_campaigns
      SET status = :status_set,
          started_at = IF(:status_check_send = 'sending', IFNULL(started_at, NOW()), started_at),
          finished_at = IF(:status_check_done IN ('done','stopped'), NOW(), finished_at)
      WHERE id = :id
    ");
    $stmt->execute([
      ':status_set'        => $new,
      ':status_check_send' => $new,
      ':status_check_done' => $new,
      ':id'                => $id,
    ]);

    json_response(200, ['ok' => true, 'status' => $new]);
  }

  header('Allow: GET, POST');
  api_error(405, 'Method not allowed');
} catch (Throwable $e) {
  api_error(500, 'Fout bij status', ['error' => $e->getMessage()]);
}