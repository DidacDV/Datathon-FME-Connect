import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#ffffff',
        color: 'white',
      }}
    >
      {/* Logo on the Left */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`${process.env.PUBLIC_URL}/aed-logo.png`}
          alt="AED Logo"
          style={{
            height: '50px', // Ensure the logo height is appropriate
            width: 'auto', // Maintain aspect ratio
            marginRight: '10px',
          }}
        />
      </div>

      {/* Title in the Center */}
      <h2 style={{ color: 'black', fontSize: '24px', margin: 0, textAlign: 'center' }}>
      </h2>

      {/* Navigation Buttons on the Right */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#2596BE',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
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
