'use client';

import React, { useState } from 'react';
import {
  Shield,
  Briefcase,
  Globe,
  Plane,
  Anchor,
  Users,
  TrendingUp,
  FileText,
  ArrowRightLeft,
  Info,
} from 'lucide-react';
import { CountryIntelProfile } from '@/types';

interface CountryIntelViewProps {
  country: CountryIntelProfile | null;
  onSetCompareTarget: (id: string) => void;
  isComparing: boolean;
}

export const CountryIntelView: React.FC<CountryIntelViewProps> = ({
  country,
  onSetCompareTarget,
  isComparing,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'military' | 'economy' | 'alliances'>('overview');

  if (!country) {
    return (
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-8 flex flex-col items-center justify-center text-center h-full text-[var(--text-muted)]">
        <Info className="w-8 h-8 mb-2 animate-bounce" />
        <p className="text-xs font-mono">Select a nation from the index or map to load intelligence profile.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'military', label: 'Military', icon: Shield },
    { id: 'economy', label: 'Economy', icon: Briefcase },
    { id: 'alliances', label: 'Alliances', icon: Globe },
  ];

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col h-full shadow-sm">
      {/* Country Intel Profile Header */}
      <div className="flex items-start justify-between pb-3 border-b border-[var(--border-color)] mb-3">
        <div className="flex items-center space-x-3 min-w-0">
          <img
            src={country.flagUrl}
            alt={country.name}
            className="w-10 h-7 object-cover rounded border border-[var(--border-color)] shadow-xs flex-shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="font-serif font-bold text-base text-[var(--text-primary)] truncate">
                {country.name}
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                {country.id}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] truncate">{country.officialName}</p>
          </div>
        </div>

        {/* Compare Trigger Button */}
        <button
          onClick={() => onSetCompareTarget(country.id)}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-medium border transition-colors ${
            isComparing
              ? 'bg-amber-500 text-white border-amber-500 font-semibold'
              : 'bg-[var(--accent-muted)] text-[var(--accent-primary)] border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>{isComparing ? 'Comparing Target' : 'Compare'}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 mb-4 border-b border-[var(--border-color)] pb-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[500px]">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                Strategic Intelligence Executive Brief
              </span>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">{country.summary}</p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
              <MetricBox label="Global Military Power" value={`#${country.militaryRank}`} icon={Shield} />
              <MetricBox label="Nominal GDP" value={`$${country.gdpNominalUsd}B`} icon={Briefcase} />
              <MetricBox label="Defense Budget" value={`$${country.defenseBudgetUsd}B`} icon={TrendingUp} />
              <MetricBox
                label="Population"
                value={`${(country.population / 1e6).toFixed(1)}M`}
                icon={Users}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Military Capabilities */}
        {activeTab === 'military' && (
          <div className="space-y-4">
            {/* Aviation & Air Force */}
            <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-primary)] mb-2">
                <Plane className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Air Force & Aviation Strength</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <StatItem label="Total Aircraft" value={country.military.aircraft.totalFleet.toLocaleString()} />
                <StatItem label="Fighter Jets" value={country.military.aircraft.fighters.toLocaleString()} />
                <StatItem label="Attack Helicopters" value={country.military.aircraft.attackHelicopters.toLocaleString()} />
              </div>
            </div>

            {/* Land & Armor Forces */}
            <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-primary)] mb-2">
                <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Armor & Ground Capabilities</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <StatItem label="Tanks" value={country.military.landForces.tanks.toLocaleString()} />
                <StatItem label="Armored Vehicles" value={country.military.landForces.armoredVehicles.toLocaleString()} />
                <StatItem label="Artillery Units" value={country.military.landForces.artillery.toLocaleString()} />
              </div>
            </div>

            {/* Naval & Fleet Power */}
            <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-primary)] mb-2">
                <Anchor className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Naval Fleet Strength</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <StatItem label="Total Ships" value={country.military.navalForces.totalAssets.toLocaleString()} />
                <StatItem label="Aircraft Carriers" value={country.military.navalForces.aircraftCarriers.toLocaleString()} />
                <StatItem label="Submarines" value={country.military.navalForces.submarines.toLocaleString()} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Economic Metrics */}
        {activeTab === 'economy' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <MetricBox label="GDP Growth Rate" value={`${country.economy.gdpGrowthRatePercent}%`} icon={TrendingUp} />
              <MetricBox label="GDP Per Capita" value={`$${country.gdpPerCapitaUsd.toLocaleString()}`} icon={Briefcase} />
            </div>

            <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)] space-y-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block">
                Top National Export Categories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {country.economy.topExports.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] bg-[var(--accent-muted)] text-[var(--accent-primary)] border border-[var(--accent-primary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Alliances & Treaties */}
        {activeTab === 'alliances' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                Primary Security & Geo-Bloc
              </span>
              <span className="text-sm font-semibold text-[var(--accent-primary)]">
                {country.alliances.primaryBlock}
              </span>
            </div>

            <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-2">
                Active International Treaties & Alliances
              </span>
              <div className="space-y-1.5">
                {country.alliances.alliances.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-xs text-[var(--text-primary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper metric box component
const MetricBox = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
  <div className="bg-[var(--bg-primary)] p-2.5 rounded-lg border border-[var(--border-color)] flex items-center space-x-2.5">
    <div className="p-2 rounded bg-[var(--accent-muted)] text-[var(--accent-primary)]">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{label}</span>
      <span className="font-mono font-bold text-xs text-[var(--text-primary)]">{value}</span>
    </div>
  </div>
);

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[var(--bg-secondary)] p-2 rounded border border-[var(--border-color)]">
    <span className="text-[10px] text-[var(--text-muted)] block truncate">{label}</span>
    <span className="font-mono font-bold text-xs text-[var(--accent-primary)]">{value}</span>
  </div>
);
