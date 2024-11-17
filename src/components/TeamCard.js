// In your TeamCard component
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TeamCard = ({ team, onUpdateTeam }) => {
  const handleClick = () => {
    // Handle update logic (optional)
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{team.name}</Typography>

        {/* Render members */}
        <div>
          {team.members && team.members.length > 0 ? (
            team.members.map((member) => (
              <Typography key={member.id} variant="body2">
                {member.name}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No members available</Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
