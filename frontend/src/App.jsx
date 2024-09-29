// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ASLTranscriber from './pages/ASLTranscriber';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transcriber" element={<ASLTranscriber />} />
      </Routes>
    </Router>
  );
}

export default App;

