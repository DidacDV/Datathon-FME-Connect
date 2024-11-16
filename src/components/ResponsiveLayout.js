import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Box, Typography } from '@mui/material';

const ResponsiveLayout = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h4">This is a responsive heading</Typography>
      <Typography variant="body1">This layout changes based on the screen size.</Typography>
    </Box>
  );
};

export default ResponsiveLayout;
