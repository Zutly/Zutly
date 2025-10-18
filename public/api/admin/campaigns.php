<?php
require_once __DIR__ . '/_auth.php';
require_admin();
require_once __DIR__ . '/../schema.php';

try {
  $pdo = get_pdo();
  ensure_newsletter_schema($pdo);

  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT id, subject, status, batch_size, created_at, started_at, finished_at FROM newsletter_campaigns ORDER BY id DESC");
    json_response(200, ['ok' => true, 'items' => $stmt->fetchAll()]);
  }

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];

    $subject = trim((string)($data['subject'] ?? ''));
    $text = isset($data['text']) ? (string)$data['text'] : null;
    $html = isset($data['html']) ? (string)$data['html'] : null;
    $fromEmail = trim((string)($data['from_email'] ?? 'info@zutly.nl'));
    $fromName = trim((string)($data['from_name'] ?? 'Zutly'));
    $batchSize = (int)($data['batch_size'] ?? 20);
    if ($batchSize <= 0) $batchSize = 20;

    if ($subject === '') api_error(400, 'Onderwerp is verplicht');
    if ($text === null && $html === null) api_error(400, 'Minimaal een tekst- of HTML-inhoud is vereist');

    $stmt = $pdo->prepare("
      INSERT INTO newsletter_campaigns (subject, html, text, from_email, from_name, batch_size, status)
      VALUES (:subject, :html, :text, :from_email, :from_name, :batch_size, 'draft')
    ");
    $stmt->execute([
      ':subject' => $subject,
      ':html' => $html,
      ':text' => $text,
      ':from_email' => $fromEmail,
      ':from_name' => $fromName,
      ':batch_size' => $batchSize,
    ]);

    json_response(201, ['ok' => true, 'id' => (int)$pdo->lastInsertId()]);
  }

  header('Allow: GET, POST');
  api_error(405, 'Method not allowed');
} catch (Throwable $e) {
  api_error(500, 'Fout in campaigns endpoint', ['error' => $e->getMessage()]);
}