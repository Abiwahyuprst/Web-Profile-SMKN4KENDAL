<?php
session_start();

// Proteksi halaman admin - jika belum login, tendang ke login.php
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit();
}

// Hubungkan ke database
require_once '../api/koneksi.php';

// 1. Mengambil Statistik Data
$total_ppdb = 0;
if ($res = $conn->query("SELECT COUNT(*) as total FROM tb_ppdb")) {
    $row = $res->fetch_assoc();
    $total_ppdb = $row['total'];
}

$total_buku_tamu = 0;
if ($res = $conn->query("SELECT COUNT(*) as total FROM tb_buku_tamu")) {
    $row = $res->fetch_assoc();
    $total_buku_tamu = $row['total'];
}

$total_kontak = 0;
if ($res = $conn->query("SELECT COUNT(*) as total FROM tb_kontak")) {
    $row = $res->fetch_assoc();
    $total_kontak = $row['total'];
}

// 2. Mengambil Semua Baris Data (Terbaru dahulu)
$ppdb_list = [];
if ($res = $conn->query("SELECT * FROM tb_ppdb ORDER BY tanggal_daftar DESC")) {
    while ($row = $res->fetch_assoc()) {
        $ppdb_list[] = $row;
    }
}

$buku_tamu_list = [];
if ($res = $conn->query("SELECT * FROM tb_buku_tamu ORDER BY tanggal_kunjungan DESC")) {
    while ($row = $res->fetch_assoc()) {
        $buku_tamu_list[] = $row;
    }
}

$kontak_list = [];
if ($res = $conn->query("SELECT * FROM tb_kontak ORDER BY tanggal_kirim DESC")) {
    while ($row = $res->fetch_assoc()) {
        $kontak_list[] = $row;
    }
}

$conn->close();

