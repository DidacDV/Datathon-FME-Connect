import React, { useState } from 'react';

const API_KMIN_URL = 'http://127.0.0.1:8000/api/teams/generate_teams_kmin/';
const API_MACHINE_URL = 'http://127.0.0.1:8000/api/teams/generate_teams_machine/';
// You can later implement the API call for generating teams inside this function
const generateTeamsHandler = async () => {
  try {
    // Placeholder for your API call
    console.log("Executing the algorithm to generate teams...");
    // Add your API call to generate teams here
    // For example: await fetch('/api/generate-teams', { method: 'POST' })
  } catch (error) {
    console.error("Error generating teams:", error);
  }
};

const GenerateTeams = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleGenerateTeamsKMin = async () => {
    setLoading(true);

    try {
        const response = await fetch(API_KMIN_URL, {
        method: 'POST',
        });
      // Execute the placeholder function to simulate generating teams


      if (!response.ok) {
        throw new Error('Failed to generate teams');
      }
      const data = await response.json();

      console.log('Response Message:', data.message);  // e.g., 'Teams generated successfully'
      console.log('Total Teams:', data.total_teams);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTeamsMachineLearning = async () => {
    setLoading(true);

    try {
        const response = await fetch(API_MACHINE_URL, {
        method: 'POST',
        });
      // Execute the placeholder function to simulate generating teams


      if (!response.ok) {
        throw new Error('Failed to generate teams');
      }
      const data = await response.json();

      console.log('Response Message:', data.message);  // e.g., 'Teams generated successfully'
      console.log('Total Teams:', data.total_teams);
    } finally {
      setLoading(false);

    }
  };

  return (

    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#2596BE', fontSize: '2.5rem', marginBottom: '20px' }}>
        Generate Teams
      </h1>
      <p style={{ color: '#555', marginBottom: '30px', fontSize: '1.2rem' }}>
        Click the button below to generate teams based on participant data.
      </p>

        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
            {/* Button to trigger team generation */}
            <button
                onClick={handleGenerateTeamsMachineLearning}
                style={{
                    backgroundColor: '#2596BE',
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '10px',
                    fontSize: '18px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                disabled={loading}
            >
                {loading ? 'Generating Teams...' : 'Calculate Machine Learning'}
            </button>

            {/* Button for navigating to Saved Teams page */}
            <button
                onClick={handleGenerateTeamsKMin}
                style={{
                    backgroundColor: '#2596BE',
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '10px',
                    fontSize: '18px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                disabled={loading}
            >
                {loading ? 'Generating Teams...' : 'Calculate KMin'}
            </button>
        </div>

        {/* Display response message after algorithm execution */}
        {responseMessage && (
            <div style={{marginTop: '20px', fontSize: '1.2rem', color: '#2596BE'}}>
                {responseMessage}
            </div>
        )}

    </div>
  );
};

export default GenerateTeams;
