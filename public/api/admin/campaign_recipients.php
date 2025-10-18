<?php
require_once __DIR__ . '/_auth.php';
require_admin();
require_once __DIR__ . '/../schema.php';

try {
  if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    api_error(405, 'Method not allowed');
  }

  $pdo = get_pdo();
  ensure_newsletter_schema($pdo);

  $campaignId = isset($_GET['campaign_id']) ? (int)$_GET['campaign_id'] : 0;
  if ($campaignId <= 0) api_error(400, 'campaign_id ontbreekt');

  $status = isset($_GET['status']) ? (string)$_GET['status'] : 'failed';
  $allowed = ['queued', 'sent', 'failed', 'skipped'];
  if (!in_array($status, $allowed, true)) api_error(400, 'Ongeldige status');

  $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
  if ($limit < 1) $limit = 1;
  if ($limit > 500) $limit = 500;

  $stmt = $pdo->prepare("
    SELECT id, email, status, attempts, last_error, sent_at, created_at
    FROM newsletter_campaign_recipients
    WHERE campaign_id = :id AND status = :status
    ORDER BY id DESC
    LIMIT :lim
  ");
  $stmt->bindValue(':id', $campaignId, PDO::PARAM_INT);
  $stmt->bindValue(':status', $status, PDO::PARAM_STR);
  $stmt->bindValue(':lim', $limit, PDO::PARAM_INT);
  $stmt->execute();

  $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

  json_response(200, ['ok' => true, 'items' => $items, 'count' => count($items)]);
} catch (Throwable $e) {
  api_error(500, 'Fout bij ophalen ontvangers', ['error' => $e->getMessage()]);
}