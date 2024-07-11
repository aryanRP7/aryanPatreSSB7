// components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon="fa-brands fa-wordpress" />

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
      </div>
    </div>
  );
};

export default Home;
