import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="menu-button" aria-label="button" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'rotate-45' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'hidden' : ''}`}></div>
        <div className={`bar ${menuOpen ? '-rotate-45' : ''}`}></div>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#" onClick={() => handleNavigation('/')}>Főoldal</a>
        <a href="/merch" onClick={() => handleNavigation('/merch')}>Merch</a>
        <a href="/tour" onClick={() => handleNavigation('/tour')}>Tour</a>
        <a href="/videos" onClick={() => handleNavigation('/videos')}>Videos</a>
        <a href="#contact">Rólunk</a>
        <a href="/login" onClick={() => handleNavigation('/login')}>Bejelentkezés</a>
        <a href="/register" onClick={() => handleNavigation('/register')}>Regisztráció</a>
      </div>
    </nav>
  );
}

export default Navbar;
