import React, { useEffect, useState } from 'react';

const SavedTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchSavedTeams = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get-saved-teams/');
        const data = await response.json();
        if (data.success) {
          setTeams(data.teams);
        }
      } catch (error) {
        console.error('Error fetching saved teams:', error);
      }
    };

    fetchSavedTeams();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#2596BE', textAlign: 'center' }}>Saved Teams</h1>
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

export default SavedTeams;
