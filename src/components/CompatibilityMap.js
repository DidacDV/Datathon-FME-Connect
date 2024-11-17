import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

// CompatibilityMap Component
const CompatibilityMap = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  // Fetch participants from the backend API
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/participants/'); // Update with your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch participants');
        }
        const participants = await response.json();

        // Map participants to nodes
        const nodes = participants.map((participant) => ({
          id: participant.id,
          name: participant.name,
          color: '#2596BE', // Default color for nodes
        }));

        // Randomly generate links with random compatibility scores
        const links = [];
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            links.push({
              source: nodes[i].id,
              target: nodes[j].id,
              score: Math.floor(Math.random() * 101), // Random score between 0-100
            });
          }
        }

        setGraphData({ nodes, links });
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  const handleNodeClick = (node) => {
    // Redirect to user profile page
    window.location.href = `/profile/${node.id}`;
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel={(node) => `${node.name}`}
        nodeAutoColorBy="id"
        linkDirectionalArrowLength={6} // Adds arrows to links
        linkDirectionalArrowRelPos={1} // Arrow position
        linkLabel={(link) => `Compatibility: ${link.score}%`} // Link hover label
        onNodeClick={handleNodeClick} // Handle node click
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = Math.max(14 / globalScale, 10); // Ensure font size remains legible
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000000'; // Node label color (black for better contrast)
          ctx.fillText(label, node.x, node.y - 12); // Position label slightly above the node

          // Draw circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false); // Slightly larger circle for better visuals
          ctx.fillStyle = node.color || '#2596BE'; // Node color
          ctx.fill();
          ctx.strokeStyle = '#ffffff'; // White border for better contrast
          ctx.lineWidth = 2; // Adjust border thickness
          ctx.stroke();
        }}
        linkWidth={(link) => link.score / 25} // Adjust link width based on score
        backgroundColor="#f5f5f5" // Background color
      />
    </div>
  );
};

export default CompatibilityMap;
