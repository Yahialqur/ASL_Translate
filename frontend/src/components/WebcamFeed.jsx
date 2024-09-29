import React, { useRef, useEffect, useState } from 'react';

const WebcamFeed = ({ onPrediction }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(true);

  useEffect(() => {
    const startWebcam = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamRef.current.srcObject = stream;
        webcamRef.current.play();
      }
    };

    startWebcam();

    const interval = setInterval(() => {
      if (isCapturing) {
        captureFrame();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isCapturing]);

  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');

    context.drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');

    sendImageToBackend(imageData);
  };

  const sendImageToBackend = async (imageData) => {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();

      console.log('Type of onPrediction:', typeof onPrediction);
      console.log('Value of onPrediction:', onPrediction);

      if (typeof onPrediction === 'function') {
        
        onPrediction(data.gesture);
        
      } else {
        console.error('onPrediction is not a function:', onPrediction);
      }
    } catch (error) {
      console.error('Error sending image to backend:', error);
    }
  };

  return (
    <div>
      <video
        ref={webcamRef}
        width="640"
        height="480"
        autoPlay
        muted
        style={{ border: '1px solid black' }}
      />
      <button onClick={() => setIsCapturing(!isCapturing)}>
        {isCapturing ? 'Stop Capture' : 'Start Capture'}
      </button>
    </div>
  );
};

export default WebcamFeed;
