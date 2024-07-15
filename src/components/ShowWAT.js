import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import watData from './data/WATdata.json'; // Assuming you have WATdata.json with word sets
import './ShowWAT.css'; // Create ShowWAT.css for styling if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const ShowWAT = () => {
  const [selectedSet, setSelectedSet] = useState(1); // Default to first set

  const handleSetSelection = (setId) => {
    setSelectedSet(setId);
  };

  return (
    <div className="show-wat-container">
      <Link to="/" className="home-icon">
        <FontAwesomeIcon icon={faHome} size="2x" />
      </Link>
      <h1>Select a Set of Words</h1>
      <p>Scroll Down</p>
      <div className="sets">
        {watData.sets.map((set) => (
          <button
            key={set.id}
            className={`set-button ${selectedSet === set.id ? 'active' : ''}`}
            onClick={() => handleSetSelection(set.id)}
          >
            Set {set.id}
          </button>
        ))}
      </div>
      <div className="selected-set">
        <h2>Words - Set {selectedSet}</h2>
        <div className="word-thumbnails">
          {watData.sets[selectedSet - 1].words.map((word, index) => (
            <div key={index} className="word-thumbnail">
              <p>{word}</p>
              <div className="word-index">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowWAT;
