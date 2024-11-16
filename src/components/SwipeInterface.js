import React from 'react';
import { useMediaQuery } from '@mui/material';

const SwipeInterface = ({ profiles }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {profiles.map((profile, index) => (
        <div key={index}>
          <h3>{profile.name}</h3>
          <p>{profile.skills.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default SwipeInterface;
