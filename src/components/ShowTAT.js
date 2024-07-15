import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import tatData from './data/TATdata.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './ShowTAT.css';

const ShowTAT = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const selectedSetRef = useRef(null);

  const handleSetSelection = (set) => {
    setSelectedSet(set);
  };

  useEffect(() => {
    if (selectedSetRef.current) {
      selectedSetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSet]);

  return (
    <div className="show-tat-container">
      <Link to="/" className="home-icon">
        <FontAwesomeIcon icon={faHome} size="2x" />
      </Link>
      <h1>Select a Set of Images</h1>
      <div className="sets">
        {tatData.map((item, index) => (
          <button
            key={index}
            className={`set-button ${selectedSet === item.set ? 'active' : ''}`}
            onClick={() => handleSetSelection(item.set)}
          >
            {item.set}
          </button>
        ))}
      </div>
      {selectedSet && (
        <div className="carousel-container" ref={selectedSetRef}>
          <Carousel showThumbs={false} showStatus={false}>
            {tatData
              .find((item) => item.set === selectedSet)
              .images.map((image, index) => (
                <div key={index} style={{ backgroundColor: 'black', height: '100vh' }}>
                  <img
                    src={`${process.env.PUBLIC_URL}/${image}`}
                    alt={`TAT ${selectedSet} ${index + 1}`}
                    className="test-image"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
              ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ShowTAT;
