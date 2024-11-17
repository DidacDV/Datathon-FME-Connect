import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Button, Stack } from '@mui/material';
import TeamCard from '../components/TeamCard'; // Ensure the path to TeamCard is correct

const SavedTeamGroups = () => {
  const [teamGroups, setTeamGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Mock API call to fetch team group data
  useEffect(() => {
    const fetchTeamGroups = async () => {
      const data = [
        {
          id: 1,
          groupName: 'Team Group 2024',
          teams: [
            { id: 101, name: 'Team Alpha', members: ['Alice', 'Bob', 'Charlie'] },
            { id: 102, name: 'Team Beta', members: ['David', 'Eve', 'Frank'] },
          ],
        },
        {
          id: 2,
          groupName: 'Team Group 2023',
          teams: [
            { id: 201, name: 'Team Gamma', members: ['Grace', 'Hank', 'Ivy'] },
            { id: 202, name: 'Team Delta', members: ['Jack', 'Kate', 'Leo'] },
          ],
        },
      ];
      setTeamGroups(data);
    };

    fetchTeamGroups();
  }, []);

  const handleViewTeams = (groupId) => {
    const group = teamGroups.find((g) => g.id === groupId);
    setSelectedGroup(group);
  };

  const handleDeleteGroup = (groupId) => {
    const updatedGroups = teamGroups.filter((group) => group.id !== groupId);
    setTeamGroups(updatedGroups);
    if (selectedGroup?.id === groupId) setSelectedGroup(null);
  };

  const handleDeleteTeam = (teamId) => {
    if (selectedGroup) {
      const updatedTeams = selectedGroup.teams.filter((team) => team.id !== teamId);
      setSelectedGroup({ ...selectedGroup, teams: updatedTeams });
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#27272a',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {selectedGroup ? `Teams in ${selectedGroup.groupName}` : 'Saved Team Groups'}
      </Typography>
      {!selectedGroup ? (
        <Grid container spacing={4} justifyContent="center">
          {teamGroups.map((group) => (
            <Grid item key={group.id} xs={12} sm={6} md={4}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    color: '#27272a',
                  }}
                >
                  {group.groupName}
                </Typography>
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#27272a',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#494949',
                      },
                    }}
                    onClick={() => handleViewTeams(group.id)}
                  >
                    View Teams
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      borderColor: '#ff4d4d',
                      color: '#ff4d4d',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#ffe6e6',
                        borderColor: '#ff3333',
                      },
                    }}
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Delete Group
                  </Button>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {selectedGroup.teams.map((team) => (
            <Grid item key={team.id} xs={12} sm={6} md={4}>
              <TeamCard
                team={team}
                onDelete={() => handleDeleteTeam(team.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SavedTeamGroups;
