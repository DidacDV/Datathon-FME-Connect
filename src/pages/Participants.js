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
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h5">Loading participants...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#2596BE', textAlign: 'center' }}
      >
        Participants
      </Typography>
      <Grid container spacing={3}>
        {participants.map((participant, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ParticipantCard participant={participant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Participants;