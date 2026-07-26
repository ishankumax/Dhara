'use client';

import React, { useState } from 'react';
import { Search, Shield, Globe, ChevronRight } from 'lucide-react';
import { CountryOverview } from '@/types';

interface CountrySelectorProps {
  countries: CountryOverview[];
  activeCountryId: string;
  onSelectCountry: (id: string) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  activeCountryId,
  onSelectCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');

  const regions = ['ALL', 'Americas', 'Asia', 'Europe'];

  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.officialName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion =
      regionFilter === 'ALL' || country.region.includes(regionFilter);

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="bg-transparent border-none p-2 flex flex-col h-full">
      {/* Header Title */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-[var(--accent-primary)]" />
          <h2 className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-widest">
            Global Nations Index
          </h2>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          {filteredCountries.length} / {countries.length}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search nation or ISO..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[var(--bg-secondary)]/50 border border-[var(--border-color)]/30 rounded-xl pl-8 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors backdrop-blur-sm"
        />
      </div>

      {/* Region Filter Buttons */}
      <div className="flex items-center space-x-1 mb-3 overflow-x-auto pb-1 no-scrollbar">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setRegionFilter(region)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              regionFilter === region
                ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-sm'
                : 'bg-[var(--bg-secondary)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/70'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Country List Scrollable Container */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[550px]">
        {filteredCountries.map((country) => {
          const isActive = country.id === activeCountryId;

          return (
            <div
              key={country.id}
              onClick={() => onSelectCountry(country.id)}
              className={`group cursor-pointer p-2.5 rounded-xl transition-all flex items-center justify-between ${
                isActive
                  ? 'bg-[var(--accent-muted)] border border-[var(--accent-primary)] shadow-sm'
                  : 'bg-[var(--bg-secondary)]/40 hover:bg-[var(--bg-secondary)]/80 border border-transparent'
              }`}
            >
              {/* Flag & Name */}
              <div className="flex items-center space-x-3 min-w-0">
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className="w-7 h-5 object-cover rounded border border-[var(--border-color)]/20 shadow-xs flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-semibold text-xs text-[var(--text-primary)] truncate">
                      {country.name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      ({country.id})
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] truncate">
                    {country.capital} • GDP ${country.gdpNominalUsd}B
                  </div>
                </div>
              </div>

              {/* Military Rank & Badge */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div
                  title={`Global Military Rank: #${country.militaryRank}`}
                  className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)]"
                >
                  <Shield className="w-3 h-3 text-[var(--accent-primary)]" />
                  <span>#{country.militaryRank}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
