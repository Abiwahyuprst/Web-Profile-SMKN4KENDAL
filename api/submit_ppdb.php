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
$asal_sekolah = isset($data['asal_sekolah']) ? trim($data['asal_sekolah']) : '';
$jurusan = isset($data['jurusan']) ? trim($data['jurusan']) : '';
$hp = isset($data['hp']) ? trim($data['hp']) : '';

// Validasi input wajib
if (empty($nama) || empty($asal_sekolah) || empty($jurusan) || empty($hp)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Semua kolom input wajib diisi."
    ]);
    exit();
}

// Hubungkan ke file koneksi database
require_once 'koneksi.php';

// Menyiapkan Prepared Statement untuk mencegah SQL Injection
$sql = "INSERT INTO tb_ppdb (nama, asal_sekolah, jurusan, hp) VALUES (?, ?, ?, ?)";
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
$stmt->bind_param("ssss", $nama, $asal_sekolah, $jurusan, $hp);

// Eksekusi query
if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Pendaftaran berhasil disimpan ke database!"
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
