<?php
require_once __DIR__ . '/../admin/_auth.php'; // gebruikt require_admin()
require_admin();
require_once __DIR__ . '/../schema.php';
require_once __DIR__ . '/../mailer.php';

function site_base_url(): string {
  $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
  $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
  return $scheme . '://' . $host;
}

try {
  $pdo = get_pdo();
  ensure_newsletter_schema($pdo);

  $max = isset($_GET['max']) ? max(1, (int)$_GET['max']) : 20;

  // Pak een batch queued ontvangers van actieve campagnes
  $sel = $pdo->prepare("
    SELECT r.id, r.email, r.token, r.campaign_id,
           c.subject, c.html, c.text, c.from_email, c.from_name, c.batch_size
    FROM newsletter_campaign_recipients r
    JOIN newsletter_campaigns c ON c.id = r.campaign_id
    LEFT JOIN newsletter_suppressions s ON s.email = r.email
    WHERE r.status = 'queued'
      AND c.status = 'sending'
      AND s.email IS NULL
    ORDER BY r.id ASC
    LIMIT :lim
  ");
  $lim = min($max, 100);
  $sel->bindValue(':lim', $lim, PDO::PARAM_INT);
  $sel->execute();
  $rows = $sel->fetchAll();

  $processed = 0;
  $sent = 0;
  $failed = 0;

  $base = site_base_url();
  foreach ($rows as $row) {
    $processed++;
    $id = (int)$row['id'];
    $email = $row['email'];
    $subject = $row['subject'];
    $text = $row['text'] ?: null;
    $html = $row['html'] ?: null;
    $token = $row['token'];
    $fromEmail = $row['from_email'] ?: 'info@zutly.nl';
    $fromName = $row['from_name'] ?: 'Zutly';

    // Plain text fallback als alleen HTML gegeven is
    if ($text === null && $html !== null) {
      $text = trim(strip_tags($html));
    }
    if ($text === null) $text = '';

    $u = $base . "/api/unsubscribe.php?t=" . urlencode($token);
    $extraHeaders = [
      "From: {$fromName} <{$fromEmail}>",
      "List-Unsubscribe: <{$u}>",
      "List-Unsubscribe-Post: List-Unsubscribe=One-Click",
    ];

    try {
      // Verzend (alleen tekst voor betrouwbaarheid; HTML kan later met multipart)
      send_smtp_mail($email, $subject, $text, null, $extraHeaders);

      $upd = $pdo->prepare("UPDATE newsletter_campaign_recipients SET status = 'sent', sent_at = NOW(), attempts = attempts + 1, last_error = NULL WHERE id = :id");
      $upd->execute([':id' => $id]);
      $sent++;
    } catch (Throwable $e) {
      $upd = $pdo->prepare("UPDATE newsletter_campaign_recipients SET status = 'failed', attempts = attempts + 1, last_error = :err WHERE id = :id");
      $upd->execute([':id' => $id, ':err' => $e->getMessage()]);
      $failed++;
    }

    // Kleine pauze om throttling te respecteren (verhoog indien nodig)
    usleep(300000); // 0.3s
  }

  // Campagnes afronden die geen queued meer hebben
  $done = $pdo->query("
    SELECT c.id
    FROM newsletter_campaigns c
    LEFT JOIN newsletter_campaign_recipients r
      ON r.campaign_id = c.id AND r.status = 'queued'
    WHERE c.status = 'sending'
    GROUP BY c.id
    HAVING COUNT(r.id) = 0
  ")->fetchAll(PDO::FETCH_COLUMN);

  if (!empty($done)) {
    $in = implode(',', array_map('intval', $done));
    $pdo->exec("UPDATE newsletter_campaigns SET status = 'done', finished_at = NOW() WHERE id IN ($in)");
  }

  json_response(200, [
    'ok' => true,
    'processed' => $processed,
    'sent' => $sent,
    'failed' => $failed,
    'marked_done' => array_map('intval', $done ?? []),
  ]);
} catch (Throwable $e) {
  api_error(500, 'Worker fout', ['error' => $e->getMessage()]);
}