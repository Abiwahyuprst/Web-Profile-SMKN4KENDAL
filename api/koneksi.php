<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "db_sekolah";

// Membuat koneksi ke database MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Memeriksa status koneksi
if ($conn->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Koneksi database gagal: " . $conn->connect_error
    ]);
    exit();
}
?>
