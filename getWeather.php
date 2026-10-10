<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Get city from query string
$city = $_GET['city'] ?? '';

if (!$city) {
    echo json_encode(["error" => "City not provided"]);
    exit;
}

// Path to JSON file
$jsonFile = __DIR__ . '/weather2_data.json';

if (!file_exists($jsonFile)) {
    echo json_encode(["error" => "Weather data file not found"]);
    exit;
}

// Decode JSON
$data = json_decode(file_get_contents($jsonFile), true);

if ($data === null) {
    echo json_encode(["error" => "Invalid JSON file"]);
    exit;
}

// Search for city (case-insensitive)
$result = array_filter($data, function ($item) use ($city) {
    return isset($item['Location']) && stripos($item['Location'], $city) !== false;
});

// Output JSON
if (empty($result)) {
    echo json_encode(["error" => "City not found"]);
} else {
    echo json_encode(array_values($result));
}
?>
