import React, { useState, useEffect } from "react";
import "./Tour.css";

const images = [
  "/gym.jpg",
  "/gym2.jpg",
  "/gym3.jpg",
  "/gym4.jpg",

];

function Tour() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.body.classList.add("tour-active");
    return () => {
      document.body.classList.remove("tour-active");
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  
  return (
    <div className="tour-container">
      <div className="tour-video-container">
        <video className="tour-video-background" autoPlay loop muted playsInline>
          <source src="/merchhatter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <button className="arrow left" onClick={handlePrev}>
        &lt;
      </button>
      <div className="image-container">
        <img src={images[currentIndex]} alt="Tour" className="tour-image" />
      </div>
      <button className="arrow right" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

export default Tour;
