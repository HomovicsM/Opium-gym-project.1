import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        userName,
        email,
        password,
      });

      setMessage('Sikeres regisztráció!');
      console.log(response.data);
    } catch (error) {
      console.error('Hiba:', error);
      setMessage(error.response?.data || 'Sikertelen regisztráció');
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
        <h2>Regisztráció</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Regisztráció</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
