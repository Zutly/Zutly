<?php
header("Access-Control-Allow-Origin: *"); // Pas dit aan naar de URL van je frontend voor productie
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ontvang de JSON-data van de frontend
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    $name = isset($data['name']) ? htmlspecialchars($data['name']) : 'Onbekend';
    $email = isset($data['email']) ? htmlspecialchars($data['email']) : 'onbekend@voorbeeld.com';
    $phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'Niet opgegeven'; // Nieuw veld
    $message = isset($data['message']) ? htmlspecialchars($data['message']) : 'Geen bericht';

    // Validatie (eenvoudig, uitgebreidere validatie is aan te raden)
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "Vul alle verplichte velden correct in (Naam, E-mail, Bericht)."]);
        exit;
    }

    // E-mail instellingen
    $to = "zutlyweb@gmail.com"; 
    $subject = "Nieuw contactformulier bericht van " . $name;
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "Naam: " . $name . "\n";
    $email_body .= "E-mail: " . $email . "\n";
    $email_body .= "Telefoon: " . $phone . "\n\n"; // Voeg telefoonnummer toe
    $email_body .= "Bericht:\n" . $message;

    // Verstuur de e-mail
    if (mail($to, $subject, $email_body, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Uw bericht is succesvol verzonden!"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Er is een fout opgetreden bij het verzenden van uw bericht."]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Alleen POST-verzoeken zijn toegestaan."]);
}
?>