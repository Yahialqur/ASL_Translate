import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [text, setText] = useState(''); 
  const fullText = 'Click below to start using the ASL Translator!'; 
  const typingSpeed = 50; 
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Clear any existing interval to prevent multiple intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset the index and text when the effect runs
    indexRef.current = 0;
    setText('');

    intervalRef.current = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setText(fullText.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(intervalRef.current);
      }
    }, typingSpeed);

    return () => {
      // Cleanup interval on component unmount
      clearInterval(intervalRef.current);
    };
  }, [fullText, typingSpeed]);

  return (
    <div className="homepage-container">
      <h1>Welcome to the ASL Translator</h1>
      <p>
        The web app that translates ASL to text in real-time.
        You can use your webcam to capture ASL gestures and get instant translations.
      </p>
      <p className='animated-text'>{text}</p>
      <Link to="/transcriber" className="transcriber-link">
        Get Started Here!
      </Link>
    </div>
  );
};

export default HomePage;
