const API_URL = 'http://127.0.0.1:8000/api/participants/'; // Update with your backend's URL

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
