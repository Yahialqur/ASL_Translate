// src/components/PredictionOutput.jsx
import React from 'react';

const PredictionOutput = ({ prediction }) => {
  return (
    <div className="prediction-output">
      <h2>Prediction</h2>
      <p>{prediction}</p>
    </div>
  );
};

export default PredictionOutput;
