import React, { useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const TeamCard = ({ team, onUpdateTeam }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTeam, setEditableTeam] = useState({ ...team });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) setEditableTeam({ ...team }); // Reset changes on cancel
  };

  const handleSave = () => {
    onUpdateTeam(editableTeam);
    setIsEditing(false);
  };

  const handleChange = (index, value) => {
    const updatedMembers = [...editableTeam.members];
    updatedMembers[index] = value;
    setEditableTeam({ ...editableTeam, members: updatedMembers });
  };

  return (
    <Card
      sx={{
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        marginBottom: '20px',
      }}
    >
      <CardContent>
        {/* Team Name */}
        {isEditing ? (
          <TextField
            label="Team Name"
            value={editableTeam.name}
            onChange={(e) => setEditableTeam({ ...editableTeam, name: e.target.value })}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
        ) : (
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#2596BE' }}
          >
            {team.name}
          </Typography>
        )}

        {/* Members List */}
        <Typography variant="h6" gutterBottom>
          Members:
        </Typography>
        <List>
          {editableTeam.members.map((member, index) => (
            <ListItem key={index} sx={{ padding: '5px 0' }}>
              {isEditing ? (
                <TextField
                  value={member}
                  onChange={(e) => handleChange(index, e.target.value)}
                  fullWidth
                />
              ) : (
                <ListItemText primary={member} />
              )}
            </ListItem>
          ))}
        </List>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <IconButton color="primary" onClick={handleEditToggle}>
              <EditIcon />
            </IconButton>
          )}
          {isEditing && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEditToggle}
            >
              Cancel
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
