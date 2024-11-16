import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  // Mock API call to fetch teams data
  useEffect(() => {
    const fetchTeams = async () => {
      const data = [
        { id: 1, name: 'Team Alpha', members: ['Alice', 'Bob', 'Charlie'] },
        { id: 2, name: 'Team Beta', members: ['David', 'Eve', 'Frank'] },
      ];
      setTeams(data);
    };

    fetchTeams();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Teams</h1>
      {teams.map((team) => (
        <div key={team.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{team.name}</h2>
          <ul>
            {team.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Teams;