// Helper untuk format tanggal Indonesia
function formatDateIndo($datetime) {
    if (!$datetime) return '-';
    $timestamp = strtotime($datetime);
    $hari = array("Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu");
    $bulan = array("","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
    
    return $hari[date("w", $timestamp)] . ", " . date("j", $timestamp) . " " . $bulan[date("n", $timestamp)] . " " . date("Y", $timestamp) . " " . date("H:i", $timestamp);
}

// Helper untuk menerjemahkan kode jurusan ke Nama Lengkap
function getJurusanName($code) {
    switch (strtolower(trim($code))) {
        case 'pplg': return 'Pengembangan Perangkat Lunak & Gim (PPLG)';
        case 'tkro': return 'Teknik Kendaraan Ringan Otomotif (TKRO)';
        case 'tkj': return 'Teknik Komputer & Jaringan (TKJ)';
        case 'ap': return 'Akuntansi dan Keuangan Lembaga (AKL)';
        case 'kuliner': return 'Tata Boga / Kuliner';
        case 'nkpi': return 'Nautika Kapal Penangkap Ikan (NKPI)';
        default: return htmlspecialchars($code);
    }
}

// Tentukan tab aktif default berdasarkan kembalian url param
$active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'ppdb';
if (!in_array($active_tab, ['ppdb', 'buku_tamu', 'kontak'])) {
    $active_tab = 'ppdb';
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | SMK Negeri 4 Kendal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="style_admin.css">
    <style>
        /* Toast notification */
        .toast-notif {
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 1100;
            transform: translateY(-20px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .toast-notif.show {
            transform: translateY(0);
            opacity: 1;
        }
        .toast-notif.error {
            background: #ef4444;
        }
    </style>
</head>
<body>

    <!-- Toast Alert untuk status operasi -->
    <?php if (isset($_GET['msg']) && $_GET['msg'] === 'deleted'): ?>
        <?php 
            $status = isset($_GET['status']) ? $_GET['status'] : 'success';
            $is_error = ($status !== 'success');
            $msg_text = $is_error ? 'Gagal menghapus baris data.' : 'Data berhasil dihapus dari database.';
        ?>
        <div id="toastAlert" class="toast-notif <?php echo $is_error ? 'error' : ''; ?>">
            <i class="ph <?php echo $is_error ? 'ph-x-circle' : 'ph-check-circle'; ?>" style="font-size: 1.4rem;"></i>
            <span><?php echo $msg_text; ?></span>
        </div>
    <?php endif; ?>

    <div class="admin-container">

        <!-- Sidebar Kiri -->
        <aside class="admin-sidebar">
            <a href="index.php" class="sidebar-logo">
                <img src="../assets/img/logo/logo-sekolah/logo.webp" alt="Logo SMK N 4 Kendal">
                <div class="sidebar-logo-text">
                    <h1>SMKN 4 Kendal</h1>
                    <span>Admin Dashboard</span>
                </div>
            </a>

            <ul class="sidebar-menu">
                <li class="<?php echo $active_tab === 'ppdb' ? 'active' : ''; ?>" data-target="ppdb">
                    <a href="javascript:void(0)" onclick="switchTab('ppdb')">
                        <i class="ph ph-student"></i>
                        <span>Data PPDB</span>
                    </a>
                </li>
                <li class="<?php echo $active_tab === 'buku_tamu' ? 'active' : ''; ?>" data-target="buku_tamu">
                    <a href="javascript:void(0)" onclick="switchTab('buku_tamu')">
                        <i class="ph ph-notebook"></i>
                        <span>Buku Tamu</span>
                    </a>
                </li>
                <li class="<?php echo $active_tab === 'kontak' ? 'active' : ''; ?>" data-target="kontak">
                    <a href="javascript:void(0)" onclick="switchTab('kontak')">
                        <i class="ph ph-envelope"></i>
                        <span>Pesan Masuk</span>
                    </a>
                </li>
            </ul>

            <div class="sidebar-footer">
                <a href="logout.php" onclick="return confirm('Apakah Anda yakin ingin keluar dari sistem?')">
                    <i class="ph ph-sign-out"></i>
                    <span>Keluar / Logout</span>
                </a>
            </div>
        </aside>

        <!-- Area Konten Utama -->
        <main class="admin-main">
            
            <!-- Header Atas -->
            <header class="admin-header">
                <div class="admin-header-title">
                    <h2>Ringkasan Portal</h2>
                    <p>Sistem Informasi Administrasi SMK Negeri 4 Kendal</p>
                </div>
                <div class="admin-profile">
                    <div class="admin-avatar">
                        <?php echo strtoupper(substr($_SESSION['admin_name'], 0, 1)); ?>
                    </div>
                    <div class="admin-profile-info">
                        <div class="admin-info-name"><?php echo htmlspecialchars($_SESSION['admin_name']); ?></div>
                        <div class="admin-info-role">Administrator Portal</div>
                    </div>
                </div>
            </header>

            <!-- Grid Metrik Ringkasan -->
            <section class="metrics-grid">
                <div class="metric-card" onclick="switchTab('ppdb')" style="cursor: pointer;">
                    <div class="metric-icon-box ppdb">
                        <i class="ph ph-student"></i>
                    </div>
                    <div class="metric-data">
                        <h3><?php echo number_format($total_ppdb, 0, ',', '.'); ?></h3>
                        <p>Total Pendaftar PPDB</p>
                    </div>
                </div>

                <div class="metric-card" onclick="switchTab('buku_tamu')" style="cursor: pointer;">
                    <div class="metric-icon-box tamu">
                        <i class="ph ph-notebook"></i>
                    </div>
                    <div class="metric-data">
                        <h3><?php echo number_format($total_buku_tamu, 0, ',', '.'); ?></h3>
                        <p>Total Log Buku Tamu</p>
                    </div>
                </div>

                <div class="metric-card" onclick="switchTab('kontak')" style="cursor: pointer;">
                    <div class="metric-icon-box kontak">
                        <i class="ph ph-envelope"></i>
                    </div>
                    <div class="metric-data">
                        <h3><?php echo number_format($total_kontak, 0, ',', '.'); ?></h3>
                        <p>Total Pesan Kontak</p>
                    </div>
                </div>
            </section>

            <!-- Box Tabel dan Data -->
            <div class="dashboard-content-box">
                
                <!-- Navigasi Tab -->
                <nav class="tabs-navigation">
                    <button class="tab-btn <?php echo $active_tab === 'ppdb' ? 'active' : ''; ?>" id="btn-tab-ppdb" onclick="switchTab('ppdb')">
                        <i class="ph ph-student"></i> Data PPDB
                    </button>
                    <button class="tab-btn <?php echo $active_tab === 'buku_tamu' ? 'active' : ''; ?>" id="btn-tab-buku_tamu" onclick="switchTab('buku_tamu')">
                        <i class="ph ph-notebook"></i> Buku Tamu
                    </button>
                    <button class="tab-btn <?php echo $active_tab === 'kontak' ? 'active' : ''; ?>" id="btn-tab-kontak" onclick="switchTab('kontak')">
                        <i class="ph ph-envelope"></i> Pesan Masuk
                    </button>
                </nav>

                <!-- Header Laporan Saat di-Print -->
                <div class="print-header">
                    <h1>SMK NEGERI 4 KENDAL</h1>
                    <p>Alamat: Jl. Soekarno-Hatta Barat, Kecamatan Brangsong, Kabupaten Kendal, Jawa Tengah</p>
                    <hr>
                    <h2 id="print-report-title" style="margin-top: 1rem; text-transform: uppercase;">Laporan Data Portal</h2>
                </div>

                <!-- =======================================================
                 * TAB 1: DATA PPDB
                 ======================================================= -->
                <div class="tab-content <?php echo $active_tab === 'ppdb' ? 'active' : ''; ?>" id="tab-ppdb">
                    <div class="tab-action-header">
                        <div class="search-box-wrapper">
                            <i class="ph ph-magnifying-glass"></i>
                            <input type="text" id="search-ppdb" placeholder="Cari nama, asal sekolah, atau nomor WA...">
                        </div>
                        <div class="actions-buttons-group">
                            <select id="filter-ppdb-jurusan" class="filter-select">
                                <option value="">Semua Jurusan...</option>
                                <option value="pplg">PPLG</option>
                                <option value="tkro">TKRO</option>
                                <option value="tkj">TKJ</option>
                                <option value="ap">AKL / AP</option>
                                <option value="kuliner">Tata Boga / Kuliner</option>
                                <option value="nkpi">NKPI</option>
                            </select>
                            <button class="btn-action btn-action-outline" onclick="printData('ppdb', 'Laporan Pendaftaran PPDB TA 2026/2027')">
                                <i class="ph ph-printer"></i> Cetak Data
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table-admin" id="table-ppdb-el">
                            <thead>
                                <tr>
                                    <th width="60">No</th>
                                    <th>Nama Lengkap</th>
                                    <th>Asal Sekolah</th>
                                    <th>Program Keahlian</th>
                                    <th>No. WhatsApp</th>
                                    <th>Tanggal Daftar</th>
                                    <th width="110" class="btn-row-action-header">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (empty($ppdb_list)): ?>
                                    <tr>
                                        <td colspan="7" class="empty-row-text">Belum ada data pendaftar baru.</td>
                                    </tr>
                                <?php else: ?>
                                    <?php $i = 1; foreach ($ppdb_list as $row): ?>
                                        <tr class="row-item" data-jurusan="<?php echo htmlspecialchars($row['jurusan']); ?>">
                                            <td><?php echo $i++; ?></td>
                                            <td class="searchable-cell" style="font-weight: 600;"><?php echo htmlspecialchars($row['nama']); ?></td>
                                            <td class="searchable-cell"><?php echo htmlspecialchars($row['asal_sekolah']); ?></td>
                                            <td>
                                                <span class="badge badge-primary">
                                                    <?php echo strtoupper(htmlspecialchars($row['jurusan'])); ?>
                                                </span>
                                            </td>
                                            <td class="searchable-cell"><?php echo htmlspecialchars($row['hp']); ?></td>
                                            <td style="font-size: 0.85rem; color: var(--text-muted);">
                                                <?php echo formatDateIndo($row['tanggal_daftar']); ?>
                                            </td>
                                            <td class="actions-cell">
                                                <button class="btn-row-action view" 
                                                        title="Lihat Detail"
                                                        data-type="ppdb"
                                                        data-nama="<?php echo htmlspecialchars($row['nama']); ?>"
                                                        data-asal="<?php echo htmlspecialchars($row['asal_sekolah']); ?>"
                                                        data-jurusan="<?php echo getJurusanName($row['jurusan']); ?>"
                                                        data-hp="<?php echo htmlspecialchars($row['hp']); ?>"
                                                        data-tanggal="<?php echo formatDateIndo($row['tanggal_daftar']); ?>">
                                                    <i class="ph ph-eye"></i>
                                                </button>
                                                <a href="delete.php?type=ppdb&id=<?php echo $row['id']; ?>" 
                                                   class="btn-row-action delete" 
                                                   title="Hapus Data"
                                                   onclick="return confirm('Apakah Anda yakin ingin menghapus data pendaftaran <?php echo htmlspecialchars($row['nama']); ?>?')">
                                                    <i class="ph ph-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- =======================================================
                 * TAB 2: DATA BUKU TAMU
                 ======================================================= -->
                <div class="tab-content <?php echo $active_tab === 'buku_tamu' ? 'active' : ''; ?>" id="tab-buku_tamu">
                    <div class="tab-action-header">
                        <div class="search-box-wrapper">
                            <i class="ph ph-magnifying-glass"></i>
                            <input type="text" id="search-buku_tamu" placeholder="Cari nama, instansi, atau email...">
                        </div>
                        <button class="btn-action btn-action-outline" onclick="printData('buku_tamu', 'Laporan Kunjungan Buku Tamu Digital')">
                            <i class="ph ph-printer"></i> Cetak Data
                        </button>
                    </div>

                    <div class="table-responsive">
                        <table class="table-admin" id="table-buku_tamu-el">
                            <thead>
                                <tr>
                                    <th width="60">No</th>
                                    <th>Nama Lengkap</th>
                                    <th>Instansi / Asal</th>
                                    <th>Email</th>
                                    <th>Tujuan / Pesan</th>
                                    <th>Tanggal Kunjungan</th>
                                    <th width="110" class="btn-row-action-header">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (empty($buku_tamu_list)): ?>
                                    <tr>
                                        <td colspan="7" class="empty-row-text">Belum ada data kunjungan tamu.</td>
                                    </tr>
                                <?php else: ?>
                                    <?php $i = 1; foreach ($buku_tamu_list as $row): ?>
                                        <tr class="row-item">
                                            <td><?php echo $i++; ?></td>
                                            <td class="searchable-cell" style="font-weight: 600;"><?php echo htmlspecialchars($row['nama']); ?></td>
                                            <td class="searchable-cell"><?php echo htmlspecialchars($row['instansi']); ?></td>
                                            <td class="searchable-cell"><?php echo htmlspecialchars($row['email']); ?></td>
                                            <td class="searchable-cell" style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                <?php echo htmlspecialchars($row['tujuan']); ?>
                                            </td>
                                            <td style="font-size: 0.85rem; color: var(--text-muted);">
                                                <?php echo formatDateIndo($row['tanggal_kunjungan']); ?>
                                            </td>
                                            <td class="actions-cell">
                                                <button class="btn-row-action view" 
                                                        title="Lihat Detail"
                                                        data-type="buku_tamu"
                                                        data-nama="<?php echo htmlspecialchars($row['nama']); ?>"
                                                        data-instansi="<?php echo htmlspecialchars($row['instansi']); ?>"
                                                        data-email="<?php echo htmlspecialchars($row['email']); ?>"
                                                        data-tujuan="<?php echo htmlspecialchars($row['tujuan']); ?>"
                                                        data-tanggal="<?php echo formatDateIndo($row['tanggal_kunjungan']); ?>">
                                                    <i class="ph ph-eye"></i>
                                                </button>
                                                <a href="delete.php?type=buku_tamu&id=<?php echo $row['id']; ?>" 
                                                   class="btn-row-action delete" 
                                                   title="Hapus Data"
                                                   onclick="return confirm('Apakah Anda yakin ingin menghapus catatan kunjungan dari <?php echo htmlspecialchars($row['nama']); ?>?')">
                                                    <i class="ph ph-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- =======================================================
                 * TAB 3: DATA KONTAK MASUK
                 ======================================================= -->
                <div class="tab-content <?php echo $active_tab === 'kontak' ? 'active' : ''; ?>" id="tab-kontak">
                    <div class="tab-action-header">
                        <div class="search-box-wrapper">
                            <i class="ph ph-magnifying-glass"></i>
                            <input type="text" id="search-kontak" placeholder="Cari pengirim, subjek, atau email...">
                        </div>
                        <button class="btn-action btn-action-outline" onclick="printData('kontak', 'Laporan Pesan Hubungi Kami Masuk')">
                            <i class="ph ph-printer"></i> Cetak Data
                        </button>
                    </div>

                    <div class="table-responsive">
                        <table class="table-admin" id="table-kontak-el">
                            <thead>
                                <tr>
                                    <th width="60">No</th>
                                    <th>Nama Pengirim</th>
                                    <th>Alamat Email</th>
                                    <th>Subjek / Perihal</th>
                                    <th>Isi Pesan</th>
                                    <th>Tanggal Masuk</th>
                                    <th width="110" class="btn-row-action-header">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (empty($kontak_list)): ?>
                                    <tr>
                                        <td colspan="7" class="empty-row-text">Belum ada pesan masuk.</td>
                                    </tr>
                                <?php else: ?>
                                    <?php $i = 1; foreach ($kontak_list as $row): ?>
                                        <tr class="row-item">
                                            <td><?php echo $i++; ?></td>
                                            <td class="searchable-cell" style="font-weight: 600;"><?php echo htmlspecialchars($row['nama']); ?></td>
                                            <td class="searchable-cell"><?php echo htmlspecialchars($row['email']); ?></td>
                                            <td class="searchable-cell" style="font-weight: 500; color: var(--secondary-light);"><?php echo htmlspecialchars($row['subjek']); ?></td>
                                            <td class="searchable-cell" style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                <?php echo htmlspecialchars($row['pesan']); ?>
                                            </td>
                                            <td style="font-size: 0.85rem; color: var(--text-muted);">
                                                <?php echo formatDateIndo($row['tanggal_kirim']); ?>
                                            </td>
                                            <td class="actions-cell">
                                                <button class="btn-row-action view" 
                                                        title="Lihat Detail"
                                                        data-type="kontak"
                                                        data-nama="<?php echo htmlspecialchars($row['nama']); ?>"
                                                        data-email="<?php echo htmlspecialchars($row['email']); ?>"
                                                        data-subjek="<?php echo htmlspecialchars($row['subjek']); ?>"
                                                        data-pesan="<?php echo htmlspecialchars($row['pesan']); ?>"
                                                        data-tanggal="<?php echo formatDateIndo($row['tanggal_kirim']); ?>">
                                                    <i class="ph ph-eye"></i>
                                                </button>
                                                <a href="delete.php?type=kontak&id=<?php echo $row['id']; ?>" 
                                                   class="btn-row-action delete" 
                                                   title="Hapus Data"
                                                   onclick="return confirm('Apakah Anda yakin ingin menghapus pesan dari <?php echo htmlspecialchars($row['nama']); ?>?')">
                                                    <i class="ph ph-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </main>
    </div>

    <!-- =======================================================
     * MODAL DETAIL DATA
     ======================================================= -->
    <div id="detailModal" class="modal-admin">
        <div class="modal-content-admin">
            <div class="modal-header-admin">
                <h3 id="modalTitle">Detail Data</h3>
                <button class="modal-close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body-admin" id="modalBody">
                <!-- Konten dinamis akan di-inject lewat JS -->
            </div>
            <div class="modal-footer-admin" id="modalFooter">
                <!-- Aksi tambahan (WA / Email link) -->
            </div>
        </div>
    </div>

    <!-- Script Fungsionalitas Dashboard -->
    <script>
        // 1. Alert Toast Auto-Hide
        const toast = document.getElementById('toastAlert');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }

        // 2. Navigasi Tab
        function switchTab(tabId) {
            // Hapus kelas aktif di tab-btn
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            // Hapus kelas aktif di tab-content
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            // Hapus kelas aktif di sidebar menu
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));

            // Aktifkan elemen target
            const targetBtn = document.getElementById('btn-tab-' + tabId);
            if (targetBtn) targetBtn.classList.add('active');

            const targetContent = document.getElementById('tab-' + tabId);
            if (targetContent) targetContent.classList.add('active');

            const sidebarLi = document.querySelector(`.sidebar-menu li[data-target="${tabId}"]`);
            if (sidebarLi) sidebarLi.classList.add('active');

            // Simpan history status state jika diperlukan tanpa me-reload halaman
            const url = new URL(window.location);
            url.searchParams.set('tab', tabId);
            window.history.pushState({}, '', url);
        }

        // 3. Modals Manager
        const modal = document.getElementById('detailModal');

        // Buka Modal & Inject Data
        document.querySelectorAll('.btn-row-action.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const name = this.getAttribute('data-nama');
                const tanggal = this.getAttribute('data-tanggal');
                let bodyHtml = '';
                let footerHtml = `<button class="btn-action btn-action-outline" onclick="closeModal()">Tutup</button>`;

                if (type === 'ppdb') {
                    const asal = this.getAttribute('data-asal');
                    const jurusan = this.getAttribute('data-jurusan');
                    const hp = this.getAttribute('data-hp');
                    
                    // Format HP untuk WA link (ganti 08 menjadi +62 atau 62)
                    let formattedHp = hp.replace(/^08/, '628');
                    formattedHp = formattedHp.replace(/[^0-9]/g, '');

                    bodyHtml = `
                        <div class="detail-grid">
                            <div class="detail-label">Nama Lengkap</div>
                            <div class="detail-val" style="font-weight: 600;">: ${name}</div>
                            
                            <div class="detail-label">Asal Sekolah</div>
                            <div class="detail-val">: ${asal}</div>
                            
                            <div class="detail-label">Program Keahlian</div>
                            <div class="detail-val">: ${jurusan}</div>
                            
                            <div class="detail-label">No. WhatsApp</div>
                            <div class="detail-val">: ${hp}</div>
                            
                            <div class="detail-label">Tanggal Daftar</div>
                            <div class="detail-val">: ${tanggal}</div>
                        </div>
                    `;

                    footerHtml = `
                        <a href="https://wa.me/${formattedHp}" target="_blank" class="btn-action btn-action-primary" style="background: #25d366; color: white;">
                            <i class="ph ph-whatsapp-logo"></i> Hubungi via WhatsApp
                        </a>
                        <button class="btn-action btn-action-outline" onclick="closeModal()" style="margin-left: 0.5rem;">Tutup</button>
                    `;

                    document.getElementById('modalTitle').innerText = 'Detail Pendaftar PPDB';

                } else if (type === 'buku_tamu') {
                    const instansi = this.getAttribute('data-instansi');
                    const email = this.getAttribute('data-email');
                    const tujuan = this.getAttribute('data-tujuan');

                    bodyHtml = `
                        <div class="detail-grid">
                            <div class="detail-label">Nama Lengkap</div>
                            <div class="detail-val" style="font-weight: 600;">: ${name}</div>
                            
                            <div class="detail-label">Asal Instansi</div>
                            <div class="detail-val">: ${instansi}</div>
                            
                            <div class="detail-label">Alamat Email</div>
                            <div class="detail-val">: ${email}</div>
                            
                            <div class="detail-label">Tanggal Log</div>
                            <div class="detail-val">: ${tanggal}</div>
                            
                            <div class="detail-label" style="grid-column: span 2;">Pesan & Kesan / Tujuan Kunjungan:</div>
                            <div class="detail-val textarea-val" style="grid-column: span 2;">${tujuan.replace(/\n/g, '<br>')}</div>
                        </div>
                    `;

                    footerHtml = `
                        <a href="mailto:${email}" class="btn-action btn-action-primary">
                            <i class="ph ph-envelope"></i> Kirim Email Balasan
                        </a>
                        <button class="btn-action btn-action-outline" onclick="closeModal()" style="margin-left: 0.5rem;">Tutup</button>
                    `;

                    document.getElementById('modalTitle').innerText = 'Detail Catatan Buku Tamu';

                } else if (type === 'kontak') {
                    const email = this.getAttribute('data-email');
                    const subjek = this.getAttribute('data-subjek');
                    const pesan = this.getAttribute('data-pesan');

                    bodyHtml = `
                        <div class="detail-grid">
                            <div class="detail-label">Nama Pengirim</div>
                            <div class="detail-val" style="font-weight: 600;">: ${name}</div>
                            
                            <div class="detail-label">Alamat Email</div>
                            <div class="detail-val">: ${email}</div>
                            
                            <div class="detail-label">Subjek Pesan</div>
                            <div class="detail-val">: ${subjek}</div>
                            
                            <div class="detail-label">Tanggal Kirim</div>
                            <div class="detail-val">: ${tanggal}</div>
                            
                            <div class="detail-label" style="grid-column: span 2;">Isi Pesan Hubungi Kami:</div>
                            <div class="detail-val textarea-val" style="grid-column: span 2;">${pesan.replace(/\n/g, '<br>')}</div>
                        </div>
                    `;

                    footerHtml = `
                        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subjek)}" class="btn-action btn-action-primary">
                            <i class="ph ph-envelope"></i> Balas Email Masuk
                        </a>
                        <button class="btn-action btn-action-outline" onclick="closeModal()" style="margin-left: 0.5rem;">Tutup</button>
                    `;

                    document.getElementById('modalTitle').innerText = 'Detail Pesan Masuk';
                }

                document.getElementById('modalBody').innerHTML = bodyHtml;
                document.getElementById('modalFooter').innerHTML = footerHtml;
                modal.classList.add('active');
            });
        });

        function closeModal() {
            modal.classList.remove('active');
        }

        // Tutup modal jika klik di luar box modal
        window.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };

        // 4. Instant Search & Filtering
        // Instant Search PPDB
        const searchPpdb = document.getElementById('search-ppdb');
        const filterPpdbJurusan = document.getElementById('filter-ppdb-jurusan');
        if (searchPpdb && filterPpdbJurusan) {
            const runPpdbFilter = () => {
                const query = searchPpdb.value.toLowerCase().trim();
                const selectedJurusan = filterPpdbJurusan.value.toLowerCase().trim();
                const rows = document.querySelectorAll('#table-ppdb-el tbody tr.row-item');

                rows.forEach(row => {
                    let matchesSearch = false;
                    row.querySelectorAll('.searchable-cell').forEach(cell => {
                        if (cell.textContent.toLowerCase().includes(query)) {
                            matchesSearch = true;
                        }
                    });
                    
                    const rowJurusan = row.getAttribute('data-jurusan').toLowerCase().trim();
                    const matchesJurusan = (selectedJurusan === '' || rowJurusan === selectedJurusan);

                    if (matchesSearch && matchesJurusan) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            };
            searchPpdb.addEventListener('keyup', runPpdbFilter);
            filterPpdbJurusan.addEventListener('change', runPpdbFilter);
        }

        // Instant Search Buku Tamu
        const searchBukuTamu = document.getElementById('search-buku_tamu');
        if (searchBukuTamu) {
            searchBukuTamu.addEventListener('keyup', function() {
                const query = this.value.toLowerCase().trim();
                const rows = document.querySelectorAll('#table-buku_tamu-el tbody tr.row-item');

                rows.forEach(row => {
                    let matches = false;
                    row.querySelectorAll('.searchable-cell').forEach(cell => {
                        if (cell.textContent.toLowerCase().includes(query)) {
                            matches = true;
                        }
                    });
                    row.style.display = matches ? '' : 'none';
                });
            });
        }

        // Instant Search Kontak
        const searchKontak = document.getElementById('search-kontak');
        if (searchKontak) {
            searchKontak.addEventListener('keyup', function() {
                const query = this.value.toLowerCase().trim();
                const rows = document.querySelectorAll('#table-kontak-el tbody tr.row-item');

                rows.forEach(row => {
                    let matches = false;
                    row.querySelectorAll('.searchable-cell').forEach(cell => {
                        if (cell.textContent.toLowerCase().includes(query)) {
                            matches = true;
                        }
                    });
                    row.style.display = matches ? '' : 'none';
                });
            });
        }

        // 5. Cetak/Print Laporan
        function printData(tabId, title) {
            // Set judul laporan untuk cetak
            document.getElementById('print-report-title').innerText = title;
            
            // Tambahkan kelas print-active ke tab target agar terlihat saat cetak
            const tabEl = document.getElementById('tab-' + tabId);
            if (tabEl) {
                tabEl.classList.add('active-print');
                window.print();
                
                // Hapus kembali setelah proses cetak selesai
                setTimeout(() => {
                    tabEl.classList.remove('active-print');
                }, 1000);
            }
        }
    </script>
</body>
</html>
