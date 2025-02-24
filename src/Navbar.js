import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './navbar.css';

function Navbar() {
    // Alapból látható legyen a navigáció
    const [menuOpen, setMenuOpen] = useState(true);
    const navigate = useNavigate(); 

    const handleHomeClick = () => {
        navigate('/'); 
    };

    const handleTourClick = () => {
        navigate('/tour'); 
    };
    
    const handleVideosClick = () => {
        navigate('/videos');
    };

    return (
        <nav className="navbar">
            <div 
              className="menu-button" 
              aria-label="button" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
                <div className={`bar ${menuOpen ? 'rotate-45' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'hidden' : ''}`}></div>
                <div className={`bar ${menuOpen ? '-rotate-45' : ''}`}></div>
            </div>
            {/* Ha a menü le van zárva (menuOpen false), a "hidden" osztály elrejti a linkeket */}
            <div className={`nav-links ${!menuOpen ? 'hidden' : ''}`}>
                <a href="#" onClick={handleHomeClick}>Főoldal</a>
                <a href="/merch">Merch</a>
                <a href="/tour" onClick={handleTourClick}>Tour</a>
                <a href="/videos" onClick={handleVideosClick}>Videos</a>
                <a href="#contact">Rólunk</a>
                <a href="#contact">Belépés</a>
            </div>
        </nav>
    );
}

export default Navbar;
