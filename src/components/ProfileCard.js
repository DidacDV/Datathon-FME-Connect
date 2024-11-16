import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ProfileCard = ({ profile }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{profile.name}</Typography>
        <Typography variant="body1">Skills: {profile.skills.join(', ')}</Typography>
        <Typography variant="body1">Goals: {profile.goals}</Typography>
        <Typography variant="body1">Availability: {profile.availability}</Typography>
      </CardContent>
      <Button variant="contained">Swipe Right</Button>
      <Button variant="outlined">Swipe Left</Button>
    </Card>
  );
};

export default ProfileCard;
