import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ParticipantCard = ({ participant }) => {
  return (
    <Card
      sx={{
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        padding: '10px',
      }}
    >
      <CardContent>
        {/* Minimal details */}
        <Typography variant="h6" sx={{ color: '#27272a' }}>
          {participant.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {participant.university}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Preferred Role: {participant.preferred_role}
        </Typography>
        {/* Link to detailed profile */}
        <Button
          component={Link}
          to={`/profile/${participant.id}`}
          sx={{
            backgroundColor: '#27272a',
            color: 'white',
            marginTop: '10px',
            '&:hover': { backgroundColor: '#3a3a3d' },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
