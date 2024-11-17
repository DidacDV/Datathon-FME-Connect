import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px', // Increased padding for a bigger navbar
        backgroundColor: '#ffffff',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better visibility
      }}
    >
      {/* Logo on the Left */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`${process.env.PUBLIC_URL}/aed-logo.png`}
          alt="AED Logo"
          style={{
            height: '80px', // Increased height for a bigger logo
            width: 'auto', // Maintain aspect ratio
            marginRight: '15px',
          }}
        />
        {/* <h1 style={{ color: '#2596BE', fontSize: '28px', margin: 0 }}>AED Platform</h1> */}
      </div>

      {/* Navigation Buttons on the Right */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#27272a',
              color: 'white',
              border: 'none',
              padding: '12px 20px', // Adjusted padding for larger buttons
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '18px', // Slightly larger font size
              fontWeight: 'bold',
            }}
          >
            Home
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
