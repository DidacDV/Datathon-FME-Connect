import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    skills: ['React', 'Node.js', 'Python'],
    goals: 'Learn new technologies and network.',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card style={{ maxWidth: 600, width: '90%', borderRadius: 10, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#2596BE', fontWeight: 'bold' }}>
            Profile
          </Typography>

          {!isEditing ? (
            <Box>
              {/* Display Profile Details */}
              <Typography variant="h6" gutterBottom>
                <strong>Name:</strong> {profile.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Email:</strong> {profile.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Skills:</strong> {profile.skills.join(', ')}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Goals:</strong> {profile.goals}
              </Typography>

              {/* Edit Button */}
              <Box mt={2} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  style={{ textTransform: 'none' }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          ) : (
            <form onSubmit={handleSave}>
              {/* Edit Fields */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Skills (comma-separated)"
                  name="skills"
                  value={profile.skills.join(', ')}
                  onChange={(e) => {
                    const skillsArray = e.target.value.split(',').map((s) => s.trim());
                    setProfile((prevProfile) => ({ ...prevProfile, skills: skillsArray }));
                  }}
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Goals"
                  name="goals"
                  value={profile.goals}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Box>

              {/* Save Button */}
              <Box textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  style={{ marginRight: 10, textTransform: 'none' }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleEdit}
                  style={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Profile;
