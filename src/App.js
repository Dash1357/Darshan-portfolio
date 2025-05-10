import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Sports from './pages/Sports';
import Travel from './pages/Travel';
import Drone from './pages/Drone';
import Wildlife from './pages/Wildlife';

function ScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
