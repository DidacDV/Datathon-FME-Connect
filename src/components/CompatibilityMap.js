import React, { useEffect } from 'react';
import * as d3 from 'd3';

const CompatibilityMap = ({ data }) => {
  useEffect(() => {
    const svg = d3.select('#map').append('svg').attr('width', 800).attr('height', 600);

    const nodes = data.participants;
    const links = data.connections;

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).distance(100).strength(1).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(400, 300));

    const link = svg.append('g').selectAll('line')
      .data(links)
      .enter().append('line')
      .style('stroke', '#aaa');

    const node = svg.append('g').selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 20)
      .style('fill', '#69b3a2')
      .call(d3.drag());

    node.append('title').text(d => d.name);

    simulation.nodes(nodes).on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }, [data]);

  return <div id="map"></div>;
};

export default CompatibilityMap;
