// components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye, faClock } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="home-container">
      <Link to="/" className="home-icon">
        <FontAwesomeIcon icon={faHome} size="2x" />
      </Link>
      <h1>ARYAN PATRE</h1>
      <div className="options">
        <Link to="/tat">
          <button className="option-button">TAT</button>
        </Link>
        <Link to="/showtat">
          <button className="option-button">
            <FontAwesomeIcon icon={faEye} /> TAT
          </button>
        </Link>
        <Link to="/wat">
          <button className="option-button">WAT</button>
        </Link>
        <Link to="/showwat">
          <button className="option-button">
            <FontAwesomeIcon icon={faEye} /> WAT
          </button>
        </Link>
        <Link to="/stopwatch">
          <button className="option-button">
            <FontAwesomeIcon icon={faClock} /> Stopwatch
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
