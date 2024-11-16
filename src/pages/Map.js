import React from 'react';
import CompatibilityMap from '../components/CompatibilityMap';

const Map = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1 style={{ textAlign: 'center', margin: '10px 0', color: '#2596BE' }}>
        Compatibility Map
      </h1>
      <CompatibilityMap />
    </div>
  );
};

export default Map;
