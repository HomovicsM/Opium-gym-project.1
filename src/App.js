import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Tv from './Tv';
import Merch from './Merch';
import Tour from './Tour';
import Videos from './Videos';
import Register from './Register';
import Login from './Login';
import About from './About';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="video-container">
                  <video className="video-background" autoPlay loop muted playsInline>
                    <source src="/hatter.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <Tv />
              </>
            }
          />
          <Route path="/merch" element={<Merch />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
