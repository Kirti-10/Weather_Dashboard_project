// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Weather from './components/Weather.jsx';

import Feedback from './components/Feedback.jsx';

import Home from './components/Home.jsx';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/weather/" element={<Weather />} />
       
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/" element={<Home />} />
      
      </Routes>
    </Router>
  );
}

export default App;