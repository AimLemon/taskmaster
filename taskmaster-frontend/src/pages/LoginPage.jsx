import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      {/* Tombol kembali ke Landing Page */}
      <button className="back-button" onClick={() => navigate('/')}>
        <span>❮</span> Kembali
      </button>

      <div className="login-header">
        {/* Ikon Jam Buku sesuai desain Figma */}
        <div className="login-icon">
          <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v5l3 3" />
            <circle cx="12" cy="12" r="9" />
            <path d="M16 21H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
          </svg>
        </div>
        <h1 className="login-title">Selamat Datang</h1>
        <p className="login-subtitle">Masuk untuk mengatur tugasmu</p>
      </div>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <span className="input-icon">✉</span>
          <input type="email" placeholder="Email" required />
        </div>

        <div className="input-group">
          <span className="input-icon">🔑</span>
          <input type="password" placeholder="Password" required />
          <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#9ca3af' }}>👁</span>
        </div>

        <button type="submit" className="btn-login">Login</button>
        
        <button type="button" className="btn-google-login">
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" width="20" />
          Lanjut dengan Google
        </button>
      </form>

      <p className="signup-prompt">
        Belum punya akun? <Link to="/register" className="signup-link">Daftar</Link>
      </p>
    </div>
  );
};

export default LoginPage;