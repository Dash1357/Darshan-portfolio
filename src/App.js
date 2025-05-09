import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Sports from './pages/Sports';
import Travel from './pages/Travel';
import Drone from './pages/Drone';
import Wildlife from './pages/Wildlife';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/drone" element={<Drone />} />
        <Route path="/wildlife" element={<Wildlife />} />
      </Routes>
    </Router>
  );
}

export default App;
