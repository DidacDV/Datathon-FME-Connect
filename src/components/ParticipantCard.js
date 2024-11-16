import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Box, Button } from '@mui/material';

const ParticipantCard = ({ participant }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: '20px auto',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        {/* Participant's Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar
            src={participant.avatar || `${process.env.PUBLIC_URL}/default-avatar.png`}
            alt={participant.name}
            sx={{
              width: 60,
              height: 60,
              marginRight: '15px',
            }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {participant.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {participant.university}
            </Typography>
          </Box>
        </Box>

        {/* Participant Details */}
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Age:
            </Typography>
            <Typography variant="body2">{participant.age || 'N/A'}</Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Year of Study:
            </Typography>
            <Typography variant="body2">{participant.year_of_study || 'N/A'}</Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Shirt Size:
            </Typography>
            <Typography variant="body2">{participant.shirt_size || 'N/A'}</Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Preferred Role:
            </Typography>
            <Typography variant="body2">{participant.preferred_role || 'N/A'}</Typography>
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Hackathons Done:
            </Typography>
            <Typography variant="body2">{participant.hackathons_done || 'N/A'}</Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Experience Level:
            </Typography>
            <Typography variant="body2">{participant.experience_level || 'N/A'}</Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Dietary Restrictions:
            </Typography>
            <Typography variant="body2">
              {participant.dietary_restrictions || 'None'}
            </Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
              Team Size:
            </Typography>
            <Typography variant="body2">
              {participant.preferred_team_size || 'N/A'}
            </Typography>
          </Grid>
        </Grid>

        {/* Skills and Interests */}
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
            Programming Skills:
          </Typography>
          <Typography variant="body2">
            {participant.programming_skills || 'N/A'}
          </Typography>

          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
            Challenges of Interest:
          </Typography>
          <Typography variant="body2">
            {participant.interest_in_challenges || 'N/A'}
          </Typography>

          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
            Objective:
          </Typography>
          <Typography variant="body2">{participant.objective || 'N/A'}</Typography>

          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2596BE' }}>
            Fun Fact:
          </Typography>
          <Typography variant="body2">{participant.fun_fact || 'N/A'}</Typography>
        </Box>

        {/* Contact Information */}
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            href={`mailto:${participant.email}`}
            sx={{ textTransform: 'none' }}
          >
            Email
          </Button>
          {participant.linkedin && (
            <Button
              variant="contained"
              color="primary"
              href={participant.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textTransform: 'none' }}
            >
              LinkedIn
            </Button>
          )}
          {participant.discord && (
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Discord
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
