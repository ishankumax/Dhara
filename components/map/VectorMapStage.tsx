'use client';

import React, { useState } from 'react';
import { Compass, ZoomIn, ZoomOut, Layers, Shield, DollarSign, Eye } from 'lucide-react';
import { CountryOverview } from '@/types';

interface VectorMapStageProps {
  countries: CountryOverview[];
  activeCountryId: string;
  compareCountryId: string | null;
  onSelectCountry: (id: string) => void;
}

export const VectorMapStage: React.FC<VectorMapStageProps> = ({
  countries,
  activeCountryId,
  compareCountryId,
  onSelectCountry,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<CountryOverview | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showProvinces, setShowProvinces] = useState<boolean>(true);

  // High-precision SVG path definitions for national boundaries
  const svgMapPaths: { id: string; name: string; path: string }[] = [
    {
      id: 'USA',
      name: 'United States',
      path: 'M 150 180 L 270 170 L 280 230 L 250 260 L 170 250 Z M 110 140 L 140 140 L 130 160 Z',
    },
    {
      id: 'CHN',
      name: 'China',
      path: 'M 650 200 L 760 190 L 780 260 L 710 290 L 640 250 Z',
    },
    {
      id: 'IND',
      name: 'India',
      path: 'M 610 260 L 660 250 L 670 320 L 630 350 L 600 290 Z',
    },
    {
      id: 'RUS',
      name: 'Russia',
      path: 'M 480 100 L 800 90 L 820 180 L 520 180 Z',
    },
    {
      id: 'GBR',
      name: 'United Kingdom',
      path: 'M 450 145 L 465 140 L 468 165 L 452 165 Z',
    },
    {
      id: 'FRA',
      name: 'France',
      path: 'M 460 175 L 490 170 L 495 200 L 465 205 Z',
    },
    {
      id: 'JPN',
      name: 'Japan',
      path: 'M 800 210 L 820 200 L 815 250 L 795 240 Z',
    },
    {
      id: 'DEU',
      name: 'Germany',
      path: 'M 490 155 L 515 155 L 515 180 L 490 180 Z',
    },
    {
      id: 'BRA',
      name: 'Brazil',
      path: 'M 300 320 L 370 310 L 380 410 L 310 400 Z',
    },
    {
      id: 'AUS',
      name: 'Australia',
      path: 'M 720 370 L 820 370 L 810 450 L 710 440 Z',
    },
    {
      id: 'CAN',
      name: 'Canada',
      path: 'M 140 80 L 290 70 L 280 160 L 150 160 Z',
    },
  ];

  // Sub-national / State / Province internal boundary lines
  const provinceBoundaryLines = [
    // USA Internal State Lines (Pacific, Midwest, East Coast)
    { d: 'M 190 175 L 190 255', countryId: 'USA', name: 'West Coast Div' },
    { d: 'M 230 172 L 230 258', countryId: 'USA', name: 'Midwest Div' },
    // China Internal Province Boundaries
    { d: 'M 690 195 L 690 275', countryId: 'CHN', name: 'Inner Provinces' },
    { d: 'M 730 192 L 730 270', countryId: 'CHN', name: 'Coastal Provinces' },
    // India Internal State Boundaries
    { d: 'M 635 255 L 635 335', countryId: 'IND', name: 'Deccan & Northern States' },
    // Russia Federal District Boundaries
    { d: 'M 580 95 L 580 180', countryId: 'RUS', name: 'Ural Federal Border' },
    { d: 'M 690 92 L 690 180', countryId: 'RUS', name: 'Siberian Federal Border' },
  ];

  const handleCountryHover = (id: string) => {
    const found = countries.find((c) => c.id === id);
    setHoveredCountry(found || null);
  };

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col h-full shadow-sm relative overflow-hidden">
      {/* Top Map Stage Toolbar */}
      <div className="flex items-center justify-between mb-2 z-10">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-[var(--accent-primary)] animate-spin-slow" />
          <h2 className="font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider">
            Interactive Strategic Geo-Stage
          </h2>
        </div>

        {/* Map Layers & Zoom Controls */}
        <div className="flex items-center space-x-2">
          {/* Sub-national Boundaries Layer Toggle */}
          <button
            onClick={() => setShowProvinces(!showProvinces)}
            title="Toggle State / Province Boundaries"
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs border transition-colors ${
              showProvinces
                ? 'bg-[var(--accent-muted)] text-[var(--accent-primary)] border-[var(--accent-primary)] font-semibold'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] border-[var(--border-color)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>State / Province Lines</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-[var(--bg-primary)] p-1 rounded-lg border border-[var(--border-color)]">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
              title="Zoom In"
              className="p-1 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              title="Reset View"
              className="px-1.5 py-0.5 text-[10px] font-mono rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              title="Zoom Out"
              className="p-1 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative flex-1 min-h-[360px] bg-[var(--bg-primary)] rounded-lg border border-[var(--border-color)] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle Map Grid lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <svg
          viewBox="0 0 950 500"
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Latitude / Longitude lines */}
          <line x1="0" y1="250" x2="950" y2="250" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4,4" />
          <line x1="475" y1="0" x2="475" y2="500" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4,4" />

          {/* Render SVG Country Paths */}
          {svgMapPaths.map((item) => {
            const isActive = item.id === activeCountryId;
            const isComparing = item.id === compareCountryId;

            return (
              <g key={item.id}>
                <path
                  d={item.path}
                  onClick={() => onSelectCountry(item.id)}
                  onMouseEnter={() => handleCountryHover(item.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className={`cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'fill-[var(--accent-primary)] stroke-white stroke-[2px] filter drop-shadow-md'
                      : isComparing
                      ? 'fill-amber-500 stroke-white stroke-[2px] filter drop-shadow-md'
                      : 'fill-[var(--bg-tertiary)] stroke-[var(--border-color)] hover:fill-[var(--accent-muted)] hover:stroke-[var(--accent-primary)]'
                  }`}
                />
                {/* Country Code Label */}
                <text
                  x={getPathCenterX(item.path)}
                  y={getPathCenterY(item.path)}
                  fill={isActive || isComparing ? '#FFFFFF' : 'var(--text-secondary)'}
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none select-none font-mono"
                >
                  {item.id}
                </text>
              </g>
            );
          })}

          {/* Render State / Province Boundaries Overlay when Enabled */}
          {showProvinces &&
            provinceBoundaryLines.map((line, idx) => (
              <path
                key={idx}
                d={line.d}
                stroke={
                  line.countryId === activeCountryId
                    ? '#FFFFFF'
                    : 'var(--text-muted)'
                }
                strokeWidth="1"
                strokeDasharray="2,2"
                className="pointer-events-none opacity-60"
              />
            ))}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredCountry && (
          <div className="absolute bottom-4 left-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3 rounded-lg shadow-xl z-20 min-w-[200px] backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <img
                src={hoveredCountry.flagUrl}
                alt={hoveredCountry.name}
                className="w-5 h-3.5 object-cover rounded border"
              />
              <span className="font-semibold text-xs text-[var(--text-primary)]">
                {hoveredCountry.name}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[var(--border-color)] text-[11px]">
              <div>
                <span className="text-[var(--text-muted)] block">Military Rank</span>
                <span className="font-mono font-bold text-[var(--accent-primary)]">
                  #{hoveredCountry.militaryRank}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">Nominal GDP</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  ${hoveredCountry.gdpNominalUsd}B
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-between mt-3 text-[11px] text-[var(--text-secondary)]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-[var(--accent-primary)] border border-white" />
            <span>Active Selection ({activeCountryId})</span>
          </div>
          {compareCountryId && (
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-500 border border-white" />
              <span>Comparison Target ({compareCountryId})</span>
            </div>
          )}
        </div>
        <span className="font-mono text-[var(--text-muted)]">
          {showProvinces ? 'State / Province Grid Active' : 'National Boundaries Only'}
        </span>
      </div>
    </div>
  );
};

// SVG Path center coordinate approximation helper
function getPathCenterX(path: string): number {
  const matches = path.match(/\d+/g);
  if (!matches) return 475;
  const numbers = matches.map(Number);
  const xCoords = numbers.filter((_, i) => i % 2 === 0);
  const sum = xCoords.reduce((a, b) => a + b, 0);
  return sum / (xCoords.length || 1);
}

function getPathCenterY(path: string): number {
  const matches = path.match(/\d+/g);
  if (!matches) return 250;
  const numbers = matches.map(Number);
  const yCoords = numbers.filter((_, i) => i % 2 === 1);
  const sum = yCoords.reduce((a, b) => a + b, 0);
  return sum / (yCoords.length || 1);
}
