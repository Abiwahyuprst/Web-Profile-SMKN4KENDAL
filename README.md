# 🏫 Website SMK Negeri 4 Kendal — The Ultimate School Hub

Website SKANIFO yang dirancang super *clean*, modern, dan dinamis. Proyek ini memadukan kolaborasi maut antara **HTML5, Vanilla CSS, Native JavaScript, PHP, dan MySQL**. Web ini udah *full-package* dengan fitur pendaftaran PPDB online, Buku Tamu digital, Form Kontak, sampai Panel Dashboard khusus Admin buat kelola data secara *sat-set*.

---

## 🛠️ Behind The Scenes : Alur Pembuatan Proyek (Dari Zero ke Hero)

Proyek ini nggak langsung jadi gitu aja, gaes. Ada proses terstruktur (*SDLC era*) yang dilalui dari awal nyusun ide sampe webnya siap di-deploy:

1. **Tahap 1: Brainstorming & Analisis Kebutuhan (The Core Idea)**
   * **Goal**: Nentuin fitur esensial apa aja yang wajib ada biar sekolah makin digital.
   * **Result**: Kita sepakat buat bikin halaman utama yang informatif, plus 3 fitur interaktif (PPDB, Buku Tamu, Kontak) dan satu gerbang rahasia alias *Dashboard Admin*.

2. **Tahap 2: Arsitektur No-Debat (Perancangan UI & Database)**
   * **Modular System**: Biar gak pusing *copy-paste* kode berulang kali, komponen kayak Navbar dan Footer dipisah jadi file tersendiri. Efisien dan *maintainable*!
   * **Data Modeling**: Merancang basis data relasional via MySQL (`db_sekolah`) buat nampung data dari user secara *real-time*.
   * **Smart Storage**: Informasi jurusan/program keahlian disimpen di file `.json` lokal biar *load*-nya cepet tanpa perlu nge-bebanin database.

3. **Tahap 3: Ngoding Era (Implementasi & Eksekusi)**
   * **Frontend**: Sisi tampilan disikat habis pake HTML5 (struktur semantik) dan Vanilla CSS (layouting responsif tanpa framework biar super enteng). JavaScript bertugas buat narik data (*fetch API*) secara asinkron.
   * **Backend**: Logika di balik layar diproses pake Native PHP buat ngehandle validasi formulir dan sesi (*session*) login admin biar aman.

4. **Tahap 4: Bug Hunting & Penyembuhan (Testing & Troubleshooting)**
   * Menguji coba fungsi form di berbagai browser. Di tahap ini, kita nemu beberapa kendala proteksi ketat (CORS dan file protocol) di Firefox, lalu langsung kita racik solusinya (bisa cek di bagian *Troubleshooting* di bawah).

---

## 📊 Specs & Tech Stack Anti-Ribet

| Teknologi | Peran / Tugas Utamanya |
| :--- | :--- |
| **HTML5 & Vanilla CSS** | Pondasi dasar web dan bikin visual antarmuka (UI) yang estetik plus responsif di HP/Laptop. |
| **Native JavaScript** | Bikin web makin hidup, ngurusin manipulasi DOM, dan nge-load komponen modular pake `fetch()`. |
| **Native PHP** | Otak di balik layar yang ngurusin arus data, validasi input, dan keamanan akun admin. |
| **MySQL** | Rumah utama tempat nyimpen data pendaftar PPDB, pesan buku tamu, dan password admin. |

---

## 📁 POV: Isi Folder Proyek (Struktur Direktori)

Biar gak tersesat pas bedah kode, ini dia peta struktur folder utamanya:

```files
📂 Web Sekolah/
├── 📂 admin/          # Area admin (Dashboard, login.php, & sistem kelola data)
├── 📂 api/            # Mesin PHP (koneksi.php, pengolah form, & konfigurasi CORS)
├── 📂 assets/         # Gudang aset statis
│   ├── 📂 css/        # File styling utama (style.css)
│   ├── 📂 img/        # Foto, ilustrasi, dan logo resmi SKANIFO
│   └── 📂 js/         # Script logika frontend (script.js)
├── 📂 components/     # Komponen modular yang sering dipake (navbar.html & footer.html)
├── 📂 data/           # Penyimpanan data statis berbasis JSON (Berita & Jurusan)
├── 📂 pages/          # Halaman informasi pelengkap (Kontak, Profil Jurusan, dll.)
├── database.sql       # File SQL buat nge-import tabel database kamu
└── index.html         # Pintu gerbang utama / Landing page website
