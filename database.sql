-- =======================================================
-- SQL Database Setup Script untuk SMK Negeri 4 Kendal
-- Database: db_sekolah
-- =======================================================

-- 1. Membuat Database (jika belum ada)
CREATE DATABASE IF NOT EXISTS db_sekolah;
USE db_sekolah;

-- 2. Membuat Tabel tb_ppdb (Pendaftaran Peserta Didik Baru)
CREATE TABLE IF NOT EXISTS tb_ppdb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    asal_sekolah VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    hp VARCHAR(20) NOT NULL,
    tanggal_daftar TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Membuat Tabel tb_buku_tamu (Log Kunjungan Buku Tamu)
CREATE TABLE IF NOT EXISTS tb_buku_tamu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    instansi VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tujuan TEXT NOT NULL,
    tanggal_kunjungan TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Membuat Tabel tb_kontak (Pesan Hubungi Kami)
CREATE TABLE IF NOT EXISTS tb_kontak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subjek VARCHAR(150) NOT NULL,
    pesan TEXT NOT NULL,
    tanggal_kirim TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Membuat Tabel tb_admin (Autentikasi Administrator)
CREATE TABLE IF NOT EXISTS tb_admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Memasukkan Akun Admin Default
-- Username: admin
-- Password: admin123 (Menggunakan Bcrypt Hash)
INSERT INTO tb_admin (username, password, nama_lengkap) 
VALUES ('admin', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Administrator SKANIFO')
ON DUPLICATE KEY UPDATE username=username;
