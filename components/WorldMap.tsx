'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { motion } from 'framer-motion';

interface Destination {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  description: string;
  image?: string;
}

interface WorldMapProps {
  destinations?: Destination[];
  onDestinationClick?: (destination: Destination) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({
  destinations = [],
  onDestinationClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [worldData, setWorldData] = useState<any>(null);

  // Load world data
  useEffect(() => {
    fetch('/countries.geojson')
      .then(response => response.json())
      .then(data => {
        setWorldData(data);
      })
      .catch(error => {
        console.error('Error loading world data:', error);
      });
  }, []);

  useEffect(() => {
    if (!worldData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 1200;
    const height = 600;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create projection
    const projection = geoNaturalEarth1()
      .scale(160)
      .translate([width / 2, height / 2])
      .precision(0.1);

    // Create path generator
    const path = geoPath().projection(projection);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // Apply zoom to SVG
    svg.call(zoom);

    // Create main group
    const g = svg.append('g');

    // Draw countries
    g.selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', (d: any) => path(d) || '')
      .attr('fill', '#2d3748')
      .attr('stroke', '#4a5568')
      .attr('stroke-width', 0.5)
      .attr('class', 'country')
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#4a5568');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#2d3748');
      });

    // Add destination markers
    const markers = g.selectAll('.marker')
      .data(destinations)
      .enter()
      .append('g')
      .attr('class', 'marker')
      .attr('transform', d => {
        const [x, y] = projection(d.coordinates) || [0, 0];
        return `translate(${x}, ${y})`;
      });

    // Add circles for destinations
    markers.append('circle')
      .attr('r', 6)
      .attr('fill', '#e53e3e')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedDestination(d);
        onDestinationClick?.(d);
      })
      .on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 10);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6);
      });

    // Add destination labels
    markers.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -12)
      .attr('font-size', '12px')
      .attr('fill', '#ffffff')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => d.name);

  }, [worldData, destinations, onDestinationClick]);

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1200 600"
        className="w-full h-full"
      />

      {/* Destination Modal */}
      {selectedDestination && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-6 max-w-sm z-10"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {selectedDestination.name}
            </h3>
            <button
              onClick={() => setSelectedDestination(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-2">
            {selectedDestination.country}
          </p>

          <p className="text-gray-700 mb-4">
            {selectedDestination.description}
          </p>

          {selectedDestination.image && (
            <img
              src={selectedDestination.image}
              alt={selectedDestination.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
          )}

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Explorar Destino
          </button>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
        <p className="text-sm">
          🖱️ Haz clic y arrastra para mover el mapa<br/>
          🔄 Usa la rueda del mouse para hacer zoom<br/>
          📍 Haz clic en los marcadores rojos para ver destinos
        </p>
      </div>
    </div>
  );
};

export default WorldMap;