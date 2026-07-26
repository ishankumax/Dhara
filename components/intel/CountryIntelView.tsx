'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  TrendingUp,
  Globe2,
  FileText,
  ArrowRightLeft,
  DollarSign,
  Users,
  Anchor,
  Zap,
  Clock,
} from 'lucide-react';
import { CountryIntelProfile } from '@/types';
import { getCountryTime } from '@/lib/timezones';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'military' | 'economy' | 'alliances'>(
    'overview'
  );

  // Dynamic Country Timezone state for Intel Panel
  const [localTimeInfo, setLocalTimeInfo] = useState(() =>
    country ? getCountryTime(country.id) : null
  );

  useEffect(() => {
    if (!country) return;
    const updateClock = () => {
      setLocalTimeInfo(getCountryTime(country.id));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [country?.id]);

  if (!country) {
    return (
      <div className="bg-transparent border-none p-4 flex flex-col items-center justify-center h-full text-center">
        <Globe2 className="w-8 h-8 text-[var(--accent-primary)] animate-pulse mb-2" />
        <p className="text-xs text-[var(--text-muted)] font-mono">
          Select a nation from the index or vector map stage.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'military', label: 'Military', icon: Shield },
    { id: 'economy', label: 'Economy', icon: TrendingUp },
    { id: 'alliances', label: 'Alliances', icon: Globe2 },
  ] as const;

  return (
    <div className="bg-transparent border-none p-2 flex flex-col h-full">
      {/* Header Profile Title */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 min-w-0">
          <img
            src={country.flagUrl}
            alt={country.name}
            className="w-8 h-6 object-cover rounded border border-[var(--border-color)]/20 shadow-xs flex-shrink-0"
          />
          <div className="min-w-0">
            <h2 className="font-bold text-sm text-[var(--text-primary)] truncate flex items-center gap-1.5">
              {country.name}
              <span className="text-[10px] font-mono text-[var(--text-muted)] px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)]/50">
                {country.id}
              </span>
            </h2>
            <p className="text-[11px] text-[var(--text-secondary)] truncate">
              {country.officialName}
            </p>
          </div>
        </div>

        {/* Action: Compare Target Button */}
        <button
          onClick={() => onSetCompareTarget(country.id)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isComparing
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-[var(--accent-muted)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>{isComparing ? 'Comparing' : 'Compare'}</span>
        </button>
      </div>

      {/* Selected Country Accent Highlighted Local Time & Timezone Widget */}
      {localTimeInfo && (
        <div className="mb-3 bg-[var(--accent-muted)] border border-[var(--accent-primary)]/40 p-2.5 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[var(--accent-primary)] animate-pulse" />
            <div>
              <div className="text-[9px] font-mono uppercase text-[var(--accent-primary)] font-bold">
                Local Capital Timezone • {localTimeInfo.tzName}
              </div>
              <div className="text-xs font-mono font-extrabold text-[var(--text-primary)]">
                {localTimeInfo.timeStr} ({localTimeInfo.dayStr})
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--accent-primary)] text-white shadow-2xs">
            {localTimeInfo.tzCode}
          </span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 mb-3 bg-[var(--bg-secondary)]/40 p-1 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel Contents (Scrollable Container) */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[500px]">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            {/* Executive Summary Box */}
            <div className="bg-[var(--bg-secondary)]/40 p-3 rounded-xl">
              <h3 className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-1">
                Strategic Intelligence Executive Brief
              </h3>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {country.summary || `${country.name} (${country.officialName}) is located in ${country.region}. Detailed military hardware breakdown and economic profile will be integrated in subsequent platform expansions.`}
              </p>
            </div>

            {/* Quick Stat Highlights Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[var(--bg-secondary)]/40 p-2.5 rounded-xl flex items-center space-x-3">
                <Shield className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Global Military Power
                  </div>
                  <div className="font-bold text-xs text-[var(--text-primary)]">
                    #{country.militaryRank}
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)]/40 p-2.5 rounded-xl flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Nominal GDP
                  </div>
                  <div className="font-bold text-xs text-[var(--text-primary)]">
                    ${country.gdpNominalUsd}B
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)]/40 p-2.5 rounded-xl flex items-center space-x-3">
                <Zap className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Defense Budget
                  </div>
                  <div className="font-bold text-xs text-[var(--text-primary)]">
                    ${country.defenseBudgetUsd}B
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)]/40 p-2.5 rounded-xl flex items-center space-x-3">
                <Users className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Population
                  </div>
                  <div className="font-bold text-xs text-[var(--text-primary)]">
                    {(country.population / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Military Breakdown */}
        {activeTab === 'military' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-secondary)]/40 p-3 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Active Personnel</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  {country.military?.personnel?.activeDuty ? country.military.personnel.activeDuty.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Reserve Personnel</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  {country.military?.personnel?.reserves ? country.military.personnel.reserves.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Combat Aircraft</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  {country.military?.aircraft?.totalFleet ? country.military.aircraft.totalFleet.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Main Battle Tanks</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  {country.military?.landForces?.tanks ? country.military.landForces.tanks.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Naval Fleet Assets</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  {country.military?.navalForces?.totalAssets ? country.military.navalForces.totalAssets.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Aircraft Carriers</span>
                <span className="font-mono font-bold text-[var(--accent-primary)]">
                  {country.military?.navalForces?.aircraftCarriers ?? 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Economy */}
        {activeTab === 'economy' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-secondary)]/40 p-3 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)] font-medium">GDP Growth Rate</span>
                <span className="font-mono font-bold text-emerald-500">
                  +{country.economy?.gdpGrowthRatePercent ?? 0}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">GDP per Capita</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  ${country.gdpPerCapitaUsd ? country.gdpPerCapitaUsd.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Inflation Rate</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">
                  {country.economy?.inflationPercent ?? 0}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Alliances */}
        {activeTab === 'alliances' && (
          <div className="space-y-2">
            <div className="bg-[var(--bg-secondary)]/40 p-3 rounded-xl">
              <h4 className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2">
                Treaties & Strategic Pacts
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {country.alliances?.alliances ? (
                  country.alliances.alliances.map((alliance) => (
                    <span
                      key={alliance}
                      className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--accent-muted)] text-[var(--accent-primary)] font-semibold border border-[var(--accent-primary)]/20"
                    >
                      {alliance}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[var(--text-muted)] font-mono">Bilateral Treaties</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
