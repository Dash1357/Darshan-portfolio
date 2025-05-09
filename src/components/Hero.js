import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <video
        className="hero-video"
        src="/assets/home/background.webm"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="hero-content">
        <img src="/assets/home/logo.png" alt="Logo" className="hero-logo" />
        <h1 className="hero-name">Darshan Jhawar</h1>
        <p className="hero-skills">Photographer | Drone Pilot | Videographer | Editor</p>
      </div>

      <div className="hero-tiles-section">
        <div className="hero-tiles">
          <Link to="/sports" className="hero-tile">
            <img src="/assets/home/sports.jpeg" alt="Sports" />
            <span>Sports</span>
          </Link>
          <Link to="/wildlife" className="hero-tile">
            <img src="/assets/home/wildlife.jpeg" alt="Wildlife" />
            <span>Wildlife</span>
          </Link>
          <Link to="/travel" className="hero-tile">
            <img src="/assets/home/travel.jpeg" alt="Travel" />
            <span>Travel</span>
          </Link>
          <Link to="/drone" className="hero-tile">
            <img src="/assets/home/drone.jpeg" alt="Drone" />
            <span>Drone</span>
          </Link>
        </div>
      </div>

      <footer className="hero-footer">
        Contact: <a href="mailto:heman.jhawar@gmail.com">heman.jhawar@gmail.com</a> |
        <a href="https://www.linkedin.com/in/darshan-jhawar-703161217/" target="_blank" rel="noreferrer"> LinkedIn</a> |
        <a href="https://www.instagram.com/dash_1357" target="_blank" rel="noreferrer"> Instagram</a>
      </footer>
    </div>
  );
};

export default Hero;
