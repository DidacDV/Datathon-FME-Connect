import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center', // Vertically center content
        justifyContent: 'space-between',
        padding: '20px 40px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better visibility
        position: 'relative',
      }}
    >
      {/* Logo in the Left Corner */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`${process.env.PUBLIC_URL}/aed-logo.png`}
          alt="AED Logo"
          style={{
            height: '80px',
            width: 'auto',
          }}
        />
      </div>

      {/* Title in the Center */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)', // Center text horizontally
        }}
      >
        <h1
          style={{
            color: '#2596BE',
            fontSize: '28px',
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          Datathon FME Connect
        </h1>
      </div>

      {/* Navigation Buttons aligned to the right */}
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#2596BE',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '18px',
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
