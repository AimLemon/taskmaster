import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Icon Jam/Tugas sesuai desain */}
      <div className="landing-icon">🕒</div>
      
      <h1 className="landing-title">Task Remainder</h1>
      
      <p className="landing-description">
        Kelola tugas, rencana, atur prioritas, dan jangan biarkan deadline menghambat prestasi dan tujuanmu. Sederhana, cepat dan terorganisir.
      </p>
      
      <div className="landing-divider"></div>

      <div className="button-group">
        <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Masuk ke Akun
        </Link>
        
        <button className="btn btn-google">
          <span>G</span> Lanjut dengan Google
        </button>
        
        <Link to="/register" className="btn btn-register">Daftar Sekarang</Link>
      </div>

      <p className="footer-text">UNTUK ORANG-ORANG PRODUKTIF</p>
    </div>
  );
};

export default LandingPage;