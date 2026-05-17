import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState(''); // Untuk menampilkan pesan error
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Menghubungkan ke Backend (sesuaikan port jika bukan 5000)
      await axios.post('http://localhost:5001/users', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword
      });
      // Jika berhasil, arahkan ke halaman Login
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // Menampilkan pesan error dari backend (contoh: "Email sudah terdaftar")
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="register-container">
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

      {/* Menampilkan Pesan Error jika ada */}
      {msg && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{msg}</p>}

      <form className="register-form" onSubmit={handleRegister}>
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input 
            type="text" 
            placeholder="Username" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <span className="input-icon">✉</span>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <span className="input-icon">🔑</span>
          <input 
            type="password" 
            placeholder="Password (Min. 6 Karakter)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <span className="eye-icon">👁</span>
        </div>

        <div className="input-group">
          <span className="input-icon">🔑</span>
          <input 
            type="password" 
            placeholder="Konfirmasi Password" 
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            required 
          />
          <span className="eye-icon">👁</span>
        </div>

        {/* Tombol diperbaiki teksnya menjadi "Daftar" agar tidak bingung */}
        <button type="submit" className="btn-register-submit">Daftar</button>
        
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