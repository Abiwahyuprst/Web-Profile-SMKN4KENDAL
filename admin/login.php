<?php
session_start();

// Jika admin sudah login, langsung alihkan ke dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: index.php');
    exit();
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (empty($username) || empty($password)) {
        $error = 'Username dan Password wajib diisi.';
    } else {
        // Hubungkan ke file koneksi database
        require_once '../api/koneksi.php';

        // Cari admin di database
        $sql = "SELECT * FROM tb_admin WHERE username = ? LIMIT 1";
        $stmt = $conn->prepare($sql);
        
        if ($stmt) {
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 1) {
                $user = $result->fetch_assoc();
                
                $login_success = false;

                // 1. Cek dengan password_verify
                if (password_verify($password, $user['password'])) {
                    $login_success = true;
                }
                // 2. Fallback: Cek plain-text jika hash belum bermigrasi (misal di-import manual secara polos)
                else if ($user['password'] === $password) {
                    $login_success = true;
                    
                    // Lakukan migrasi: Hash password dan perbarui di database demi keamanan
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $update_sql = "UPDATE tb_admin SET password = ? WHERE id = ?";
                    $update_stmt = $conn->prepare($update_sql);
                    if ($update_stmt) {
                        $update_stmt->bind_param("si", $hashed_password, $user['id']);
                        $update_stmt->execute();
                        $update_stmt->close();
                    }
                }

                if ($login_success) {
                    // Set Session data
                    $_SESSION['admin_logged_in'] = true;
                    $_SESSION['admin_id'] = $user['id'];
                    $_SESSION['admin_user'] = $user['username'];
                    $_SESSION['admin_name'] = $user['nama_lengkap'];

                    header('Location: index.php');
                    exit();
                } else {
                    $error = 'Password yang Anda masukkan salah.';
                }
            } else {
                $error = 'Username tidak terdaftar.';
            }
            $stmt->close();
        } else {
            $error = 'Terjadi kesalahan sistem: Gagal mempersiapkan query.';
        }
        $conn->close();
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Administrator | SMK Negeri 4 Kendal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="style_admin.css">
</head>
<body class="login-body">

    <div class="login-card">
        <img src="../assets/img/logo/logo-sekolah/logo.webp" alt="Logo SMKN 4 Kendal" class="login-logo">
        <h2>Admin Portal</h2>
        <p>SMK Negeri 4 Kendal</p>

        <?php if (!empty($error)): ?>
            <div class="alert-error">
                <i class="ph ph-warning-circle" style="font-size: 1.2rem;"></i>
                <span><?php echo htmlspecialchars($error); ?></span>
            </div>
        <?php endif; ?>

        <form action="" method="POST" class="login-form">
            <div class="form-group">
                <label for="username">Username</label>
                <div class="input-icon-wrapper">
                    <i class="ph ph-user"></i>
                    <input type="text" id="username" name="username" placeholder="Masukkan username admin" required autocomplete="off">
                </div>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <div class="input-icon-wrapper">
                    <i class="ph ph-lock"></i>
                    <input type="password" id="password" name="password" placeholder="Masukkan password Anda" required>
                </div>
            </div>

            <button type="submit" class="btn-login">Login Masuk</button>
        </form>
    </div>

</body>
</html>
