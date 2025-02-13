import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router navigáció
import './navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // Navigációs hook

    const handleHomeClick = () => {
        navigate('/'); // Visszavisz a főoldalra
    };

    return (
        <nav className="navbar">
            <div className="menu-button" aria-label="button" onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`bar ${menuOpen ? 'rotate-45' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'hidden' : ''}`}></div>
                <div className={`bar ${menuOpen ? '-rotate-45' : ''}`}></div>
            </div>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <a href="#" onClick={handleHomeClick}>Főoldal</a>
                <a href="/merch">Merch</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );
}

export default Navbar;
