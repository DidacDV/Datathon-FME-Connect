import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
} from '@mui/material';

const Teams = () => {
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

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: '#2596BE', fontWeight: 'bold' }}
      >
        Teams
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teams.map((team) => (
          <Grid item key={team.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
              }}
            >
              <CardContent>
                {/* Team Name */}
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#2596BE' }}
                >
                  {team.name}
                </Typography>
                {/* Members List */}
                <Typography variant="h6" gutterBottom>
                  Members:
                </Typography>
                <List>
                  {team.members.map((member, index) => (
                    <ListItem key={index} sx={{ padding: '5px 0' }}>
                      <ListItemText primary={member} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Teams;
