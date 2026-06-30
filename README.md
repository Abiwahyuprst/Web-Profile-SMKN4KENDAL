# Web Portal SMK Negeri 4 Kendal (SKANIFO)

Web Portal Resmi SMK Negeri 4 Kendal yang dirancang menggunakan HTML5, Vanilla CSS, Native JavaScript, PHP, dan MySQL. Proyek ini dilengkapi dengan fitur pendaftaran PPDB online, Buku Tamu digital, Formulir Hubungi Kami, dan Panel Administrasi khusus untuk mengelola data.

---

## 🚀 Panduan Instalasi & Penggunaan (Local Server)

Untuk menjalankan seluruh fitur website termasuk database dan formulir dinamis, Anda memerlukan server lokal. Kami merekomendasikan menggunakan **XAMPP**.

### Langkah 1: Persiapan Berkas Proyek
1. Unduh (download) atau klon repositori ini dari GitHub.
2. Pindahkan folder proyek bernama `Web Sekolah` ke dalam direktori server lokal Anda:
   * **Windows (XAMPP)**: `C:\xampp\htdocs\Web Sekolah`
   * **macOS (XAMPP)**: `/Applications/XAMPP/htdocs/Web Sekolah`
   * **Linux (LAMP/Apache)**: `/var/www/html/Web Sekolah`

### Langkah 2: Menjalankan Server Web & Database
1. Buka aplikasi **XAMPP Control Panel**.
2. Klik tombol **Start** pada modul **Apache** dan **MySQL**. Pastikan keduanya berwarna hijau.

### Langkah 3: Konfigurasi Database
1. Buka web browser Anda (Firefox, Chrome, dll) lalu akses halaman **phpMyAdmin**:
   ```
   http://localhost/phpmyadmin
   ```
2. Buat database baru dengan mengklik menu **New** (Baru), masukkan nama database: `db_sekolah`, lalu klik **Create** (Buat).
3. Pilih database `db_sekolah` yang baru dibuat, lalu buka tab **Import** (Impor).
4. Klik tombol **Choose File** (Pilih Berkas) dan pilih file `database.sql` yang ada di root folder proyek ini.
5. Gulir ke bawah dan klik tombol **Import / Go** (Kirim) untuk mengeksekusi script SQL.

### Langkah 4: Mengakses Web Portal
Akses website melalui browser Anda menggunakan alamat berikut:
```
http://localhost/Web Sekolah/
```
* **Halaman Depan**: `http://localhost/Web Sekolah/index.html`
* **Halaman Kontak**: `http://localhost/Web Sekolah/pages/kontak.html`
* **Panel Admin**: `http://localhost/Web Sekolah/admin/login.php`

### 🔑 Akun Administrator Default
* **Username**: `admin`
* **Password**: `admin123`

---

## 🛠️ Panduan Troubleshooting Kompatibilitas Firefox

### 1. Masalah: Formulir database memunculkan dialog peringatan protokol `file://`
* **Gejala**: Ketika Anda mengklik formulir seperti PPDB, Buku Tamu, atau Hubungi Kami, muncul peringatan kompatibilitas dan data gagal dikirim.
* **Penyebab**: Anda membuka file HTML secara langsung dari folder explorer (pada URL browser tertulis `file:///C:/xampp/...`). Protokol `file://` membatasi permintaan AJAX karena aturan keamanan browser (*Same-Origin Policy*) dan browser tidak dapat mengeksekusi kode PHP backend secara mandiri.
* **Solusi**: Akses halaman web Anda menggunakan server lokal dengan protokol `http://` (seperti yang dijelaskan pada **Langkah 4** di atas):
  ```
  http://localhost/Web Sekolah/
  ```

### 2. Masalah: Konsol Firefox menampilkan error `CORS Request Not HTTP` saat memuat komponen Navbar/Footer
* **Gejala**: Desain Navbar atau Footer tidak muncul, dan konsol browser (F12) menampilkan pesan *CORS Request Not HTTP*.
* **Penyebab**: Kebijakan keamanan Firefox secara default sangat ketat terhadap permintaan berkas lokal (`fetch` berkas komponen `.html` lain) ketika halaman induk dibuka melalui protokol `file://`.
* **Solusi**:
  1. **Solusi Terbaik (Direkomendasikan)**: Jalankan proyek melalui localhost (`http://localhost/...`) agar seluruh request menggunakan protokol HTTP yang aman dan legal.
  2. **Solusi Alternatif (Hanya jika ingin melihat tampilan offline tanpa database)**:
     * Buka tab baru di Firefox, ketik `about:config` di address bar, lalu tekan Enter.
     * Klik tombol **Accept the Risk and Continue**.
     * Cari konfigurasi bernama: `security.fileuri.strict_origin_policy`.
     * Klik dua kali pada nama tersebut untuk mengubah nilainya dari `true` menjadi `false`.
     * Muat ulang (*refresh*) halaman web lokal Anda. Sekarang komponen Navbar dan Footer akan muncul dengan normal. (Catatan: Fitur kirim data database ke PHP tetap tidak akan bekerja hingga Anda memindahkannya ke localhost).

### 3. Masalah: Masalah Preflight CORS saat dijalankan di server terpisah (CORS Preflight Blocked)
* **Gejala**: Tombol kirim formulir memicu error jaringan di konsol Firefox yang bertuliskan *Cross-Origin Request Blocked*.
* **Penyebab**: Selama masa pengembangan, Anda mungkin menjalankan frontend pada port yang berbeda (misalnya VS Code Live Server di port `5500`) sedangkan PHP berjalan di XAMPP port `80`. Firefox menganggap ini sebagai permintaan lintas-domain (*Cross-Origin*) dan mengirimkan request `OPTIONS` (Preflight) sebelum melakukan request `POST` utama. Jika server tidak mendukung `OPTIONS`, browser memblokir request tersebut.
* **Solusi**: Kode API PHP pada proyek ini sudah kami perbarui secara otomatis untuk menangani request `OPTIONS` (Preflight). Pastikan baris kode penanganan header berikut tetap berada di bagian atas file PHP Anda di folder `/api/`:
  ```php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(200);
      exit();
  }
  ```

---

## 📁 Struktur Direktori Utama
* `/admin/`: Berisi halaman admin dashboard, autentikasi login administrator, dan hapus data.
* `/api/`: Berisi logika backend PHP (`koneksi.php`, submit formulir, penanganan CORS).
* `/assets/`: Berisi aset statis seperti CSS, logo/gambar sekolah, dan JavaScript utama (`script.js`).
* `/components/`: Berisi komponen global web (`navbar.html` & `footer.html`) untuk modularitas.
* `/data/`: Berisi berkas JSON untuk data program keahlian dan berita dinamis.
* `/pages/`: Berisi halaman-halaman informasi sekunder sekolah.
* `database.sql`: Skrip SQL untuk inisialisasi database dan tabel.
* `index.html`: Halaman utama website.
