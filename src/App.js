import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SavedTeams from './pages/SavedTeams';
import Participants from './pages/Participants';
import Navbar from './components/Navbar';
import Map from './pages/Map';
import ParticipantProfile from './pages/ParticipantProfile';
import GenerateTeams from './pages/GenerateTeams';
import Teams from './pages/Teams';



function App() {
  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />
      {/* Main content changes based on the route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-teams" element={<SavedTeams />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/map" element={<Map />} />
        <Route path="/generate-teams" element={<GenerateTeams />} />
        <Route path="/profile/:id" element={<ParticipantProfile />} />
        <Route path="/teams/:groupId" element={<Teams />} />



      </Routes>
    </Router>
  );
}

export default App;
