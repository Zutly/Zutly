<?php
require_once __DIR__ . '/db.php';

function ensure_newsletter_schema(PDO $pdo): void {
  // Subscribers (voor inschrijvingen)
  $pdo->exec("
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ");

  // Suppressions (uitschrijvingen/bounces)
  $pdo->exec("
    CREATE TABLE IF NOT EXISTS newsletter_suppressions (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      reason VARCHAR(50) DEFAULT 'unsubscribed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ");

  // Campagnes
  $pdo->exec("
    CREATE TABLE IF NOT EXISTS newsletter_campaigns (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      subject VARCHAR(255) NOT NULL,
      html MEDIUMTEXT NULL,
      text TEXT NULL,
      from_email VARCHAR(255) DEFAULT 'info@zutly.nl',
      from_name VARCHAR(255) DEFAULT 'Zutly',
      status VARCHAR(20) NOT NULL DEFAULT 'draft', /* draft | queued | sending | paused | done | stopped */
      batch_size INT UNSIGNED NOT NULL DEFAULT 20,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
      started_at TIMESTAMP NULL,
      finished_at TIMESTAMP NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ");

  // Campagne-ontvangers (queue + status)
  $pdo->exec("
    CREATE TABLE IF NOT EXISTS newsletter_campaign_recipients (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      campaign_id INT UNSIGNED NOT NULL,
      email VARCHAR(255) NOT NULL,
      token VARCHAR(64) NOT NULL,
      status VARCHAR(16) NOT NULL DEFAULT 'queued', /* queued | sent | failed | skipped */
      attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
      last_error TEXT NULL,
      sent_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_campaign_email (campaign_id, email),
      INDEX idx_campaign_status (campaign_id, status),
      CONSTRAINT fk_campaign FOREIGN KEY (campaign_id) REFERENCES newsletter_campaigns(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ");
}