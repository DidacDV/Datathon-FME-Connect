import React, { useState } from 'react';

const GenerateTeams = () => {
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');

  // Function to handle team generation
  const handleGenerateTeams = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/generate-teams/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        setTeams(data.teams);
        setMessage('Teams generated successfully!');
      } else {
        setMessage(data.error || 'Error generating teams');
      }
    } catch (error) {
      setMessage('Failed to generate teams.');
    }
  };

  // Function to handle saving teams
  const handleSaveTeams = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/save-teams/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teams }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Teams saved successfully!');
      } else {
        setMessage(data.error || 'Error saving teams');
      }
    } catch (error) {
      setMessage('Failed to save teams.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#2596BE', textAlign: 'center' }}>Team Management</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={handleGenerateTeams}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2596BE',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Generate Teams
        </button>
        <button
          onClick={handleSaveTeams}
          style={{
            padding: '10px 20px',
            backgroundColor: teams.length ? '#2596BE' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: teams.length ? 'pointer' : 'not-allowed',
          }}
          disabled={!teams.length}
        >
          Save Teams
        </button>
      </div>
      {message && <p style={{ color: '#2596BE', textAlign: 'center' }}>{message}</p>}
      <div>
        {teams.map((team, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <h3 style={{ color: '#2596BE' }}>{team.name}</h3>
            <ul>
              {team.members.map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateTeams;
