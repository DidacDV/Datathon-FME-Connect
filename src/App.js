import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Swiping from './pages/Swiping'; 
import Map from './pages/Map';



function App() {
  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />
      {/* Main content changes based on the route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/swiping" element={<Swiping />} /> 
        <Route path="/map" element={<Map />} />

      </Routes>
    </Router>
  );
}

export default App;
