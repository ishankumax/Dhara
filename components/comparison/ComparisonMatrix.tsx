'use client';

import React from 'react';
import { X, Shield, Briefcase, Plane, Anchor, Users, Trophy, TrendingUp } from 'lucide-react';
import { CountryIntelProfile } from '@/types';

interface ComparisonMatrixProps {
  countryA: CountryIntelProfile | null;
  countryB: CountryIntelProfile | null;
  onClose: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  countryA,
  countryB,
  onClose,
}) => {
  if (!countryA || !countryB) {
    return (
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-8 text-center text-[var(--text-muted)]">
        Select two countries to load side-by-side intelligence matrix.
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 shadow-xl flex flex-col h-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-[var(--accent-primary)] animate-pulse" />
          <h2 className="font-serif font-bold text-base text-[var(--text-primary)]">
            Side-by-Side Strategic Intel Matrix (4:4 Grid Split)
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Country Headers (4:4 Split Columns) */}
      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[var(--border-color)] mb-4">
        {/* Country A */}
        <div className="flex items-center space-x-3 bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--accent-primary)]">
          <img src={countryA.flagUrl} alt={countryA.name} className="w-10 h-7 object-cover rounded border" />
          <div>
            <h3 className="font-serif font-bold text-sm text-[var(--text-primary)]">{countryA.name}</h3>
            <span className="text-[11px] font-mono text-[var(--accent-primary)] font-semibold">
              Military Rank #{countryA.militaryRank}
            </span>
          </div>
        </div>

        {/* Country B */}
        <div className="flex items-center space-x-3 bg-[var(--bg-primary)] p-3 rounded-lg border border-amber-500">
          <img src={countryB.flagUrl} alt={countryB.name} className="w-10 h-7 object-cover rounded border" />
          <div>
            <h3 className="font-serif font-bold text-sm text-[var(--text-primary)]">{countryB.name}</h3>
            <span className="text-[11px] font-mono text-amber-500 font-semibold">
              Military Rank #{countryB.militaryRank}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Metric Rows */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[500px]">
        {/* Defense Budget & Economic Comparison */}
        <SectionHeader title="Economic & Defense Investment" icon={Briefcase} />
        <CompareRow
          label="Defense Budget (USD)"
          valA={`$${countryA.defenseBudgetUsd} Billion`}
          valB={`$${countryB.defenseBudgetUsd} Billion`}
          winner={countryA.defenseBudgetUsd > countryB.defenseBudgetUsd ? 'A' : 'B'}
        />
        <CompareRow
          label="Nominal GDP (USD)"
          valA={`$${countryA.gdpNominalUsd} Billion`}
          valB={`$${countryB.gdpNominalUsd} Billion`}
          winner={countryA.gdpNominalUsd > countryB.gdpNominalUsd ? 'A' : 'B'}
        />

        {/* Aviation Fleet */}
        <SectionHeader title="Air Force Fleet Strength" icon={Plane} />
        <CompareRow
          label="Total Military Aircraft"
          valA={countryA.military.aircraft.totalFleet.toLocaleString()}
          valB={countryB.military.aircraft.totalFleet.toLocaleString()}
          winner={countryA.military.aircraft.totalFleet > countryB.military.aircraft.totalFleet ? 'A' : 'B'}
        />
        <CompareRow
          label="Fighter Jets"
          valA={countryA.military.aircraft.fighters.toLocaleString()}
          valB={countryB.military.aircraft.fighters.toLocaleString()}
          winner={countryA.military.aircraft.fighters > countryB.military.aircraft.fighters ? 'A' : 'B'}
        />

        {/* Naval Power */}
        <SectionHeader title="Naval Fleet Capabilities" icon={Anchor} />
        <CompareRow
          label="Aircraft Carriers"
          valA={countryA.military.navalForces.aircraftCarriers.toString()}
          valB={countryB.military.navalForces.aircraftCarriers.toString()}
          winner={countryA.military.navalForces.aircraftCarriers > countryB.military.navalForces.aircraftCarriers ? 'A' : 'B'}
        />
        <CompareRow
          label="Submarine Fleet"
          valA={countryA.military.navalForces.submarines.toString()}
          valB={countryB.military.navalForces.submarines.toString()}
          winner={countryA.military.navalForces.submarines > countryB.military.navalForces.submarines ? 'A' : 'B'}
        />

        {/* Personnel */}
        <SectionHeader title="Military Manpower" icon={Users} />
        <CompareRow
          label="Active Duty Personnel"
          valA={countryA.military.personnel.activeDuty.toLocaleString()}
          valB={countryB.military.personnel.activeDuty.toLocaleString()}
          winner={countryA.military.personnel.activeDuty > countryB.military.personnel.activeDuty ? 'A' : 'B'}
        />
      </div>
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="flex items-center space-x-2 pt-2 border-t border-[var(--border-color)]">
    <Icon className="w-4 h-4 text-[var(--accent-primary)]" />
    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
      {title}
    </span>
  </div>
);

const CompareRow = ({
  label,
  valA,
  valB,
  winner,
}: {
  label: string;
  valA: string;
  valB: string;
  winner: 'A' | 'B';
}) => (
  <div className="grid grid-cols-2 gap-4 bg-[var(--bg-primary)] p-2.5 rounded-lg border border-[var(--border-color)] text-xs font-mono">
    <div className="flex items-center justify-between pr-2">
      <span className="text-[var(--text-muted)] text-[10px] block truncate">{label}</span>
      <span className={`font-bold ${winner === 'A' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>
        {valA} {winner === 'A' && '★'}
      </span>
    </div>
    <div className="flex items-center justify-between pl-2 border-l border-[var(--border-color)]">
      <span className={`font-bold ${winner === 'B' ? 'text-amber-500' : 'text-[var(--text-primary)]'}`}>
        {winner === 'B' && '★ '} {valB}
      </span>
      <span className="text-[var(--text-muted)] text-[10px] block truncate">{label}</span>
    </div>
  </div>
);
