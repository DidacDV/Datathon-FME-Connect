import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#2596BE', fontSize: '2.5rem', marginBottom: '20px' }}>
        Datathon Organizer Dashboard
      </h1>
      <p style={{ color: '#555', marginBottom: '30px', fontSize: '1.2rem' }}>
        Manage participants, generate teams, and view compatibility data.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link to="/participants">
          <button
            style={{
              backgroundColor: '#2596BE',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Manage Participants
          </button>
        </Link>
        <Link to="/teams">
          <button
            style={{
              backgroundColor: '#2596BE',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Generate Teams
          </button>
        </Link>
        <Link to="/map">
          <button
            style={{
              backgroundColor: '#2596BE',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Compatibility Map
          </button>
        </Link>
        <Link to="/saved-teams">
          <button
            style={{
              backgroundColor: '#2596BE',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Saved Teams
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
