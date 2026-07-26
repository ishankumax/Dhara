'use client';

import React, { useState } from 'react';
import { Compass, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { CountryOverview } from '@/types';

interface VectorMapStageProps {
  countries: CountryOverview[];
  activeCountryId: string;
  onSelectCountry: (id: string) => void;
}

export const VectorMapStage: React.FC<VectorMapStageProps> = ({
  countries,
  activeCountryId,
  onSelectCountry,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBoundaries, setShowBoundaries] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // SVG Geo Path Map Nodes
  const countryPathNodes: Record<
    string,
    { d: string; label: string; cx: number; cy: number; boundaries?: string[] }
  > = {
    USA: {
      d: 'M 150 180 L 270 180 L 260 270 L 140 260 Z M 110 110 L 140 110 L 130 140 L 100 140 Z',
      label: 'USA',
      cx: 200,
      cy: 220,
      boundaries: [
        'M 150 180 L 210 180 L 210 265',
        'M 210 180 L 270 180',
        'M 180 220 L 260 220',
      ],
    },
    CHN: {
      d: 'M 650 190 L 760 170 L 780 270 L 680 290 L 620 250 Z',
      label: 'CHN',
      cx: 700,
      cy: 230,
      boundaries: [
        'M 650 190 L 710 230 L 780 270',
        'M 700 175 L 700 285',
        'M 630 250 L 750 250',
      ],
    },
    IND: {
      d: 'M 590 280 L 660 260 L 670 360 L 610 390 Z',
      label: 'IND',
      cx: 630,
      cy: 320,
      boundaries: [
        'M 590 280 L 630 330 L 670 360',
        'M 610 320 L 660 320',
        'M 630 330 L 610 390',
      ],
    },
    RUS: {
      d: 'M 520 80 L 800 70 L 830 170 L 510 160 Z',
      label: 'RUS',
      cx: 660,
      cy: 110,
      boundaries: [
        'M 520 80 L 660 80 L 660 165',
        'M 660 80 L 800 70',
        'M 590 120 L 760 120',
      ],
    },
    GBR: {
      d: 'M 450 150 L 470 140 L 475 180 L 455 185 Z',
      label: 'GBR',
      cx: 460,
      cy: 160,
      boundaries: ['M 450 150 L 475 180'],
    },
    FRA: {
      d: 'M 460 190 L 500 185 L 505 230 L 465 235 Z',
      label: 'FRA',
      cx: 480,
      cy: 210,
      boundaries: ['M 460 190 L 505 230', 'M 480 187 L 480 232'],
    },
    JPN: {
      d: 'M 810 200 L 830 190 L 835 240 L 815 250 Z',
      label: 'JPN',
      cx: 820,
      cy: 220,
      boundaries: ['M 810 200 L 835 240'],
    },
    CAN: {
      d: 'M 130 70 L 290 60 L 280 170 L 140 170 Z',
      label: 'CAN',
      cx: 210,
      cy: 115,
      boundaries: [
        'M 130 70 L 210 115 L 280 170',
        'M 210 65 L 210 170',
      ],
    },
    AUS: {
      d: 'M 740 370 L 840 360 L 830 460 L 730 450 Z',
      label: 'AUS',
      cx: 780,
      cy: 410,
      boundaries: [
        'M 740 370 L 780 410 L 830 460',
        'M 780 365 L 780 455',
      ],
    },
    BRA: {
      d: 'M 280 320 L 370 310 L 360 440 L 270 410 Z',
      label: 'BRA',
      cx: 320,
      cy: 370,
      boundaries: [
        'M 280 320 L 320 370 L 360 440',
        'M 320 315 L 320 425',
      ],
    },
  };

  const activeCountry = countries.find((c) => c.id === activeCountryId);

  return (
    <div className="bg-transparent border-none p-2 flex flex-col h-full relative">
      {/* Header Controls Overlay */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-[var(--accent-primary)] animate-spin-slow" />
          <h2 className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-widest">
            Interactive Strategic Geo-Stage
          </h2>
        </div>

        {/* Map Control Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowBoundaries(!showBoundaries)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              showBoundaries
                ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                : 'bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>State / Province Lines</span>
          </button>

          <div className="flex items-center bg-[var(--bg-secondary)]/50 border border-[var(--border-color)]/30 rounded-lg p-0.5 backdrop-blur-sm">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-[var(--text-muted)] px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            {zoomLevel !== 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 text-[var(--accent-primary)] hover:opacity-80 transition-opacity"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Vector SVG Canvas Container */}
      <div className="flex-1 bg-[var(--bg-secondary)]/30 border-none rounded-2xl overflow-hidden relative flex items-center justify-center p-2 backdrop-blur-xs">
        {/* Subtle Map Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--border-color)_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <svg
          viewBox="0 0 950 500"
          className="w-full h-full max-h-[550px] transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Render All Country Vector Paths */}
          {Object.entries(countryPathNodes).map(([id, node]) => {
            const isActive = id === activeCountryId;

            return (
              <g key={id}>
                {/* Main Territory Polygon */}
                <path
                  d={node.d}
                  onClick={() => onSelectCountry(id)}
                  onMouseEnter={() => setHoveredCountry(id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className={`cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'fill-[var(--accent-primary)] stroke-white stroke-[2px] filter drop-shadow-md'
                      : hoveredCountry === id
                      ? 'fill-[var(--accent-hover)]/70 stroke-[var(--accent-primary)] stroke-1'
                      : 'fill-[var(--bg-tertiary)]/70 stroke-[var(--border-color)]/50 stroke-1 hover:fill-[var(--bg-tertiary)]'
                  }`}
                />

                {/* Sub-National State / Province Boundaries Layer Overlay */}
                {showBoundaries && node.boundaries && (
                  <g className="pointer-events-none opacity-60">
                    {node.boundaries.map((bPath, idx) => (
                      <path
                        key={idx}
                        d={bPath}
                        className="stroke-[var(--text-muted)] stroke-[0.75px] stroke-dasharray-[2_2]"
                        fill="none"
                      />
                    ))}
                  </g>
                )}

                {/* Country Code Label */}
                <text
                  x={node.cx}
                  y={node.cy}
                  onClick={() => onSelectCountry(id)}
                  className={`cursor-pointer text-[10px] font-mono font-bold pointer-events-none transition-all ${
                    isActive
                      ? 'fill-white font-extrabold text-[12px]'
                      : 'fill-[var(--text-muted)] group-hover:fill-[var(--text-primary)]'
                  }`}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Active Selection Badge (Bottom Left Overlay) */}
        {activeCountry && (
          <div className="absolute bottom-3 left-3 bg-[var(--bg-secondary)]/90 border border-[var(--border-color)]/40 rounded-xl px-3 py-1.5 backdrop-blur-md shadow-md flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <div className="text-[11px] font-mono text-[var(--text-primary)]">
              Active Selection: <span className="font-bold text-[var(--accent-primary)]">{activeCountry.name} ({activeCountry.id})</span>
            </div>
          </div>
        )}

        {/* Legend Indicator */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)]/80 px-2 py-1 rounded-md backdrop-blur-xs">
          {showBoundaries ? 'Sub-National Overlay Active' : 'National Boundaries Only'}
        </div>
      </div>
    </div>
  );
};
