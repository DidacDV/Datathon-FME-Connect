import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const TeamStatistics = () => {
  const demoStatistics = [
    { teamName: 'Team Alpha', performance: 'High', feedback: 'Excellent collaboration', created: 'Yes', size: 5, avgSkill: 8, language: 'Catalan', uniqueSkills: 7 },
    { teamName: 'Team Beta', performance: 'Medium', feedback: 'Needs better coordination', created: 'Yes', size: 4, avgSkill: 6, language: 'Spanish', uniqueSkills: 5 },
    { teamName: 'Team Gamma', performance: 'Low', feedback: 'Lack of engagement', created: 'No', size: 3, avgSkill: 4, language: 'English', uniqueSkills: 3 },
    { teamName: 'Team Delta', performance: 'High', feedback: 'Innovative ideas', created: 'Yes', size: 6, avgSkill: 9, language: 'Catalan', uniqueSkills: 8 },
  ];

  const overviewData = {
    totalTeams: 4,
    avgTeamSize: 4.5,
    algorithmSuccessRate: '85%',
    languageGroups: { Catalan: 2, Spanish: 1, English: 1 },
    avgUniqueSkills: 5.75,
  };

  const roleDistribution = [
    { role: 'Leader', count: 4 },
    { role: 'Developer', count: 10 },
    { role: 'Designer', count: 4 },
    { role: 'Tester', count: 2 },
  ];

  const skillDistribution = [
    { skill: 'Python', count: 8 },
    { skill: 'React', count: 5 },
    { skill: 'Data Analysis', count: 7 },
    { skill: 'Team Management', count: 6 },
  ];

  const barChartData = {
    labels: Object.keys(overviewData.languageGroups),
    datasets: [
      {
        label: 'Language Groups',
        data: Object.values(overviewData.languageGroups),
        backgroundColor: ['#2596BE', '#FFCE56', '#FF6384'],
      },
    ],
  };

  const doughnutChartData = {
    labels: roleDistribution.map((role) => role.role),
    datasets: [
      {
        data: roleDistribution.map((role) => role.count),
        backgroundColor: ['#2596BE', '#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#1e7ca6', '#cc4b63', '#2a8dc8', '#e6b64e'],
      },
    ],
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#27272a' }}>
        Team Statistics
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={4} sx={{ marginBottom: '30px' }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#2596BE', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Total Teams
              </Typography>
              <Typography variant="h4">{overviewData.totalTeams}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#2596BE', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Algorithm Success Rate
              </Typography>
              <Typography variant="h4">{overviewData.algorithmSuccessRate}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#2596BE', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Avg Unique Skills
              </Typography>
              <Typography variant="h4">{overviewData.avgUniqueSkills.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} sx={{ marginBottom: '30px' }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#27272a' }}>
              Language Distribution
            </Typography>
            <Bar data={barChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#27272a' }}>
              Role Distribution
            </Typography>
            <Doughnut data={doughnutChartData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Skill Distribution */}
      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '30px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#27272a' }}>
          Skill Distribution
        </Typography>
        <Grid container spacing={2}>
          {skillDistribution.map((skill, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card sx={{ backgroundColor: '#fff' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ textAlign: 'center', color: '#27272a' }}>
                    {skill.skill}
                  </Typography>
                  <Typography variant="h4" sx={{ textAlign: 'center', color: '#2596BE' }}>
                    {skill.count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Statistics Table */}
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#27272a' }}>
          Detailed Team Statistics
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Team Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Performance</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Feedback</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Avg Skill</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Unique Skills</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Language</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoStatistics.map((stat, index) => (
              <TableRow key={index}>
                <TableCell>{stat.teamName}</TableCell>
                <TableCell>{stat.performance}</TableCell>
                <TableCell>{stat.feedback}</TableCell>
                <TableCell>{stat.created}</TableCell>
                <TableCell>{stat.size}</TableCell>
                <TableCell>{stat.avgSkill}</TableCell>
                <TableCell>{stat.uniqueSkills}</TableCell>
                <TableCell>{stat.language}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TeamStatistics;
