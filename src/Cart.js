import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Merch.css";

const API_BASE = "http://localhost:5000/api"; // Backend URL

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/cart`)
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error("Hiba a kosár betöltésekor:", error));
  }, []);

  // **Elem törlése a kosárból**
  const removeFromCart = async (id) => {
    try {
      await fetch(`${API_BASE}/cart/${id}`, { method: "DELETE" });
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Hiba a törlésnél:", error);
    }
  };

  const handleCheckout = () => {
    alert("Rendelés leadva!");
    setCartItems([]);
    navigate("/merch");
  };

  return (
    <div className="cart-container-page">
      {/* Háttérvideó */}
      <div className="merch-video-container">
        <video className="merch-video-background" autoPlay loop muted playsInline>
          <source src="/merchhatter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* VISSZA gomb */}
      <button className="back-btn" onClick={() => navigate("/merch")}>
        ⬅ Vissza a Merch oldalra
      </button>

      <h2>🛒 Kosár tartalma</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">A kosár üres.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`/images/${item.productId}.jpg`} alt={item.productId} className="cart-img" />
              <div className="cart-item-info">
                <h3>Termék #{item.productId}</h3>
                <p>Mennyiség: {item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>❌ Törlés</button>
              </div>
            </div>
          ))}
          <button className="checkout-btn" onClick={handleCheckout}>✅ Rendelés leadása</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
