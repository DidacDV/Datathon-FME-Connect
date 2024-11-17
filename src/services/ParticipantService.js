const API_URL = 'http://127.0.0.1:8000/api/participants/';
export const fetchParticipants = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    return [];
  }
};

// Fetch a single participant by ID
export const fetchParticipantById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching participant:', error);
    return null;
  }
};

// Create a new participant
export const createParticipant = async (participantData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(participantData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating participant:', error);
    return null;
  }
};

// Update an existing participant
export const updateParticipant = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating participant:', error);
    return null;
  }
};

// Delete a participant
export const deleteParticipant = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error('Error deleting participant:', error);
    return false;
  }
};
