import React, { useState, useEffect } from 'react';
import CompatibilityMap from '../components/CompatibilityMap';

const Map = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/participants/');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1 style={{ textAlign: 'center', margin: '10px 0', color: '#2596BE' }}>
        Compatibility Map
      </h1>
      {participants.length > 0 ? (
        <CompatibilityMap participants={participants} />
      ) : (
        <p style={{ textAlign: 'center', color: '#999' }}>Loading participants...</p>
      )}
    </div>
  );
};

export default Map;
