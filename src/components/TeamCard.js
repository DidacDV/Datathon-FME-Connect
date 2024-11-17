import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  IconButton,
  Divider,
  Tooltip,
  Link,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const TeamCard = ({ team, onUpdateTeam }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTeam, setEditableTeam] = useState({
    name: team.name,
    members: team.members ? team.members.map((member) => member.name) : [],
  });

  // Sync team data when 'team' prop changes (to ensure it's up-to-date)
  useEffect(() => {
    setEditableTeam({
      name: team.name,
      members: team.members ? team.members.map((member) => member.name) : [],
    });
  }, [team]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset changes on cancel
      setEditableTeam({
        name: team.name,
        members: team.members ? team.members.map((member) => member.name) : [],
      });
    }
  };

  const handleSave = async () => {
    // Prepare team data with the updated members list
    const updatedTeam = {
      ...editableTeam,
      members: editableTeam.members.map((memberName) => ({ name: memberName })),
    };

    try {
      // Make the API call to update the team
      const teamName = encodeURIComponent(editableTeam.name);
      const response = await fetch(`http://127.0.0.1:8000/api/teams/${teamName}/edit_team/`, {
        method: 'PUT', // Or 'PATCH' depending on your backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeam),
      });

      if (!response.ok) {
        throw new Error('Failed to update team');
      }

      const data = await response.json(); // Assuming backend returns updated team data

      // Call the onUpdateTeam callback to update the parent state
      onUpdateTeam(data);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating team:', error);
      // Optionally, show error feedback to the user
    }
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...editableTeam.members];
    updatedMembers[index] = value;
    setEditableTeam({ ...editableTeam, members: updatedMembers });
  };

  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardContent sx={{ padding: '25px' }}>
        {/* Team Name */}
        {isEditing ? (
          <TextField
            label="Team Name"
            value={editableTeam.name}
            onChange={(e) => setEditableTeam({ ...editableTeam, name: e.target.value })}
            fullWidth
            sx={{
              marginBottom: '20px',
              input: {
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#27272a',
              },
            }}
          />
        ) : (
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 'bold',
              color: '#27272a',
              marginBottom: '20px',
              textTransform: 'capitalize',
            }}
          >
            {editableTeam.name}
          </Typography>
        )}

        <Divider sx={{ marginBottom: '20px' }} />

        {/* Members List */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: '#333', marginBottom: '15px' }}
        >
          Team Members
        </Typography>
        <List disablePadding>
          {editableTeam.members.map((member, index) => (
            <ListItem
              key={index}
              sx={{
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {isEditing ? (
                <TextField
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.9rem',
                    },
                  }}
                />
              ) : (
                <ListItemText
                  primary={
                    <Link
                      href={`/profile/${member.toLowerCase().replace(' ', '-')}`}
                      underline="hover"
                      sx={{
                        fontSize: '0.95rem',
                        color: '#27272a', // Dark blue color
                        fontWeight: 'bold',
                        '&:hover': {
                          textDecoration: 'none',
                          color: '#494949', // Slightly lighter hover color
                        },
                      }}
                    >
                      {member}
                    </Link>
                  }
                />
              )}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#2596BE',
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#1e7ca6',
                  },
                }}
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#ff4d4d',
                  color: '#ff4d4d',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#ffe6e6',
                    borderColor: '#ff3333',
                  },
                }}
                startIcon={<CancelIcon />}
                onClick={handleEditToggle}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Tooltip title="Edit Team" arrow>
              <IconButton
                sx={{
                  backgroundColor: '#f0f0f0',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
                onClick={handleEditToggle}
              >
                <EditIcon sx={{ color: '#2596BE' }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
