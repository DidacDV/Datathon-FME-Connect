import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import TeamCard from '../components/TeamCard';
import { fetchTeams } from "../services/TeamService";

const SavedTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      const data = await fetchTeams();
      setTeams(data.filter(team => team.members && team.members.length > 0));
    };
    loadTeams();
  }, []);

  const handleUpdateTeam = (updatedTeam) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.name === updatedTeam.name ? updatedTeam : team))
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
          <Grid item key={team.name} xs={12} sm={6} md={4}>
            <TeamCard team={team} onUpdateTeam={handleUpdateTeam} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SavedTeams;
