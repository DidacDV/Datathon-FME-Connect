import React from 'react';
import { ForceGraph2D } from 'react-force-graph';

const participants = [
  {
    id: 1,
    name: 'Alice',
    skills: ['JavaScript', 'React', 'Node.js'],
  },
  {
    id: 2,
    name: 'Bob',
    skills: ['Python', 'Machine Learning', 'AI'],
  },
  {
    id: 3,
    name: 'Charlie',
    skills: ['Data Analysis', 'SQL', 'Tableau'],
  },
];

// Graph data structure
const graphData = {
  nodes: participants.map((participant) => ({
    id: participant.id,
    name: participant.name,
  })),
  links: [
    { source: 1, target: 2, score: 90 }, // Alice -> Bob
    { source: 1, target: 3, score: 75 }, // Alice -> Charlie
    { source: 2, target: 3, score: 80 }, // Bob -> Charlie
  ],
};

const CompatibilityMap = () => {
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
        linkDirectionalArrowLength={5} // Adds arrows to links
        linkDirectionalArrowRelPos={1} // Arrow position
        linkLabel={(link) => `Compatibility: ${link.score}%`} // Link hover label
        onNodeClick={handleNodeClick} // Handle node click
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color || 'black';
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </div>
  );
};

export default CompatibilityMap;
