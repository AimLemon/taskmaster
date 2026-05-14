import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
      });

      // Menyimpan token ke localStorage agar 'Hai, Adyansyah!' muncul di Dashboard
      localStorage.setItem('accessToken', response.data.accessToken);

      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <nav className="top-nav">
        <button className="btn-back" onClick={() => navigate('/')}>
          ❮ Kembali
        </button>
      </nav>

      <div className="login-card">
        <div className="login-brand">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="#1e3a8a" strokeWidth="2">
              <path d="M12 7v5l3 3" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <h1>Selamat Datang</h1>
          <p>Masuk untuk mengatur tugasmu</p>
        </div>

        {msg && <div className="alert-error">{msg}</div>}

        <form onSubmit={handleLogin} className="form-auth">
          <div className="field-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="field-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary">Login</button>

          <div className="divider">atau</div>

          <button type="button" className="btn-google">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="G" />
            Lanjut dengan Google
          </button>
        </form>

        <p className="footer-text">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;