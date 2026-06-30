<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Menangani Preflight Request (OPTIONS) demi kompatibilitas lintas origin/CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Memastikan request bertipe POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Metode request tidak diizinkan. Gunakan POST."
    ]);
    exit();
}

// Menerima data JSON dari request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Format data input tidak valid atau kosong."
    ]);
    exit();
}

$nama = isset($data['nama']) ? trim($data['nama']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$subjek = isset($data['subjek']) ? trim($data['subjek']) : '';
$pesan = isset($data['pesan']) ? trim($data['pesan']) : '';

// Validasi input wajib
if (empty($nama) || empty($email) || empty($subjek) || empty($pesan)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Semua kolom input wajib diisi."
    ]);
    exit();
}

// Validasi format email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Format alamat email tidak valid."
    ]);
    exit();
}

// Hubungkan ke file koneksi database
require_once 'koneksi.php';

// Menyiapkan Prepared Statement untuk mencegah SQL Injection
$sql = "INSERT INTO tb_kontak (nama, email, subjek, pesan) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Gagal mempersiapkan database statement: " . $conn->error
    ]);
    exit();
}

// Binding parameters (s = string)
$stmt->bind_param("ssss", $nama, $email, $subjek, $pesan);

// Eksekusi query
if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Terima kasih! Pesan Anda telah berhasil dikirim dan disimpan."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Gagal menyimpan data ke database: " . $stmt->error
    ]);
}

// Menutup koneksi
$stmt->close();
$conn->close();
?>
