import React, { useEffect, useState } from 'react';
import ParticipantCard from '../components/ParticipantCard';
import { fetchParticipants } from '../services/ParticipantService';
import { Box, Typography, Grid } from '@mui/material';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadParticipants = async () => {
      const data = await fetchParticipants();
      setParticipants(data);
      setLoading(false);
    };

    loadParticipants();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#27272a',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" sx={{ color: 'white' }}>
          Loading participants...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#27272a',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '30px',
        }}
      >
        Participants
      </Typography>
      <Grid container spacing={3}>
        {participants.map((participant, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <ParticipantCard participant={participant} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Participants;
