import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid } from '@mui/material';
import TeamCard from '../components/TeamCard';

const TeamList = () => {
  const { groupId } = useParams();
  const [teams, setTeams] = useState([]);

  // Mock API call to fetch teams by groupId
  useEffect(() => {
    const fetchTeams = async () => {
      const groupData = {
        1: [
          { id: 101, name: 'Team Alpha', members: ['Alice', 'Bob', 'Charlie'] },
          { id: 102, name: 'Team Beta', members: ['David', 'Eve', 'Frank'] },
        ],
        2: [
          { id: 201, name: 'Team Gamma', members: ['Grace', 'Hank', 'Ivy'] },
          { id: 202, name: 'Team Delta', members: ['Jack', 'Kate', 'Leo'] },
        ],
      };
      setTeams(groupData[groupId] || []);
    };

    fetchTeams();
  }, [groupId]);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#2596BE', fontWeight: 'bold' }}
      >
        Teams in Group {groupId}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teams.map((team) => (
          <Grid item key={team.id} xs={12} sm={6} md={4}>
            <TeamCard team={team} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamList;
