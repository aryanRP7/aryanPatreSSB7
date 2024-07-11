import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import watData from './data/WATdata.json'; // Assuming you have WATdata.json with word sets
import './WAT.css'; // Create WAT.css for styling if needed
import beepSound from './beep.mp3'; // Ensure beep sound is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const WAT = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isWordVisible, setIsWordVisible] = useState(true);

  const beepRef = useRef(null);

  useEffect(() => {
    let wordTimer;
    let blankTimer;

    if (testStarted && selectedSet) {
      if (isWordVisible) {
        beepRef.current.play();
        wordTimer = setTimeout(() => {
          setIsWordVisible(false);
        }, 14000); // Show word for 14 seconds
      } else {
        blankTimer = setTimeout(() => {
          setCurrentWordIndex((prevIndex) => {
            if (prevIndex < watData.sets.find((item) => item.id === selectedSet).words.length - 1) {
              return prevIndex + 1;
            } else {
              setTestStarted(false);
              return 0;
            }
          });
          setIsWordVisible(true);
        }, 220000); // Show blank screen for 3 minutes and 40 seconds
      }
    }

    return () => {
      clearTimeout(wordTimer);
      clearTimeout(blankTimer);
    };
  }, [isWordVisible, testStarted, selectedSet]);

  const handleSetSelection = (setId) => {
    setSelectedSet(setId);
    setTestStarted(false);
    setCurrentWordIndex(0);
    setIsWordVisible(true);
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  return (
    <div className="wat-container">
      <Link to="/" className="home-icon">
        <FontAwesomeIcon icon={faHome} size="2x" />
      </Link>
      <h1>Select a Set of Words</h1>
      <div className="sets">
        {watData.sets.map((set, index) => (
          <button
            key={index}
            className="set-button"
            onClick={() => handleSetSelection(set.id)}
          >
            Set {set.id}
          </button>
        ))}
      </div>
      {selectedSet !== null && (
        <div className="selected-set">
          <h2>Words - Set {selectedSet}</h2>
          <div className="options">
            <button className="option-button" onClick={handleStartTest}>
              Start Test
            </button>
          </div>
          {testStarted && (
            <div className="test">
              <div className="word-container">
                {isWordVisible ? (
                  <p className="test-word">
                    {watData.sets.find((item) => item.id === selectedSet).words[currentWordIndex]}
                  </p>
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

export default WAT;
