// Merch.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./Merch.css";

function MerchList({ merchItems, onDelete }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="merch-grid">
        {merchItems.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className="card-img" />
            <h3>{item.name}</h3>
            <button className="order-btn" onClick={() => onDelete(item.id)}>
              Törlés
            </button>
          </div>
        ))}
      </div>
      <button className="order-btn" onClick={() => navigate('/merch/new')}>
        Új termék hozzáadása
      </button>
    </div>
  );
}

function MerchForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, image });
    navigate('/merch');
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <h2>Új termék hozzáadása</h2>
      <div>
        <input
          type="text"
          placeholder="Termék neve"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Kép URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="order-btn">
        Mentés
      </button>
    </form>
  );
}

function Merch() {
  const [merchItems, setMerchItems] = useState([]);

  useEffect(() => {
    const initialData = [
      { id: 1, name: "T-Shirt", image: "/tshirt.jpg" },
      { id: 2, name: "Cap", image: "/cap.jpg" },
      // Egyéb elemek...
    ];
    setMerchItems(initialData);
  }, []);

  const handleDelete = (id) => {
    setMerchItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAdd = (item) => {
    const newItem = { id: Date.now(), ...item };
    setMerchItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="merch-container">
      {/* Háttér videó hozzáadása */}
      <div className="merch-video-container">
        <video className="merch-video-background" autoPlay loop muted playsInline>
          <source src="/merchhatter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Routes>
        <Route
          path="/"
          element={<MerchList merchItems={merchItems} onDelete={handleDelete} />}
        />
        <Route path="/new" element={<MerchForm onSubmit={handleAdd} />} />
      </Routes>
    </div>
  );
}

export default Merch;
