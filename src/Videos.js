import React, { useEffect } from "react";
import "./Videos.css";

function Videos() {
  useEffect(() => {
    document.body.classList.add("videos-active");

    return () => {
      document.body.classList.remove("videos-active");
    };
  }, []);

  return (
    <div className="videos-container">
      {/* Háttérvideó */}
      <div className="videos-video-container">
        <video className="videos-video-background" autoPlay loop muted playsInline>
          <source src="/merchhatter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h2>Itt találsz nagyon hasznos videós demostrációt a helyes edzésről és fogalmairól</h2>
      <div className="video-link-container">
        <a href="https://www.youtube.com/@GravityTransformation/videos" target="_blank" rel="noopener noreferrer">
          <img src="/gymkepthumb.jpg" alt="Video link" className="video-thumbnail" />
        </a>
      </div>
    </div>
  );
}

export default Videos;
