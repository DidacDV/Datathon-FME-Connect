import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import TeamCard from '../components/TeamCard';

const SavedTeams = () => {
  const [teams, setTeams] = useState([]);

  // Mock API call to fetch teams data
  useEffect(() => {
    const fetchTeams = async () => {
      const data = [
        { id: 1, name: 'Team Alpha', members: ['Alice', 'Bob', 'Charlie'] },
        { id: 2, name: 'Team Beta', members: ['David', 'Eve', 'Frank'] },
        { id: 3, name: 'Team Gamma', members: ['Grace', 'Hank', 'Ivy'] },
      ];
      setTeams(data);
    };

    fetchTeams();
  }, []);

  const handleUpdateTeam = (updatedTeam) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: '#2596BE', fontWeight: 'bold' }}
      >
        Saved Teams
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teams.map((team) => (
          <Grid item key={team.id} xs={12} sm={6} md={4}>
            <TeamCard team={team} onUpdateTeam={handleUpdateTeam} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SavedTeams;
