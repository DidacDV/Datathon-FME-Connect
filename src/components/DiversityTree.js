import React from 'react';
import Tree from 'react-d3-tree';

const DiversityTree = ({ team }) => {
  const data = {
    name: team.name,
    children: team.members.map((member) => ({
      name: member.name,
      attributes: {
        Role: member.role,
        Skills: member.skills.map((s) => s.name).join(', '),
      },
    })),
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Tree data={data} orientation="vertical" />
    </div>
  );
};

export default DiversityTree;
