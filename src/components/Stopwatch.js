// components/Stopwatch.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './Stopwatch.css';
import beepSound from './beep.mp3';

const Stopwatch = () => {
  const [srtSeconds, setSrtSeconds] = useState(0);
  const [srtRunning, setSrtRunning] = useState(false);
  const [sdtSeconds, setSdtSeconds] = useState(0);
  const [sdtRunning, setSdtRunning] = useState(false);

  const srtIntervalRef = useRef(null);
  const sdtIntervalRef = useRef(null);
  const beepRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(srtIntervalRef.current);
      clearInterval(sdtIntervalRef.current);
    };
  }, []);

  const startSRT = () => {
    if (!srtRunning) {
      setSrtRunning(true);
      srtIntervalRef.current = setInterval(() => {
        setSrtSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopSRT = () => {
    clearInterval(srtIntervalRef.current);
    setSrtRunning(false);
  };

  const resetSRT = () => {
    clearInterval(srtIntervalRef.current);
    setSrtSeconds(0);
    setSrtRunning(false);
  };

  useEffect(() => {
    if (srtSeconds === 1800) { // 30 minutes
      beepRef.current.play();
      stopSRT();
    }
  }, [srtSeconds]);

  const startSDT = () => {
    if (!sdtRunning) {
      setSdtRunning(true);
      sdtIntervalRef.current = setInterval(() => {
        setSdtSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopSDT = () => {
    clearInterval(sdtIntervalRef.current);
    setSdtRunning(false);
  };

  const resetSDT = () => {
    clearInterval(sdtIntervalRef.current);
    setSdtSeconds(0);
    setSdtRunning(false);
  };

  useEffect(() => {
    if (sdtSeconds === 900) { // 15 minutes
      beepRef.current.play();
      stopSDT();
    }
  }, [sdtSeconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="stopwatch-container">
      <Link to="/" className="home-icon">
        <FontAwesomeIcon icon={faHome} size="2x" />
      </Link>
      <audio ref={beepRef} src={beepSound} />
      <div className="stopwatch-section">
        <h2>SRT Stopwatch</h2>
        <div className="stopwatch-time">{formatTime(srtSeconds)}</div>
        <div className="stopwatch-buttons">
          <button onClick={startSRT} disabled={srtRunning}>Start</button>
          <button className={`stop-button ${srtRunning ? 'started' : ''}`} onClick={stopSRT} disabled={!srtRunning}>Stop</button>
          <button onClick={resetSRT}>Reset</button>
        </div>
      </div>
      <div className="stopwatch-section">
        <h2>SDT Stopwatch</h2>
        <div className="stopwatch-time">{formatTime(sdtSeconds)}</div>
        <div className="stopwatch-buttons">
          <button onClick={startSDT} disabled={sdtRunning}>Start</button>
          <button className={`stop-button ${sdtRunning ? 'started' : ''}`} onClick={stopSDT} disabled={!sdtRunning}>Stop</button>
          <button onClick={resetSDT}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;