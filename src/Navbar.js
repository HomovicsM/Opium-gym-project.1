import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); 

    const handleHomeClick = () => {
        navigate('/'); 
    };

    const handleTourClick = () => {
        navigate('/tour'); 
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
                <a href="/tour" onClick={handleTourClick}>Tour</a>
                <a href="#contact">Videos</a>
                <a href="#contact">Rólunk</a>
                <a href="#contact">Belépés</a>
            </div>
        </nav>
    );
}

export default Navbar;
