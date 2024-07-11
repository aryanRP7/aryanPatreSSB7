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
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);

  const beepRef = useRef(null);
  const stopwatchIntervalRef = useRef(null);
  const wordTimeoutRef = useRef(null);
  const blankTimeoutRef = useRef(null);

  useEffect(() => {
    let wordTimer;
    let blankTimer;

    if (testStarted && selectedSet) {
      // Start displaying word
      if (isWordVisible) {
        beepRef.current.play();
        setStopwatchSeconds(0); // Reset stopwatch when word appears
        startStopwatch();
        wordTimer = setTimeout(() => {
          setIsWordVisible(false);
          startBlankScreenTimer();
        }, 14000); // Show word for 14 seconds
      }
    }

    return () => {
      clearTimeout(wordTimer);
      clearTimeout(blankTimer);
    };
  }, [isWordVisible, testStarted, selectedSet]);

  // Function to start the stopwatch
  const startStopwatch = () => {
    if (!stopwatchRunning) {
      setStopwatchRunning(true);
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); // Update stopwatch every second (1000ms)
    }
  };

  // Function to stop the stopwatch
  const stopStopwatch = () => {
    clearInterval(stopwatchIntervalRef.current);
    setStopwatchRunning(false);
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    setStopwatchSeconds(0);
  };

  // Function to start the blank screen timer
  const startBlankScreenTimer = () => {
    blankTimeoutRef.current = setTimeout(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex < watData.sets.find((item) => item.id === selectedSet).words.length - 1) {
          return prevIndex + 1;
        } else {
          setTestStarted(false);
          return 0;
        }
      });
      setIsWordVisible(true);
    }, 40000); // Show blank screen for 40 seconds
  };

  // Handle set selection
  const handleSetSelection = (setId) => {
    setSelectedSet(setId);
    setTestStarted(false);
    setCurrentWordIndex(0);
    setIsWordVisible(true);
    resetStopwatch(); // Reset stopwatch when a new set is selected
  };

  // Start test button handler
  const handleStartTest = () => {
    setTestStarted(true);
  };

  // Function to format seconds as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
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
                <div className="stopwatch">
                  Stopwatch: {formatTime(stopwatchSeconds)}
                </div>
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
