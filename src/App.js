import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SavedTeams from './pages/SavedTeams';
import Profile from './pages/Participants';
import Navbar from './components/Navbar';
import Map from './pages/Map';



function App() {
  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />
      {/* Main content changes based on the route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-teams" element={<SavedTeams />} />
        <Route path="/participants" element={<Profile />} />
        <Route path="/map" element={<Map />} />

      </Routes>
    </Router>
  );
}

export default App;
