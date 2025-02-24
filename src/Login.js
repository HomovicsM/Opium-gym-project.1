import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt implementáld a bejelentkezési logikát (pl. API hívás)
    console.log("Bejelentkezési adatok:", formData);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-video-container">
        <video className="auth-video-background" autoPlay loop muted playsInline>
          <source src="/reg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="auth-container">
        <h2>Bejelentkezés</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email cím"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Bejelentkezés</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
