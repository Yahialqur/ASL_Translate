// src/pages/ASLTranscriber.jsx
import React, { useState } from 'react';
import WebcamFeed from '../components/WebcamFeed';
import PredictionOutput from '../components/PredictionOutput';

const ASLTranscriber = () => {
  const [output, setOutput] = useState('Your translation will appear here.');

  const handlePrediction = (prediction) => {
    
    setOutput(`Gesture: ${prediction}`);
    
  };

  return (
    <div className="transcriber-container">
      <h1>ASL Transcriber</h1>
      <WebcamFeed onPrediction={handlePrediction} />
      <PredictionOutput prediction={output} />
    </div>
  );
};

export default ASLTranscriber;
