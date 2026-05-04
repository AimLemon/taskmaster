import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      {/* Tombol kembali */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <span>❮</span> Kembali
      </button>

      <div className="register-header">
        <div className="register-icon">
          <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v5l3 3" />
            <circle cx="12" cy="12" r="9" />
            <path d="M16 21H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
          </svg>
        </div>
        <h1 className="register-title">Daftar Akun</h1>
        <p className="register-subtitle">Mulai atur tugas - tugasmu</p>
      </div>

      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input type="text" placeholder="Username" required />
        </div>

        <div className="input-group">
          <span className="input-icon">✉</span>
          <input type="email" placeholder="Email" required />
        </div>

        <div className="input-group">
          <span className="input-icon">🔑</span>
          <input type="password" placeholder="Password (Min. 6 Karakter)" required />
          <span className="eye-icon">👁</span>
        </div>

        <div className="input-group">
          <span className="input-icon">🔑</span>
          <input type="password" placeholder="Konfirmasi Password" required />
          <span className="eye-icon">👁</span>
        </div>

        {/* Tombol submit utama sesuai teks di gambar desain */}
        <button type="submit" className="btn-register-submit">Login</button>
        
        <button type="button" className="btn-google-register">
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" width="20" />
          Lanjut dengan Google
        </button>
      </form>

      <p className="login-prompt">
        Sudah punya akun? <Link to="/login" className="login-link">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;