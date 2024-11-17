import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SavedTeams from './pages/SavedTeams';
import Participants from './pages/Participants';
import Navbar from './components/Navbar';
import Statistics from './pages/Statistics';
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
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/generate-teams" element={<GenerateTeams />} />
        <Route path="/profile/:id" element={<ParticipantProfile />} />
        <Route path="/teams/:groupId" element={<Teams />} />
        <Route path="/participants" element={<Participants />} />



      </Routes>
    </Router>
  );
}

export default App;
