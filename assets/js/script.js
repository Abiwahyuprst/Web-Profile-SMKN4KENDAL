document.addEventListener('DOMContentLoaded', () => {
    // Determine if we are in a subpage (inside pages/ folder)
    const isSubPage = window.location.pathname.includes('/pages/');
    const pathPrefix = isSubPage ? '../' : '';
    const pagePrefix = isSubPage ? '' : 'pages/';

    // Full Fallback HTML for Navbar if fetch fails (Matching navbar.html exactly)
    const fallbackNavbar = `
    <div class="nav-container">
        <a href="${pathPrefix}index.html" class="logo">
            <img src="${pathPrefix}assets/img/logo/logo-sekolah/logo.webp" alt="Logo SMK N 4 Kendal" class="logo-img">
            <div class="logo-brand">
                <div class="logo-main">SMKN 4 Kendal</div>
                <div class="logo-tagline">Skanifo Unggul Berkarakter</div>
            </div>
        </a>
        <ul class="nav-links">
            <li><a href="${pathPrefix}index.html">Beranda</a></li>
            <li class="dropdown">
                <a href="#">Profil <i class="ph ph-caret-down"></i></a>
                <div class="dropdown-content">
                    <a href="${pagePrefix}visi-misi.html">Visi & Misi</a>
                    <a href="${pagePrefix}profilsekolah.html">Profil Sekolah</a>
                    <a href="${pagePrefix}struktur-organisasi.html">Struktur Organisasi</a>
                    <a href="${pagePrefix}direktori.html">Guru & Staff</a>
                    <a href="${pagePrefix}ekskul.html">Ekstrakurikuler</a>
                    <a href="${pagePrefix}prestasi.html">Prestasi</a>
                </div>
            </li>
            <li><a href="${pagePrefix}berita.html">Berita</a></li>
            <li><a href="${pagePrefix}pengumuman.html">Pengumuman</a></li>
            <li><a href="${pagePrefix}agenda.html">Agenda</a></li>
            <li class="dropdown">
                <a href="#">SPMB <i class="ph ph-caret-down"></i></a>
                <div class="dropdown-content">
                    <a href="${pagePrefix}spmb.html">SPMB Skanifo</a>
                    <a href="https://spmb.jatengprov.go.id/" target="_blank">SPMB JATENG</a>
                </div>
            </li>
            <li class="dropdown">
                <a href="#">Lainnya <i class="ph ph-caret-down"></i></a>
                <div class="dropdown-content">
                    <a href="${pagePrefix}galeri.html">Galeri Foto</a>
                    <a href="${pagePrefix}galeri-video.html">Galeri Video</a>
                    <a href="${pagePrefix}kontak.html">Hubungi Kami</a>
                </div>
            </li>
        </ul>
        <div class="nav-actions">
            <a href="${pagePrefix}login.html" class="btn btn-login">Login</a>
            <button class="mobile-menu-btn" id="mobile-menu-btn"><i class="ph ph-list"></i></button>
        </div>
    </div>
    <div class="mobile-menu" id="mobile-menu">
        <a href="${pathPrefix}index.html">Beranda</a>
        <a href="${pagePrefix}profilsekolah.html">Profil</a>
        <a href="${pagePrefix}berita.html">Berita</a>
        <a href="${pagePrefix}pengumuman.html">Pengumuman</a>
        <a href="${pagePrefix}agenda.html">Agenda</a>
        <a href="${pagePrefix}spmb.html">- SPMB Skanifo</a>
        <a href="https://spmb.jatengprov.go.id/" target="_blank">- SPMB JATENG</a>
        <a href="${pagePrefix}login.html" class="btn btn-login mobile-btn">Login</a>
    </div>
    `;

    const fallbackFooter = `
    <div class="container">
        <div class="footer-grid">
            <div class="footer-info">
                <a href="${pathPrefix}index.html" class="logo">
                    <img src="${pathPrefix}assets/img/logo/logo-sekolah/logo.webp" alt="Logo SMKN 4 Kendal" class="logo-img">
                    <div class="logo-brand">
                        <span class="logo-main">SMK Negeri 4 Kendal</span>
                        <span class="logo-tagline">Skanifo Unggul Berkarakter</span>
                    </div>
                </a>
                <p class="footer-desc">Memberikan pendidikan berkualitas untuk generasi penerus bangsa yang cerdas, berkarakter, dan berakhlak mulia di bidang teknologi dan maritim.</p>
                <div class="footer-social">
                    <a href="https://www.facebook.com/skanifoofficial" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook"><i class="ph ph-facebook-logo"></i></a>
                    <a href="https://twitter.com/smkn4_kendal" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Twitter (X)"><i class="ph ph-x-logo"></i></a>
                    <a href="https://www.tiktok.com/@smkn4kendal_official" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="TikTok"><i class="ph ph-tiktok-logo"></i></a>
                    <a href="https://www.instagram.com/skanifohits_" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>
                    <a href="https://www.youtube.com/@smkn4kendalofficial533/featured" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube"><i class="ph ph-youtube-logo"></i></a>
                </div>
            </div>
            <div class="footer-column footer-links">
                <h4>Tautan Cepat</h4>
                <ul>
                    <li><a href="${pathPrefix}index.html">Beranda</a></li>
                    <li><a href="${pagePrefix}profilsekolah.html">Profil Sekolah</a></li>
                    <li><a href="${pagePrefix}berita.html">Berita & Info</a></li>
                    <li><a href="${pagePrefix}pengumuman.html">Pengumuman</a></li>
                    <li><a href="${pagePrefix}galeri.html">Galeri Kegiatan</a></li>
                    <li><a href="${pagePrefix}kontak.html">Kontak Kami</a></li>
                </ul>
            </div>
            <div class="footer-column footer-links">
                <h4>Akademik</h4>
                <ul>
                    <li><a href="${pagePrefix}direktori.html">Data Guru & Staff</a></li>
                    <li><a href="${pagePrefix}agenda.html">Agenda Kegiatan</a></li>
                    <li><a href="${pagePrefix}visi-misi.html">Visi & Misi</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Kontak Kami</h4>
                <ul class="footer-contact-list">
                    <li class="footer-contact-item"><i class="ph ph-map-pin"></i> <span>Jalan Raya Soekarno-Hatta, Kecamatan Brangsong, Kabupaten Kendal, Jawa Tengah, 51371</span></li>
                    <li class="footer-contact-item"><i class="ph ph-phone"></i> <span>08112969000</span></li>
                    <li class="footer-contact-item"><i class="ph ph-envelope"></i> <span>smkn04kendal@gmail.com</span></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-copyright">&copy; 2026 SMK Negeri 4 Kendal.</div>
            <div class="footer-legal"><a href="#">Kebijakan Privasi</a> <a href="#">Syarat & Ketentuan</a> <a href="#">Peta Situs</a></div>
        </div>
    </div>
    `;

    // =========================
    // Component Loader Logic
    // =========================
    async function loadComponents() {
        const navEl = document.getElementById('navbar');
        const footerEl = document.getElementById('footer');
        const cacheBuster = '?v=' + Date.now();

        if (navEl) {
            const navLoaded = await loadComponent('navbar', pathPrefix + 'components/navbar.html' + cacheBuster);
            if (!navLoaded) navEl.innerHTML = fallbackNavbar;
            initNavbar();
        }

        if (footerEl) {
            const footerLoaded = await loadComponent('footer', pathPrefix + 'components/footer.html' + cacheBuster);
            if (!footerLoaded) footerEl.innerHTML = fallbackFooter;
        }

        updateNavLinks();
        initScrollEffects();
        initPPDBForm();
        initBukuTamuForm();
        initDynamicContent();
        initNewsContent();
        initAnimations();
        initHeroSlider();
    }

    async function loadComponent(id, path) {
        const el = document.getElementById(id);
        if (!el) return false;

        // Jika dibuka melalui protokol file:// (lokal), langsung gunakan fallback agar tidak memunculkan error CORS di konsol
        if (window.location.protocol === 'file:') {
            return false;
        }

        try {
            const response = await fetch(path);
            if (response.ok) {
                el.innerHTML = await response.text();
                return true;
            }
        } catch (e) {
            console.warn(`Fetch failed for ${path}: ${e.message}`);
        }
        return false;
    }

    function updateNavLinks() {
        // Fix all links in the document
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

            // Normalize index.html
            if (href === 'index.html') {
                link.setAttribute('href', pathPrefix + 'index.html');
            }
            // Fix relative pages
            else if (!href.includes('/') && href.endsWith('.html')) {
                link.setAttribute('href', pagePrefix + href);
            }
        });

        // Fix all images
        const allImgs = document.querySelectorAll('img');
        allImgs.forEach(img => {
            let src = img.getAttribute('src');
            if (!src || src.startsWith('http') || src.startsWith('data:')) return;

            // If it's a simple filename like 'logo.png', point to assets/img/
            if (!src.includes('/')) {
                img.setAttribute('src', pathPrefix + 'assets/img/' + src);
            } else if (isSubPage && src.startsWith('assets/img/')) {
                img.setAttribute('src', '../' + src);
            }
        });
    }

    // =========================
    // Feature Initializers
    // =========================

    function initNavbar() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = mobileMenu.classList.contains('open') ? 'ph ph-x' : 'ph ph-list';
            });
        }

        // Animasi perubahan warna latar belakang menjadi biru dan warna teks menjadi putih saat diklik
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                navLinks.forEach(l => l.classList.remove('clicked'));
                this.classList.add('clicked');
            });
        });
    }

    function initScrollEffects() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    }


    function initPPDBForm() {
        const form = document.getElementById('formPPDB');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();

                if (window.location.protocol === 'file:') {
                    alert('Peringatan Kompatibilitas:\n\nAnda membuka halaman ini secara langsung menggunakan protokol file:// (langsung mengklik berkas HTML).\n\nUntuk menggunakan fitur pendaftaran PPDB dan menyimpannya ke database, silakan jalankan server lokal (seperti XAMPP dengan Apache & MySQL menyala) dan akses halaman ini via:\nhttp://localhost/Web Sekolah/pages/ppdb.html\n\n(Catatan: Fitur database memerlukan server web lokal dan diblokir oleh browser di protokol file:// demi keamanan).');
                    return;
                }

                const nama = document.getElementById('nama').value;
                const asal_sekolah = document.getElementById('asal_sekolah').value;
                const jurusan = document.getElementById('jurusan').value;
                const hp = document.getElementById('hp').value;

                // Tampilkan loading status pada tombol kirim
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerText = 'Mengirim...';

                try {
                    const response = await fetch(pathPrefix + 'api/submit_ppdb.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nama, asal_sekolah, jurusan, hp })
                    });

                    const result = await response.json();

                    if (response.ok && result.status === 'success') {
                        alert(result.message || 'Pendaftaran Terkirim!');
                        form.reset();
                    } else {
                        alert('Gagal mengirim pendaftaran: ' + (result.message || 'Terjadi kesalahan server.'));
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('Terjadi kesalahan koneksi. Pastikan server Apache & MySQL XAMPP Anda sudah menyala.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            };
        }
    }

    function initBukuTamuForm() {
        const form = document.getElementById('formBukuTamu');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();

                if (window.location.protocol === 'file:') {
                    alert('Peringatan Kompatibilitas:\n\nAnda membuka halaman ini secara langsung menggunakan protokol file:// (langsung mengklik berkas HTML).\n\nUntuk menggunakan fitur kirim pesan buku tamu dan menyimpannya ke database, silakan jalankan server lokal (seperti XAMPP dengan Apache & MySQL menyala) dan akses halaman ini via:\nhttp://localhost/Web Sekolah/pages/buku-tamu.html\n\n(Catatan: Fitur database memerlukan server web lokal dan diblokir oleh browser di protokol file:// demi keamanan).');
                    return;
                }

                const nama = document.getElementById('nama').value;
                const instansi = document.getElementById('instansi').value;
                const email = document.getElementById('email').value;
                const tujuan = document.getElementById('tujuan').value;

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerText = 'Mengirim...';

                try {
                    const response = await fetch(pathPrefix + 'api/submit_buku_tamu.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nama, instansi, email, tujuan })
                    });

                    const result = await response.json();

                    if (response.ok && result.status === 'success') {
                        alert(result.message || 'Pesan buku tamu terkirim!');
                        form.reset();
                    } else {
                        alert('Gagal mengirim pesan: ' + (result.message || 'Terjadi kesalahan server.'));
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('Terjadi kesalahan koneksi. Pastikan server Apache & MySQL XAMPP Anda sudah menyala.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            };
        }
    }

    function initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.stat-card, .program-card, .news-card').forEach(el => observer.observe(el));
        initCounterAnimation();
    }

    function initCounterAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetEl = entry.target;
                    const target = +targetEl.getAttribute('data-target');
                    if (isNaN(target) || target === 0) return;

                    let count = 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    const updateCount = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);

                        const easeOut = progress * (2 - progress);
                        const currentVal = Math.floor(easeOut * target);

                        targetEl.innerText = currentVal.toLocaleString('id-ID');

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            targetEl.innerText = target.toLocaleString('id-ID');
                        }
                    };

                    requestAnimationFrame(updateCount);
                    obs.unobserve(targetEl);
                }
            });
        }, { threshold: 0.1 });

        statNumbers.forEach(num => observer.observe(num));
    }

    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-image-box img');
        const indicators = document.querySelectorAll('.hero-image-box .indicator');
        if (slides.length <= 1 || indicators.length === 0) return;

        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });

            currentSlide = index;
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function startSlideShow() {
            stopSlideShow();
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideShow() {
            if (slideInterval) clearInterval(slideInterval);
        }

        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                showSlide(i);
                startSlideShow();
            });
        });

        startSlideShow();
    }

    // =========================
    // Dynamic Content
    // =========================
    const fallbackPrograms = [
        { "id": "pplg", "title": "Rekayasa Perangkat Lunak", "image": "assets/img/rpl/JRPL.webp", "logo": "assets/img/logo/logo-jurusan/rpl.webp", "icon": "ph-code", "short_desc": "Mempelajari Pengembangan Perangkat Lunak, Aplikasi dan Web.", "url": "pplg.html" },
        { "id": "tkj", "title": "Teknik Komputer dan Jaringan", "image": "assets/img/tkj/JTKJ.webp", "logo": "assets/img/logo/logo-jurusan/tkj.webp", "icon": "ph-desktop", "short_desc": "Mempelajari infrastruktur jaringan komputer.", "url": "tkj.html" },
        { "id": "kuliner", "title": "Kuliner", "image": "assets/img/kuliner/JKULINER.webp", "logo": "assets/img/logo/logo-jurusan/kuliner.webp", "icon": "ph-cooking-pot", "short_desc": "Seni memasak dan manajemen restoran.", "url": "kuliner.html" },
        { "id": "tkro", "title": "Teknik Kendaraan Ringan Otomotif", "image": "assets/img/tkro/JTKRO.webp", "logo": "assets/img/logo/logo-jurusan/tkro.webp", "icon": "ph-wrench", "short_desc": "Fokus pada perawatan mesin otomotif.", "url": "tkro.html" },
        { "id": "ap", "title": "Agribisnis Perikanan", "image": "assets/img/ap/JAP.webp", "logo": "assets/img/logo/logo-jurusan/apat.webp", "icon": "ph-fish", "short_desc": "Manajemen budidaya perikanan modern.", "url": "ap.html" },
        { "id": "nkpi", "title": "NKPI", "image": "assets/img/nkpi/JNKPI.webp", "logo": "assets/img/logo/logo-jurusan/nkpi.webp", "icon": "ph-anchor", "short_desc": "Nautika kapal penangkap ikan.", "url": "nkpi.html" }
    ];

    async function initDynamicContent() {
        const programsGrid = document.getElementById('dynamic-programs-grid');
        if (!programsGrid) return;

        let programs = fallbackPrograms;
        if (window.location.protocol !== 'file:') {
            try {
                const res = await fetch(pathPrefix + 'data/programs.json');
                if (res.ok) programs = await res.json();
            } catch (e) { }
        }

        programsGrid.innerHTML = '';
        programs.forEach(item => {
            const card = document.createElement('div');
            card.className = 'program-card';
            const iconClass = item.icon.includes('ph-') ? 'ph ' + item.icon : item.icon;

            let imgSrc = item.image;
            if (!imgSrc.startsWith('http')) {
                imgSrc = pathPrefix + imgSrc;
            }

            let logoSrc = item.logo;
            if (logoSrc && !logoSrc.startsWith('http')) {
                logoSrc = pathPrefix + logoSrc;
            }

            const logoHtml = logoSrc
                ? `<img src="${logoSrc}" alt="Logo ${item.title}" class="program-logo">`
                : `<i class="${iconClass}"></i>`;

            card.innerHTML = `
                <div class="program-image-box"><img src="${imgSrc}" alt="${item.title}"></div>
                <div class="program-content">
                    <div class="program-icon-wrapper">${logoHtml}</div>
                    <h3>${item.title}</h3>
                    <p>${item.short_desc}</p>
                    <a href="${pagePrefix + item.url}" class="liat-detail">Lihat Detail <i class="ph ph-arrow-right"></i></a>
                </div>
            `;
            programsGrid.appendChild(card);
        });
    }

    const fallbackBerita = [
        {
            "id": 4,
            "title": "Permudah Akses Informasi, SMKN 4 Kendal Luncurkan Saluran Digital Resmi SPMB SKANIFO",
            "date": "17 Mei 2026",
            "category": "SPMB",
            "image": "assets/img/berita/Berita SMPB Skanifo.webp",
            "summary": "Untuk memastikan seluruh informasi mengenai Seleksi Penerimaan Murid Baru (SPMB) tersampaikan dengan cepat, akurat, dan transparan, pihak sekolah resmi meluncurkan saluran informasi digital melalui platform WhatsApp dan Telegram.",
            "url": "berita.html?id=4",
            "content": "<p><strong>KENDAL</strong> – Memasuki tahun ajaran baru, SMK Negeri 4 Kendal (SKANIFO) terus berinovasi dalam memberikan layanan terbaik bagi calon peserta didik baru. Untuk memastikan seluruh informasi mengenai Seleksi Penerimaan Murid Baru (SPMB) tersampaikan dengan cepat, akurat, dan transparan, pihak sekolah resmi meluncurkan saluran informasi digital melalui platform WhatsApp dan Telegram.</p><p>Langkah ini diambil untuk memudahkan para orang tahu dan calon siswa dalam mendapatkan update terkini mengenai persyaratan, jadwal pendaftaran, hingga hasil seleksi tanpa harus tertinggal informasi krusial.</p><h3 class='mt-4 mb-2'>Satu Pintu Informasi, Lebih Cepat dan Akurat</h3><p>Melalui poster resmi yang dirilis oleh tim media SKANIFO, terdapat dua kanal utama yang bisa diakses oleh publik:</p><ul class='mb-3'><li><strong>Saluran Telegram</strong>: Memberikan kemudahan akses arsip dokumen dan pengumuman dalam skala besar.</li><li><strong>Saluran WhatsApp</strong>: Memudahkan komunikasi yang lebih personal dan notifikasi langsung ke ponsel setiap pengguna.</li></ul><p>Kedua saluran ini dirancang sebagai pusat informasi utama (One-Stop Information) sehingga calon siswa tidak perlu merasa bingung mencari detail pendaftaran di berbagai sumber yang belum tentu valid.</p><h3 class='mt-4 mb-2'>Cara Bergabung yang Sangat Mudah</h3><p>Bagi para calon siswa dan orang tua yang ingin mendapatkan informasi real-time, Anda hanya perlu melakukan langkah mudah berikut:</p><ol><li><strong>Scan QR Code</strong>: Gunakan kamera ponsel atau fitur pemindai QR di aplikasi WhatsApp/Telegram Anda pada poster di atas.</li><li><strong>Klik Gabung/Join</strong>: Setelah terpindah ke aplikasi tujuan, tekan tombol bergabung untuk masuk ke dalam saluran resmi SPMB SMKN 4 Kendal.</li><li><strong>Pantau Update-nya</strong>: Pastikan notifikasi Anda menyala agar tidak ketinggalan berita penting seputar pendaftaran.</li></ol>"
        },
        {
            "id": 5,
            "title": "Skanifo Bangga! Dicky Saifurokhim Raih Juara 3 Pencak Silat di Ajang O2SN Tingkat Kabupaten Kendal 2026",
            "date": "14 Mei 2026",
            "category": "Prestasi",
            "image": "assets/img/berita/Juara3.webp",
            "summary": "Dicky Saifurokhim, taruna kelas XI TKJ 2 SMK Negeri 4 Kendal, sukses menorehkan prestasi gemilang dengan meraih Juara 3 dalam ajang O2SN Cabang Olahraga Pencak Silat Putra Tingkat Kabupaten Kendal Tahun 2026.",
            "url": "berita.html?id=5",
            "content": "<p><strong>KENDAL</strong> – Aura kebahagiaan dan rasa bangga kembali menyelimuti keluarga besar SMK Negeri 4 Kendal (SKANIFO). Salah satu talenta muda terbaiknya, Dicky Saifurokhim, siswa yang saat ini duduk di kelas XI TKJ 2, sukses menorehkan prestasi gemilang di bidang non-akademik. Dicky berhasil membawa pulang trofi Juara 3 dalam ajang bergengsi Olimpiade Olahraga Siswa Nasional (O2SN) Cabang Olahraga Pencak Silat Putra Tingkat Kabupaten Kendal Tahun 2026.</p><p>Keberhasilan ini menjadi bukti nyata bahwa taruna-taruni SKANIFO tidak hanya tangguh di depan komputer dan laboratorium kejuruan, melainkan juga memiliki fisik yang kuat, disiplin tinggi, serta bermental juara di gelanggang olahraga tradisional asli Indonesia.</p><h3 class='mt-4 mb-2'>Persaingan Sengit di Gelanggang Kabupaten</h3><p>Kompetisi O2SN Tingkat Kabupaten Kendal tahun ini berlangsung cukup ketat. Diikuti oleh puluhan pesilat tangguh dari berbagai SMA/SMK se-Kabupaten Kendal, setiap peserta dituntut menampilkan teknik, kecepatan, dan ketahanan fisik yang prima.</p><p>Namun, berkat konsistensi latihan yang keras, bimbingan berkala dari pelatih, serta mental pantang menyerah, Dicky berhasil melewati babak-babak sengit. Pada babak final perebutan juara, ia sukses mengamankan posisi ketiga dan naik ke podium kehormatan.</p><p>Melalui dokumentasi resmi yang dirilis oleh tim @broadcasting.skanifo, terlihat momen penuh haru sekaligus bangga saat Dicky menerima trofi penghargaan. Mengenakan pakaian tanding pencak silat hitam lengkap dengan kain batik tradisional dan ikat kepala khas, Dicky memancarkan aura pendekar muda yang siap terus mengharumkan nama sekolah.</p><h3 class='mt-4 mb-2'>Apresiasi Tinggi dari Civitas Akademika</h3><p>Pencapaian luar biasa ini langsung disambut dengan penuh rasa syukur oleh seluruh warga sekolah. Pihak manajemen SMKN 4 Kendal, guru, dan rekan-rekan sesama siswa memberikan ucapan selamat yang mengalir deras sejak poster kemenangan dirilis.</p><p>\"Selamat dan sukses untuk Dicky Saifurokhim! Raihan Juara 3 di tingkat kabupaten ini adalah buah manis dari tetesan keringat, kedisiplinan, dan doa yang tidak pernah putus. Kami berharap pencapaian Dicky menjadi pemantik semangat (booster) bagi taruna-taruni SKANIFO lainnya untuk berani unjuk gigi, menggali potensi diri, dan tidak ragu bersaing di level yang lebih tinggi,\" ungkap perwakilan pihak kesiswaan SMKN 4 Kendal.</p>"
        },
        {
            "id": 6,
            "title": "Sajian Berkelas Juara! Tim Culinary SMKN 4 Kendal Raih Juara 1 Lomba Cooking di LKS SMK Tingkat Kabupaten Kendal 2026",
            "date": "14 Februari 2026",
            "category": "Prestasi",
            "image": "assets/img/berita/Juara-1-cooking.webp",
            "summary": "Para Siswi dan Tim Kompetensi Keahlian Culinary SMKN 4 Kendal sukses menyabet gelar Juara 1 Lomba Cooking Tingkat Kabupaten Kendal Tahun 2026 pada ajang bergengsi LKS SMK.",
            "url": "berita.html?id=6",
            "content": "<p><strong>KENDAL</strong> – Kompetensi keahlian Kuliner (Culinary) SMK Negeri 4 Kendal (SKANIFO) kembali membuktikan kualitasnya sebagai salah satu yang terbaik di wilayah Kendal. Melalui kreativitas rasa, teknik memasak yang presisi, dan kerja sama tim yang solid, Para Siswi dan Tim Kompetensi Keahlian Culinary SMKN 4 Kendal sukses menyabet gelar Juara 1 Lomba Cooking Tingkat Kabupaten Kendal Tahun 2026.</p><p>Prestasi gemilang ini diraih dalam rangkaian ajang bergengsi Lomba Kompetensi Siswa (LKS) SMK Tingkat Kabupaten Kendal yang berlangsung pada 9–14 Februari 2026.</p><h3 class='mt-4 mb-2'>Kombinasi Skill Rasa dan Presentasi Kelas Dunia</h3><p>Ajang LKS SMK bidang Cooking merupakan salah satu kompetisi dengan tekanan tinggi. Para peserta dituntut tidak hanya mampu menciptakan hidangan yang lezat dari segi rasa, tetapi juga wajib memperhatikan aspek higienis (sanitation), teknik memotong, manajemen waktu, hingga keindahan presentasi piring (plating).</p><p>Di bawah pengawasan ketat para juri profesional, tim Culinary SKANIFO yang tampil percaya diri mengenakan seragam chef lengkap (baju chef putih dengan kombinasi merah-hitam serta topi) berhasil mengolah bahan makanan menjadi hidangan penentu kemenangan.</p><p>Dalam dokumentasi resmi yang dirilis, tampak senyum bangga kedua siswi perwakilan juru masak muda SKANIFO saat menunjukkan trofi Juara 1 dan sertifikat penghargaan resmi dari Musyawarah Kerja Kepala Sekolah (MKKS) SMK Kabupaten Kendal. Di latar belakang, terlihat sekilas hidangan cantik hasil kreasi mereka yang memikat hati para dewan juri.</p><h3 class='mt-4 mb-2'>Apresiasi Atas Kerja Keras dan Dedikasi</h3><p>Pihak manajemen sekolah dan seluruh civitas akademika memberikan apresiasi setinggi-tingginya kepada tim Culinary dan para guru pembimbing yang telah mencurahkan waktu serta energinya untuk latihan intensif menjelang lomba.</p><p>\"Selamat untuk tim Culinary SKANIFO! Raihan Juara 1 di tingkat kabupaten pada ajang LKS ini adalah pengakuan nyata atas keterampilan, kedisiplinan, dan mental juara anak-anak kita. Ini membuktikan bahwa kurikulum dan praktik kerja di jurusan Kuliner SMKN 4 Kendal benar-benar selaras dengan standar kompetensi yang tinggi,\" ujar perwakilan pihak sekolah dengan penuh rasa bangga.</p><p>Dengan kemenangan ini, tim Kuliner SMKN 4 Kendal tidak hanya membawa pulang trofi juara, tetapi juga memperpanjang daftar tradisi prestasi sekolah di bidang kejuruan. Selamat untuk para juara, tetaplah berinovasi dan terus asah bakat emas kalian di dunia kuliner! SKANIFO BISA, SKANIFO HEBAT!</p>"
        },
        {
            "id": 7,
            "title": "Goresan Pena Emas: Novia Budi Alfrida Sabet Juara 2 Cipta Cerpen FLS3N Kabupaten Kendal 2026",
            "date": "28 April 2026",
            "category": "Prestasi",
            "image": "assets/img/berita/Juara-2-cipta-cerpen.webp",
            "summary": "Novia Budi Alfrida dari kelas XI TKJ 2 sukses meraih Juara 2 dalam Lomba Menulis Cerita (Cipta Cerpen) FLS3N Tingkat Kabupaten Kendal Tahun 2026.",
            "url": "berita.html?id=7",
            "content": "<p><strong>KENDAL</strong> – SMK Negeri 4 Kendal (SKANIFO) kembali membuktikan taringnya di bidang literasi. Siswi cerdas berbakat, Novia Budi Alfrida dari kelas XI TKJ 2 (Teknik Komputer dan Jaringan), sukses menorehkan prestasi gemilang dengan meraih Juara 2 dalam Lomba Menulis Cerita (Cipta Cerpen) pada ajang FLS3N Tingkat Kabupaten Kendal Tahun 2026.</p><p>Kompetisi literasi bergengsi ini dilaksanakan serentak pada 28 April 2026, menguji kemampuan para peserta dalam merangkai kata, membangun plot, serta menuangkan ide kreatif ke dalam sebuah karya sastra cerpen yang bermakna mendalam.</p><h3 class='mt-4 mb-2'>Anak Teknik yang Jago Merangkai Kata</h3><p>Seringkali anak jurusan Teknik Komputer dan Jaringan (TKJ) diidentikkan hanya berkutat dengan kabel jaringan, server, dan baris kode. Namun, Novia berhasil mematahkan stereotip tersebut. Lewat imajinasi dan ketajaman bahasanya, ia mampu meramu sebuah cerita pendek yang memikat hati para dewan juri FLS3N.</p><p>Pada poster kemenangan yang dirilis oleh tim media sekolah, Novia tampil bersahaja mengenakan pakaian kebaya bermotif anggun dengan jilbab merah muda, mengembang senyum manis sembari memeluk trofi penghargaan bernomor peserta 31. Prestasi ini membawa angin segar bagi dunia literasi sekolah.</p><h3 class='mt-4 mb-2'>Menumbuhkan Budaya Literasi di Sekolah</h3><p>Keberhasilan Novia diharapkan dapat menjadi pemantik bagi taruna-taruni SKANIFO lainnya untuk tidak takut mengekspresikan diri melalui tulisan. Pihak sekolah berkomitmen akan terus mendukung iklim literasi agar lahir penulis-penulis muda berbakat dari lingkungan vokasi.</p><p>Selamat atas pencapaian luar biasa ini, Novia Budi Alfrida! Teruslah menggoreskan karya-karya hebat melalui penamu!</p>"
        },
        {
            "id": 8,
            "title": "Harmoni Tradisi dan Modernitas, Rayhan dan Ulia Raih Juara 2 Tari Kreasi FLS3N Kabupaten Kendal 2026",
            "date": "28 April 2026",
            "category": "Prestasi",
            "image": "assets/img/berita/Juara-2-tari-kreasi.webp",
            "summary": "Duet penari berbakat Rayhan Fawwaz Athallah dan Ulia Sukma Kardiana sukses meraih Juara 2 dalam Lomba Tari Kreasi Baru FLS3N Tingkat Kabupaten Kendal Tahun 2026.",
            "url": "berita.html?id=8",
            "content": "<p><strong>KENDAL</strong> – Kreativitas tanpa batas kembali ditunjukkan oleh talenta seni SMK Negeri 4 Kendal (SKANIFO) di panggung Festival dan Lomba Seni Siswa Nasional (FLS3N) Tingkat Kabupaten Kendal Tahun 2026. Duet penari berbakat, Rayhan Fawwaz Athallah (X Kuliner 1) dan Ulia Sukma Kardiana (XI APAT 2), sukses meraih Juara 2 dalam Lomba Tari Kreasi Baru.</p><p>Ajang FLS3N yang digelar pada 28 April 2026 ini menjadi wadah unjuk gigi bagi para seniman muda berbakat dari berbagai sekolah di Kendal, di mana aspek penilaian meliputi koreografi, keselarasan musik, ekspresi, hingga pesan filosofis tarian.</p><h3 class='mt-4 mb-2'>Kolaborasi Lintas Jurusan yang Memukau</h3><p>Meskipun berasal dari latar belakang kejuruan yang berbeda—Rayhan dari program keahlian Kuliner dan Ulia dari Agribisnis Perikanan Air Tawar (APAT)—keduanya berhasil membangun chemistry yang luar biasa di atas panggung.</p><p>Dalam foto publikasi resmi, terlihat Rayhan dan Ulia tampil anggun sekaligus gagah mengenakan pakaian adat bercorak batik emas dengan riasan wajah dan sanggul tradisional yang menawan. Sambil memegang trofi Juara 2, ekspresi penuh senyum mereka memancarkan rasa bangga setelah berhasil menyuguhkan penampilan tari kreasi baru yang memukau para dewan juri.</p><h3 class='mt-4 mb-2'>Bukti Vokasi Kaya Kreativitas</h3><p>Pencapaian ini menjadi bukti konkret bahwa SMKN 4 Kendal tidak hanya mencetak lulusan yang siap kerja di industri teknis, tetapi juga mewadahi pembentukan karakter yang berbudaya, kreatif, dan menghargai kelestarian seni tradisional Indonesia.</p><p>Selamat atas prestasi gemilang Rayhan dan Ulia! Teruslah menari dan menginspirasi lewat keindahan gerak tradisi.</p>"
        },
        {
            "id": 9,
            "title": "Tampil Tangguh, Tim Bola Tangan Putri SKANIFO Raih Juara 3 Kejurkab Junior Kendal 2026",
            "date": "3 Mei 2026",
            "category": "Prestasi",
            "image": "assets/img/berita/Juara-3-bola-tangan.webp",
            "summary": "Tim Bola Tangan Putri SKANIFO sukses menyabet gelar Juara 3 dalam ajang Kejuaraan Kabupaten (Kejurkab) Junior Cabang Olahraga Bola Tangan Tahun 2026.",
            "url": "berita.html?id=9",
            "content": "<p><strong>KENDAL</strong> – Prestasi membanggakan kembali diukir oleh srikandi-srikandi olahraga SMK Negeri 4 Kendal (SKANIFO). Melalui perjuangan sengit dan kerja sama tim yang solid, Tim Bola Tangan (Handball) Putri SKANIFO sukses menyabet gelar Juara 3 (3rd Place) dalam ajang Kejuaraan Kabupaten (Kejurkab) Junior Cabang Olahraga Bola Tangan Tahun 2026.</p><p>Kompetisi yang berlangsung pada tanggal 2–3 Mei 2026 di GOR Bahurekso, Kendal ini diikuti oleh berbagai tim tangguh antar-pelajar tingkat SMA/SMK/MA sederajat se-Kabupaten Kendal.</p><h3 class='mt-4 mb-2'>Kerja Keras di Atas Lapangan GOR Bahurekso</h3><p>Sejak babak penyisihan, tim putri SKANIFO yang mengenakan jersey kebanggaan berwarna hijau kombinasi hitam bermotif khas ini tampil menekan dengan strategi pertahanan dan penyerangan yang rapi. Di bawah arahan pelatih, mereka berhasil menembus barisan pertahanan lawan hingga mengamankan posisi podium ketiga.</p><p>Momen kemenangan ini diabadikan dalam poster resmi rilisan @broadcasting.skanifo, memperlihatkan senyum bahagia seluruh anggota tim putri bersama piala penghargaan dan papan peringkat \"Women's 3rd Place\". Keberhasilan ini membuktikan bahwa cabang olahraga bola tangan di SKANIFO terus berkembang pesat dan siap menjadi kekuatan baru di Kabupaten Kendal.</p><h3 class='mt-4 mb-2'>Apresiasi dari Sekolah</h3><p>Pihak sekolah mengapresiasi tinggi atas dedikasi dan latihan disiplin yang telah menjalani tim bola tangan putri. Jargon turnamen \"Handball Kendal Beribadat, Kendal For The Win!\" benar-benar dibuktikan dengan sportivitas dan semangat pantang menyerah oleh para siswi di lapangan.</p><p>Selamat untuk Tim Handball Putri SKANIFO! Pertahankan semangat juang ini untuk kompetisi-kompetisi berikutnya.</p>"
        }
    ];

    async function initNewsContent() {
        const homeNewsGrid = document.getElementById('dynamic-news-grid');
        const beritaPageGrid = document.getElementById('berita-page-grid');
        const pengumumanPageGrid = document.getElementById('pengumuman-page-grid');
        const agendaPageGrid = document.getElementById('agenda-page-grid');
        const spmbPageGrid = document.getElementById('spmb-page-grid');
        const prestasiPageGrid = document.getElementById('prestasi-page-grid');
        const kemitraanPageGrid = document.getElementById('kemitraan-page-grid');

        if (!homeNewsGrid && !beritaPageGrid && !pengumumanPageGrid && !agendaPageGrid && !spmbPageGrid && !prestasiPageGrid && !kemitraanPageGrid) return;

        let beritaList = fallbackBerita;
        if (window.location.protocol !== 'file:') {
            try {
                const res = await fetch(pathPrefix + 'data/berita.json');
                if (res.ok) beritaList = await res.json();
            } catch (e) { }
        }

        // Urutkan berita berdasarkan tanggal terbaru - terlama
        const monthMap = {
            'januari': 0, 'februari': 1, 'maret': 2, 'april': 3, 'mei': 4, 'juni': 5,
            'juli': 6, 'agustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'desember': 11,
            'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'jun': 5, 'jul': 6, 'agu': 7, 'sep': 8, 'okt': 9, 'nov': 10, 'des': 11
        };

        const parseIndonesianDate = (dateStr) => {
            if (!dateStr) return new Date(0);
            const parts = dateStr.toLowerCase().trim().split(/\s+/);
            if (parts.length >= 3) {
                const day = parseInt(parts[0], 10);
                const monthName = parts[1];
                const year = parseInt(parts[2], 10);
                const month = monthMap[monthName] !== undefined ? monthMap[monthName] : 0;
                return new Date(year, month, day);
            }
            const d = new Date(dateStr);
            return isNaN(d.getTime()) ? new Date(0) : d;
        };

        beritaList.sort((a, b) => parseIndonesianDate(b.date) - parseIndonesianDate(a.date));

        if (beritaPageGrid && window.location.search.includes('id=')) {
            const urlParams = new URLSearchParams(window.location.search);
            const newsId = parseInt(urlParams.get('id'));
            const newsItem = beritaList.find(item => item.id === newsId);

            if (newsItem) {
                let imgSrc = newsItem.image;
                if (!imgSrc.startsWith('http')) {
                    imgSrc = pathPrefix + imgSrc;
                }

                beritaPageGrid.style.display = 'block';
                beritaPageGrid.innerHTML = `
                    <div class="news-detail-container" style="max-width: 850px; margin: 0 auto; background: var(--bg-white); border-radius: 24px; box-shadow: var(--shadow-lg); overflow: hidden;">
                        <div class="news-detail-header" style="position: relative; width: 100%; max-height: 500px; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center;">
                            <img src="${imgSrc}" alt="${newsItem.title}" style="width: 100%; height: auto; max-height: 500px; object-fit: contain;">
                            <span class="news-category" style="position: absolute; top: 1.5rem; left: 1.5rem; background: var(--primary); color: white; padding: 0.5rem 1.5rem; border-radius: 50px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">${newsItem.category}</span>
                        </div>
                        <div class="news-detail-body" style="padding: 3rem 4rem;">
                            <div class="news-meta" style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="ph ph-calendar"></i> ${newsItem.date}
                            </div>
                            <h1 style="font-size: 2.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 2rem; line-height: 1.3;">${newsItem.title}</h1>
                            <div class="news-content-html" style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
                                ${newsItem.content || newsItem.summary}
                            </div>
                            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
                                <a href="berita.html" class="btn btn-outline" style="color: var(--primary); border-color: var(--primary); padding: 0.8rem 2rem; font-weight: 600;"><i class="ph ph-arrow-left"></i> Kembali ke Daftar Berita</a>
                            </div>
                        </div>
                    </div>
                `;
                return;
            }
        }

        const renderCards = (container, list, isHome) => {
            container.innerHTML = '';
            const itemsToRender = isHome ? list.slice(0, 3) : list;
            itemsToRender.forEach(item => {
                const card = document.createElement('div');
                card.className = 'news-card animate-fade-in';

                let imgSrc = item.image;
                if (!imgSrc.startsWith('http')) {
                    imgSrc = pathPrefix + imgSrc;
                }

                card.innerHTML = `
                    <div class="news-image-box">
                        <img src="${imgSrc}" alt="${item.title}">
                        <div class="news-date-badge">
                            <i class="ph ph-calendar"></i> ${item.date}
                        </div>
                    </div>
                    <div class="news-content">
                        <h3>${item.title}</h3>
                        <p>${item.summary}</p>
                        <a href="${pagePrefix + item.url}" class="news-link">Baca Selengkapnya <i class="ph ph-arrow-right"></i></a>
                    </div>
                `;
                container.appendChild(card);
            });
        };

        if (homeNewsGrid) renderCards(homeNewsGrid, beritaList, true);
        if (beritaPageGrid) renderCards(beritaPageGrid, beritaList, false);
        if (pengumumanPageGrid) renderCards(pengumumanPageGrid, beritaList.filter(b => b.category === 'Pengumuman'), false);
        if (agendaPageGrid) renderCards(agendaPageGrid, beritaList.filter(b => b.category === 'Agenda'), false);
        if (spmbPageGrid) renderCards(spmbPageGrid, beritaList.filter(b => b.category === 'SPMB'), false);
        if (prestasiPageGrid) renderCards(prestasiPageGrid, beritaList.filter(b => b.category === 'Prestasi'), false);
        if (kemitraanPageGrid) renderCards(kemitraanPageGrid, beritaList.filter(b => b.category === 'Kemitraan'), false);
    }

    loadComponents();
});
