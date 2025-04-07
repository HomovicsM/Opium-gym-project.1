import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Merch.css";

function MerchList({ merchItems, addToCart }) {
  return (
    <div className="merch-grid">
      {merchItems.map((item) => (
        <div key={item.id} className="card">
          <img src={item.image} alt={item.name} className="card-img" />
          <h3>{item.name}</h3>
          <p className="price">{item.price} Ft</p>
          <select className="size-select">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <button className="order-btn" onClick={() => addToCart(item)}>Kosárba</button>
        </div>
      ))}
    </div>
  );
}

function Merch() {
  const [merchItems, setMerchItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // **Termékek betöltése a backendből Axiosal**
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/Merch/product`)
      .then(response => setMerchItems(response.data))
      .catch(error => console.error("Hiba a termékek betöltésekor:", error));

    axios.get(`${process.env.REACT_APP_API_URL}/api/Merch/cart`)
      .then(response => setCartCount(response.data.length))
      .catch(error => console.error("Hiba a kosár betöltésekor:", error));
  }, []);

  // **Termék hozzáadása a kosárhoz a backend segítségével Axiosal**
  const addToCart = async (item) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/Merch/cart`, { productId: item.id, quantity: 1 });
      setCartCount(cartCount + 1);
    } catch (error) {
      console.error("Hiba a kosárhoz adásnál:", error);
    }
  };

  return (
    <div className="merch-container">
      {/* Háttérvideó */}
      <div className="merch-video-container">
        <video className="merch-video-background" autoPlay loop muted playsInline>
          <source src="/merchh.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Kosár ikon és számláló */}
      <div className="cart-container" onClick={() => navigate("/cart")}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cartCount}</span>
      </div>

    </div>
  );
}

export default Merch;
