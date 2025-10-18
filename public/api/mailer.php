<?php
require_once __DIR__ . '/bootstrap.php';

/**
 * Verstuurt een e-mail via eenvoudige SMTP (SSL op poort 465).
 * Minimale implementatie: EHLO, AUTH LOGIN, MAIL FROM, RCPT TO, DATA.
 *
 * @param string      $to
 * @param string      $subject
 * @param string      $bodyText          Plain text inhoud
 * @param string|null $replyTo
 * @param array       $extraHeaders      Extra ruwe headerregels, bijv. ['List-Unsubscribe: <...>']
 *
 * @throws RuntimeException bij SMTP- of verbindingsfouten.
 */
function send_smtp_mail(string $to, string $subject, string $bodyText, ?string $replyTo = null, array $extraHeaders = []): void
{
  if (!defined('SMTP_HOST') || !defined('SMTP_PORT') || !defined('SMTP_USERNAME') || !defined('SMTP_PASSWORD') || !defined('SMTP_FROM')) {
    throw new RuntimeException('SMTP is niet geconfigureerd.');
  }

  $host = SMTP_HOST;
  $port = SMTP_PORT;
  $username = SMTP_USERNAME;
  $password = SMTP_PASSWORD;
  $from = SMTP_FROM;
  $fromName = defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : $from;

  if ($password === '') {
    throw new RuntimeException('SMTP wachtwoord ontbreekt in config.php');
  }

  $remote = "ssl://{$host}:{$port}";
  $timeout = 15;

  $fp = @stream_socket_client($remote, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT);
  if (!$fp) {
    throw new RuntimeException("SMTP verbinding mislukt: {$errstr} ({$errno})");
  }

  stream_set_timeout($fp, $timeout);

  $expect = function (string $prefix) use ($fp) {
    $line = '';
    while (!feof($fp)) {
      $chunk = fgets($fp, 512);
      if ($chunk === false) break;
      $line .= $chunk;
      if (preg_match('/^\d{3}\s/', $chunk)) break;
    }
    if (substr($line, 0, 3) !== $prefix) {
      throw new RuntimeException("SMTP onverwachte respons: {$line}");
    }
    return $line;
  };

  $write = function (string $cmd) use ($fp) {
    fwrite($fp, $cmd . "\r\n");
  };

  // Begroeting
  $expect('220');
  $write("EHLO zutly.nl");
  $expect('250');

  // AUTH LOGIN
  $write("AUTH LOGIN");
  $expect('334');
  $write(base64_encode($username));
  $expect('334');
  $write(base64_encode($password));
  $expect('235');

  // MAIL FROM en RCPT TO
  $write("MAIL FROM:<{$from}>");
  $expect('250');

  $write("RCPT TO:<{$to}>");
  $expect('250');

  // DATA
  $write("DATA");
  $expect('354');

  $date = date('r');
  $messageId = sprintf('<%s@zutly.nl>', bin2hex(random_bytes(8)));
  $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

  $headers = [];
  $headers[] = "From: {$fromName} <{$from}>";
  $headers[] = "To: <{$to}>";
  if ($replyTo) $headers[] = "Reply-To: <{$replyTo}>";
  $headers[] = "Subject: {$encodedSubject}";
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "Content-Type: text/plain; charset=UTF-8";
  $headers[] = "Content-Transfer-Encoding: 8bit";
  $headers[] = "Date: {$date}";
  $headers[] = "Message-ID: {$messageId}";

  // Filter gevaarlijke of dubbele headers uit extraHeaders
  $blocked = [
    'from','to','subject','mime-version','content-type','content-transfer-encoding','date','message-id','reply-to'
  ];

  foreach ($extraHeaders as $h) {
    if (!is_string($h)) continue;
    // Verwijder CR/LF om header injection te voorkomen
    $clean = str_replace(["\r", "\n"], '', trim($h));
    if ($clean === '') continue;
    $pos = strpos($clean, ':');
    if ($pos === false) continue;
    $name = strtolower(trim(substr($clean, 0, $pos)));
    if (in_array($name, $blocked, true)) {
      // Sla verboden/gedupliceerde headers over
      continue;
    }
    $headers[] = $clean;
  }

  // Zorg voor CRLF en dot-stuffing
  $body = preg_replace("/\r\n|\r|\n/", "\r\n", $bodyText);
  $body = preg_replace('/^\./m', '..', $body);

  $data = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.";
  $write($data);
  $expect('250');

  // Afsluiten
  $write("QUIT");
  fclose($fp);
}