'use client';

import React from 'react';
import { X, Shield, DollarSign, Users, Zap, Anchor } from 'lucide-react';
import { CountryIntelProfile } from '@/types';

interface ComparisonMatrixProps {
  countryA: CountryIntelProfile;
  countryB: CountryIntelProfile;
  onClose: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  countryA,
  countryB,
  onClose,
}) => {
  const comparisonRows = [
    {
      label: 'Global Military Rank',
      valueA: `#${countryA.militaryRank}`,
      valueB: `#${countryB.militaryRank}`,
      better: countryA.militaryRank < countryB.militaryRank ? 'A' : 'B',
      icon: Shield,
    },
    {
      label: 'Nominal GDP',
      valueA: `$${countryA.gdpNominalUsd}B`,
      valueB: `$${countryB.gdpNominalUsd}B`,
      better: countryA.gdpNominalUsd > countryB.gdpNominalUsd ? 'A' : 'B',
      icon: DollarSign,
    },
    {
      label: 'Defense Budget',
      valueA: `$${countryA.defenseBudgetUsd}B`,
      valueB: `$${countryB.defenseBudgetUsd}B`,
      better: countryA.defenseBudgetUsd > countryB.defenseBudgetUsd ? 'A' : 'B',
      icon: Zap,
    },
    {
      label: 'Active Military Personnel',
      valueA: countryA.military?.personnel?.activeDuty ? countryA.military.personnel.activeDuty.toLocaleString() : 'N/A',
      valueB: countryB.military?.personnel?.activeDuty ? countryB.military.personnel.activeDuty.toLocaleString() : 'N/A',
      better: (countryA.military?.personnel?.activeDuty || 0) > (countryB.military?.personnel?.activeDuty || 0) ? 'A' : 'B',
      icon: Users,
    },
    {
      label: 'Combat Aircraft',
      valueA: countryA.military?.aircraft?.totalFleet ? countryA.military.aircraft.totalFleet.toLocaleString() : 'N/A',
      valueB: countryB.military?.aircraft?.totalFleet ? countryB.military.aircraft.totalFleet.toLocaleString() : 'N/A',
      better: (countryA.military?.aircraft?.totalFleet || 0) > (countryB.military?.aircraft?.totalFleet || 0) ? 'A' : 'B',
      icon: Zap,
    },
    {
      label: 'Naval Fleet Total',
      valueA: countryA.military?.navalForces?.totalAssets ? countryA.military.navalForces.totalAssets.toLocaleString() : 'N/A',
      valueB: countryB.military?.navalForces?.totalAssets ? countryB.military.navalForces.totalAssets.toLocaleString() : 'N/A',
      better: (countryA.military?.navalForces?.totalAssets || 0) > (countryB.military?.navalForces?.totalAssets || 0) ? 'A' : 'B',
      icon: Anchor,
    },
  ];

  return (
    <div className="bg-transparent border-none p-2 flex flex-col h-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-widest flex items-center space-x-2">
          <Shield className="w-4 h-4 text-amber-500" />
          <span>Side-by-Side Bilateral Comparison Matrix</span>
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 4:4 Dual Country Profile Header */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Country A Header */}
        <div className="bg-[var(--bg-secondary)]/40 p-4 rounded-2xl flex items-center space-x-4 border border-[var(--accent-primary)]/30">
          <img
            src={countryA.flagUrl}
            alt={countryA.name}
            className="w-12 h-8 object-cover rounded shadow-md"
          />
          <div>
            <h3 className="font-bold text-base text-[var(--text-primary)]">{countryA.name}</h3>
            <p className="text-xs text-[var(--text-secondary)]">Rank #{countryA.militaryRank} • ${countryA.gdpNominalUsd}B GDP</p>
          </div>
        </div>

        {/* Country B Header */}
        <div className="bg-[var(--bg-secondary)]/40 p-4 rounded-2xl flex items-center space-x-4 border border-amber-500/30">
          <img
            src={countryB.flagUrl}
            alt={countryB.name}
            className="w-12 h-8 object-cover rounded shadow-md"
          />
          <div>
            <h3 className="font-bold text-base text-[var(--text-primary)]">{countryB.name}</h3>
            <p className="text-xs text-[var(--text-secondary)]">Rank #{countryB.militaryRank} • ${countryB.gdpNominalUsd}B GDP</p>
          </div>
        </div>
      </div>

      {/* Matrix Comparison Table */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {comparisonRows.map((row, idx) => {
          const Icon = row.icon;
          return (
            <div
              key={idx}
              className="bg-[var(--bg-secondary)]/30 p-3 rounded-xl grid grid-cols-3 items-center text-xs"
            >
              {/* Country A Metric */}
              <div
                className={`font-mono text-center font-bold ${
                  row.better === 'A' ? 'text-[var(--accent-primary)] font-extrabold text-sm' : 'text-[var(--text-secondary)]'
                }`}
              >
                {row.valueA}
              </div>

              {/* Metric Label */}
              <div className="flex items-center justify-center space-x-2 text-center text-[var(--text-primary)] font-medium">
                <Icon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{row.label}</span>
              </div>

              {/* Country B Metric */}
              <div
                className={`font-mono text-center font-bold ${
                  row.better === 'B' ? 'text-amber-500 font-extrabold text-sm' : 'text-[var(--text-secondary)]'
                }`}
              >
                {row.valueB}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
