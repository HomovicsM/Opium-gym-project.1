import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("A jelszavak nem egyeznek meg!");
      return;
    }
    // Itt implementáld a regisztrációs logikát (pl. API hívás)
    console.log("Regisztrációs adatok:", formData);
    navigate('/login');
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
        <h2>Regisztráció</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Felhasználónév"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Jelszó megerősítése"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Regisztráció</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
