<?php
require_once __DIR__ . '/../bootstrap.php';

function get_header(string $name, $default = null) {
  $nameLower = strtolower($name);
  if (function_exists('getallheaders')) {
    $headers = getallheaders();
    foreach ($headers as $k => $v) {
      if (strtolower($k) === $nameLower) return $v;
    }
  }
  $serverKey = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
  return $_SERVER[$serverKey] ?? $default;
}

function require_admin(): void {
  if (!defined('ADMIN_API_TOKEN') || !ADMIN_API_TOKEN) {
    api_error(500, 'ADMIN_API_TOKEN ontbreekt in config.php');
  }
  $token = get_header('X-Admin-Token');
  if (!$token || !hash_equals(ADMIN_API_TOKEN, $token)) {
    api_error(401, 'Unauthorized');
  }
}