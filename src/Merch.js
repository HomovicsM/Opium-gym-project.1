import React, { useEffect } from "react";
import "./Merch.css";

const products = [
  { id: 1, name: "Opium polo", price: "15990 Ft", image: "https://m.media-amazon.com/images/I/61HiOI2kVmL.jpg" },
  { id: 2, name: "00 logo polo", price: "12990 Ft", image: "https://i.etsystatic.com/45965460/r/il/4c9f57/5567250153/il_570xN.5567250153_9h03.jpg" },
  { id: 3, name: "Sapka", price: "4990 Ft", image: "/images/sapka.jpg" },
];

function Merch() {
  useEffect(() => {
    document.body.classList.add("merch-active");

    return () => {
      document.body.classList.remove("merch-active");
    };
  }, []);

  return (
    <div className="merch-container">
      {/* Merch háttérvideó */}
      <div className="merch-video-container">
        <video className="merch-video-background" autoPlay loop muted playsInline>
          <source src="/merchhatter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h2>Merch Shop</h2>
      <div className="merch-grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} className="card-img" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button className="order-btn">Rendelés</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Merch;
