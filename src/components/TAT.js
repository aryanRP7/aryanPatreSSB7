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
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false); // State to track wake lock status

  const beepRef = useRef(null);
  const stopwatchIntervalRef = useRef(null);
  const imageScreenRef = useRef(null); // Reference for scrolling to image screen
  const wakeLockRef = useRef(null); // Reference for wake lock object

  useEffect(() => {
    let imageTimer;
    let blankTimer;

    if (testStarted && selectedSet) {
      requestWakeLock(); // Request wake lock when showing image
      if (isImageVisible) {
        resetStopwatch();
        playBeep(); // Play beep sound when image is visible
        startStopwatch();
        imageTimer = setTimeout(() => {
          setIsImageVisible(false);
          startBlankScreenTimer();
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
        }, 220000); // Show blank screen for 3 minutes and 40 seconds (220 seconds)
      }
    }

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(blankTimer);
      releaseWakeLock(); // Ensure wake lock is released on component unmount or test stop
    };
  }, [isImageVisible, testStarted, selectedSet]);

  // Function to request wake lock
  const requestWakeLock = async () => {
    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen');
      setWakeLockActive(true);
      console.log('Wake Lock activated!');
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  // Function to release wake lock
  const releaseWakeLock = async () => {
    if (wakeLockRef.current !== null) {
      await wakeLockRef.current.release();
      setWakeLockActive(false);
      console.log('Wake Lock released!');
    }
  };

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
    // Implement your logic for the blank screen timer here if needed
  };

  // Function to play the beep sound
  const playBeep = () => {
    if (beepRef.current) {
      beepRef.current.currentTime = 0; // Reset audio to start
      beepRef.current.play();
    }
  };

  // Handle set selection
  const handleSetSelection = (set) => {
    setSelectedSet(set);
    setTestStarted(false);
    setCurrentImageIndex(0);
    setIsImageVisible(true);
    resetStopwatch(); // Reset stopwatch on new set selection
    scrollToImageScreen(); // Scroll to image screen after set selection
  };

  // Start test button handler
  const handleStartTest = () => {
    setTestStarted(true);
    scrollToImageScreen(); // Scroll to image screen after starting the test
  };

  // Function to format seconds as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Function to scroll to the image screen
  const scrollToImageScreen = () => {
    if (imageScreenRef.current) {
      imageScreenRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
            className={`set-button ${selectedSet === item.set ? 'selected' : ''}`} // Apply selected class
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
            <button
              className="option-button start-button" // Apply start-button class for specific styling
              onClick={handleStartTest}
            >
              Start Test
            </button>
          </div>
          {testStarted && (
            <div className="test" ref={imageScreenRef}> {/* Added ref for scrolling */}
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
                {/* Ensure audio element is hidden */}
                <audio ref={beepRef} src={beepSound} style={{ display: 'none' }} />
              </div>
              <div className="stopwatch">
                {formatTime(stopwatchSeconds)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TAT;
