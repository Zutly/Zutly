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

  // Toon alleen actieve abonnees (niet in suppressions)
  $q = $pdo->query("
    SELECT s.id, s.email, s.created_at
    FROM newsletter_subscribers s
    LEFT JOIN newsletter_suppressions sup ON sup.email = s.email
    WHERE sup.email IS NULL
    ORDER BY s.created_at DESC, s.id DESC
  ");
  $items = $q->fetchAll(PDO::FETCH_ASSOC);

  json_response(200, ['ok' => true, 'items' => $items]);
} catch (Throwable $e) {
  api_error(500, 'Fout bij ophalen abonnees', ['error' => $e->getMessage()]);
}