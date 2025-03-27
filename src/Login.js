import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // 👉 Fontos: importáljuk a stílusokat

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        userName,
        password,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Hiba:', error);
      setMessage(error.response?.data || 'Sikertelen bejelentkezés');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-video-container">
        <video className="auth-video-background" autoPlay muted loop>
          <source src="/reg.mp4" type="video/mp4" />
          A böngésződ nem támogatja a videó lejátszást.
        </video>
      </div>

      <div className="auth-container">
        <h2>Bejelentkezés</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Bejelentkezés</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
