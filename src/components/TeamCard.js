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
    name: team?.name || '',
    members: team?.members || [],
  });

  // Sync team data when `team` prop changes
  useEffect(() => {
    setEditableTeam({
      name: team?.name || '',
      members: team?.members || [],
    });
  }, [team]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset changes on cancel
      setEditableTeam({
        name: team?.name || '',
        members: team?.members || [],
      });
    }
  };

  const handleSave = async () => {
    const updatedTeam = {
      ...editableTeam,
      members: editableTeam.members.map((member) =>
        typeof member === 'string' ? { name: member } : member
      ),
    };

    try {
      const teamName = encodeURIComponent(editableTeam.name);
      const response = await fetch(`http://127.0.0.1:8000/api/teams/${teamName}/edit_team/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeam),
      });

      if (!response.ok) {
        throw new Error('Failed to update team');
      }

      const data = await response.json();
      onUpdateTeam(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...editableTeam.members];
    if (typeof updatedMembers[index] === 'string') {
      updatedMembers[index] = value;
    } else {
      updatedMembers[index].name = value;
    }
    setEditableTeam({ ...editableTeam, members: updatedMembers });
  };

  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
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
            sx={{ marginBottom: '20px', input: { fontWeight: 'bold', fontSize: '1.25rem' } }}
          />
        ) : (
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 'bold', color: '#27272a', marginBottom: '20px' }}
          >
            {editableTeam.name || 'Unnamed Team'}
          </Typography>
        )}

        <Divider sx={{ marginBottom: '20px' }} />

        {/* Members List */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
          Team Members
        </Typography>
        <List disablePadding>
          {editableTeam.members.map((member, index) => (
            <ListItem key={index} sx={{ padding: '8px 0' }}>
              {isEditing ? (
                <TextField
                  value={typeof member === 'string' ? member : member.name || ''}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              ) : (
                <ListItemText
                  primary={
                    member?.name || typeof member === 'string' ? (
                      <Link
                        href={`/profile/${
                          (member.name || member)
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                        }`}
                        underline="hover"
                        sx={{
                          fontWeight: 'bold',
                          '&:hover': { color: '#494949' },
                        }}
                      >
                        {member.name || member}
                      </Link>
                    ) : (
                      'Unnamed Member'
                    )
                  }
                />
              )}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#2596BE', color: '#fff', '&:hover': { backgroundColor: '#1e7ca6' } }}
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: '#ff4d4d', color: '#ff4d4d', '&:hover': { backgroundColor: '#ffe6e6' } }}
                startIcon={<CancelIcon />}
                onClick={handleEditToggle}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Tooltip title="Edit Team" arrow>
              <IconButton
                sx={{ backgroundColor: '#f0f0f0', '&:hover': { backgroundColor: '#e0e0e0' } }}
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
