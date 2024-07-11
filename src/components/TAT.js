import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import tatData from './data/TATdata.json';
import './TAT.css';
import beepSound from './beep.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const TAT = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);

  const beepRef = useRef(null);

  useEffect(() => {
    let imageTimer;
    let blankTimer;

    if (testStarted && selectedSet) {
      if (isImageVisible) {
        beepRef.current.play();
        imageTimer = setTimeout(() => {
          setIsImageVisible(false);
        }, 30000); // Show image for 30 seconds
      } else {
        blankTimer = setTimeout(() => {
          setCurrentImageIndex((prevIndex) => {
            if (prevIndex < tatData.find((item) => item.set === selectedSet).images.length - 1) {
              return prevIndex + 1;
            } else {
              setTestStarted(false);
              return 0;
            }
          });
          setIsImageVisible(true);
        }, 220000); // Show blank screen for 3 minutes and 40 seconds
      }
    }

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(blankTimer);
    };
  }, [isImageVisible, testStarted, selectedSet]);

  const handleSetSelection = (set) => {
    setSelectedSet(set);
    setTestStarted(false);
    setCurrentImageIndex(0);
    setIsImageVisible(true);
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  return (
    <div className="tat-container">
      <Link to="/" className="home-icon">
        <FontAwesomeIcon icon={faHome} size="2x" />
      </Link>
      <h1>Select a Set of Images</h1>
      <div className="sets">
        {tatData.map((item, index) => (
          <button
            key={index}
            className="set-button"
            onClick={() => handleSetSelection(item.set)}
          >
            {item.set}
          </button>
        ))}
      </div>
      {selectedSet && (
        <div className="selected-set">
          <h2>{selectedSet}</h2>
          <div className="options">
            <button className="option-button" onClick={handleStartTest}>
              Start Test
            </button>
          </div>
          {testStarted && (
            <div className="test">
              <div className="image-container">
                {isImageVisible ? (
                  <img
                    src={process.env.PUBLIC_URL + '/' + tatData.find((item) => item.set === selectedSet).images[currentImageIndex]}
                    alt={`TAT ${selectedSet} ${currentImageIndex + 1}`}
                    className="test-image"
                  />
                ) : (
                  <div className="blank-screen"></div>
                )}
              </div>
              <audio ref={beepRef} src={beepSound} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TAT;
