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
  $id = (int)($data['campaign_id'] ?? 0);
  if ($id <= 0) api_error(400, 'campaign_id ontbreekt');

  // Verwijder campagne; FK op recipients zorgt voor cascade.
  $stmt = $pdo->prepare("DELETE FROM newsletter_campaigns WHERE id = :id");
  $stmt->execute([':id' => $id]);

  json_response(200, ['ok' => true, 'deleted' => (int)$stmt->rowCount()]);
} catch (Throwable $e) {
  api_error(500, 'Fout bij verwijderen', ['error' => $e->getMessage()]);
}