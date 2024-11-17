import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ParticipantProfile = () => {
  const { id } = useParams(); // Get participant ID from the URL
  const [participant, setParticipant] = useState(null);

  // Fetch participant details by ID
  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/participants/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch participant');
        const data = await response.json();
        setParticipant(data);
      } catch (error) {
        console.error('Error fetching participant:', error);
      }
    };

    fetchParticipant();
  }, [id]);

  if (!participant) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#27272a',
          color: 'white',
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#27272a', // Dark background
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Card
        sx={{
          padding: '20px',
          margin: '20px auto',
          maxWidth: '600px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ color: '#2596BE', marginBottom: '20px' }}>
            {participant.name}
          </Typography>
          <Typography variant="body1">
            <strong>University:</strong> {participant.university}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {participant.age}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {participant.email}
          </Typography>
          <Typography variant="body1">
            <strong>Skills:</strong> {participant.programming_skills}
          </Typography>
          <Typography variant="body1">
            <strong>Preferred Role:</strong> {participant.preferred_role}
          </Typography>
          <Typography variant="body1">
            <strong>Objective:</strong> {participant.objective}
          </Typography>
          <Typography variant="body1">
            <strong>Fun Fact:</strong> {participant.fun_fact}
          </Typography>
          {/* Add more attributes as needed */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ParticipantProfile;
