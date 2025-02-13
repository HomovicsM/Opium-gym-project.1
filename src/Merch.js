import React, { useEffect } from "react";
import "./Merch.css";

const products = [
  { id: 1, name: "Opium polo", price: "15990 Ft", image: "https://m.media-amazon.com/images/I/61HiOI2kVmL.jpg" },
  { id: 2, name: "00 logo polo", price: "12990 Ft", image: "https://i.etsystatic.com/45965460/r/il/4c9f57/5567250153/il_570xN.5567250153_9h03.jpg" },
  { id: 3, name: "Sapka", price: "4990 Ft", image: "/images/sapka.jpg" },
];

function Merch() {
  // Amikor a Merch oldal betöltődik, fekete hátteret állítunk be
  useEffect(() => {
    document.body.classList.add("merch-active");

    return () => {
      document.body.classList.remove("merch-active"); // Ha elhagyjuk az oldalt, visszaállítjuk
    };
  }, []);

  return (
    <div className="merch-container">
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