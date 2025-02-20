import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tv.css';

function Tv() {
  const navigate = useNavigate();

  const handleMerchClick = (e) => {
    e.preventDefault();
    navigate('/merch');
  };

  return (
    <div>
      <div className="tv-container">
        <div className="tv">
          <a
            href="https://www.youtube.com/watch?v=BJwaTGo9c_Y"
            target="_blank"
            rel="noopener noreferrer"
            className="tour-link"
          >
            CLCK
          </a>
        </div>
      </div>

      <div className="tv-container-merch">
        <div className="tv-merch">
          <a href="/merch" onClick={handleMerchClick} className="merch-link">
            CLCK2
          </a>
        </div>
      </div>

      {/* Új VIDEOS link */}
      <div className="tv-container-videos">
        <div className="tv-videos">
          <a
            href="https://www.example.com/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            CLCK3
          </a>
        </div>
      </div>
    </div>
  );
}

export default Tv;
