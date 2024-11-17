import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const TeamStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://172.20.10.3:3000/api/team-statistics/');
        if (!response.ok) throw new Error('Failed to fetch team statistics');
        const data = await response.json();
        setStatistics(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h5">Loading team statistics...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', color: '#2596BE', fontWeight: 'bold' }}
      >
        Team Statistics
      </Typography>
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Team Name</strong></TableCell>
              <TableCell><strong>Members</strong></TableCell>
              <TableCell><strong>Performance</strong></TableCell>
              <TableCell><strong>Feedback</strong></TableCell>
              <TableCell><strong>Created</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statistics.map((team, index) => (
              <TableRow key={index}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.members}</TableCell>
                <TableCell>{team.performance}</TableCell>
                <TableCell>{team.feedback}</TableCell>
                <TableCell>{team.created ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TeamStatistics;
