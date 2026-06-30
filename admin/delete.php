<?php
session_start();

// Validasi session administrator aktif
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit();
}

$type = isset($_GET['type']) ? $_GET['type'] : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (empty($type) || $id <= 0) {
    header('Location: index.php');
    exit();
}

// Hubungkan ke file koneksi database
require_once '../api/koneksi.php';

$table = '';
switch ($type) {
    case 'ppdb':
        $table = 'tb_ppdb';
        break;
    case 'buku_tamu':
        $table = 'tb_buku_tamu';
        break;
    case 'kontak':
        $table = 'tb_kontak';
        break;
    default:
        $conn->close();
        header('Location: index.php');
        exit();
}

// Lakukan penghapusan baris data
$sql = "DELETE FROM $table WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        $status = 'success';
    } else {
        $status = 'failed';
    }
    $stmt->close();
} else {
    $status = 'error';
}

$conn->close();

// Kembali ke dashboard dengan tab aktif yang sama dan membawa pesan status
header("Location: index.php?msg=deleted&status=$status&tab=$type");
exit();
?>
