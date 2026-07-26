'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { BottomNavbar } from '@/components/layout/BottomNavbar';
import { CountrySelector } from '@/components/selectors/CountrySelector';
import { VectorMapStage } from '@/components/map/VectorMapStage';
import { CountryIntelView } from '@/components/intel/CountryIntelView';
import { ComparisonMatrix } from '@/components/comparison/ComparisonMatrix';
import { countryRepository } from '@/lib/repository/JsonCountryRepository';
import { CountryIntelProfile, CountryOverview } from '@/types';

function DharaDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCountryId = searchParams.get('country') || 'USA';
  const compareCountryId = searchParams.get('compare');

  const [countriesIndex, setCountriesIndex] = useState<CountryOverview[]>([]);
  const [activeProfile, setActiveProfile] = useState<CountryIntelProfile | null>(null);
  const [compareProfile, setCompareProfile] = useState<CountryIntelProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    async function loadInitialData() {
      const allCountries = await countryRepository.getAllCountries();
      setCountriesIndex(allCountries);
      setLoading(false);
    }
    loadInitialData();
  }, []);

  // Sync profile data when URL query parameters change
  useEffect(() => {
    async function syncProfiles() {
      const profileA = await countryRepository.getCountryById(activeCountryId);
      setActiveProfile(profileA);

      if (compareCountryId) {
        const profileB = await countryRepository.getCountryById(compareCountryId);
        setCompareProfile(profileB);
      } else {
        setCompareProfile(null);
      }
    }
    syncProfiles();
  }, [activeCountryId, compareCountryId]);

  // URL state update helpers
  const handleSelectCountry = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (compareCountryId) {
      // In comparison mode, set target B
      params.set('compare', id);
    } else {
      // In normal mode, set active country A
      params.set('country', id);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleToggleCompareMode = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (compareCountryId) {
      params.delete('compare');
    } else {
      // Default comparison target: CHN if active is USA, otherwise USA
      const target = activeCountryId === 'USA' ? 'CHN' : 'USA';
      params.set('compare', target);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleCloseComparison = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('compare');
    router.push(`/?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] font-serif">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono tracking-wider uppercase">Loading Dhara Intelligence Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] transition-colors pb-20">
      <Header
        activeCountryId={activeCountryId}
        compareCountryId={compareCountryId}
        onToggleCompareMode={handleToggleCompareMode}
      />

      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 lg:p-6">
        {compareCountryId && activeProfile && compareProfile ? (
          /* Mode 1: 4:4 Grid Split Comparison View */
          <div className="h-full">
            <ComparisonMatrix
              countryA={activeProfile}
              countryB={compareProfile}
              onClose={handleCloseComparison}
            />
          </div>
        ) : (
          /* Mode 2: Standard 8-Grid Spatial Matrix Layout (2 : 4 : 2) */
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 h-full">
            {/* Left 2 Spatial Areas (Cols 1–2): Country Selector & Index */}
            <div className="lg:col-span-2 h-[650px] lg:h-auto">
              <CountrySelector
                countries={countriesIndex}
                activeCountryId={activeCountryId}
                compareCountryId={compareCountryId}
                onSelectCountry={handleSelectCountry}
                isCompareMode={!!compareCountryId}
              />
            </div>

            {/* Center 4 Spatial Areas (Cols 3–6): Interactive Geo-Map Stage */}
            <div className="lg:col-span-4 h-[450px] lg:h-auto">
              <VectorMapStage
                countries={countriesIndex}
                activeCountryId={activeCountryId}
                compareCountryId={compareCountryId}
                onSelectCountry={handleSelectCountry}
              />
            </div>

            {/* Right 2 Spatial Areas (Cols 7–8): Detailed Country Intel Panel */}
            <div className="lg:col-span-2 h-[650px] lg:h-auto">
              <CountryIntelView
                country={activeProfile}
                onSetCompareTarget={(id) => {
                  const target = id === 'USA' ? 'CHN' : 'USA';
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('country', id);
                  params.set('compare', target);
                  router.push(`/?${params.toString()}`);
                }}
                isComparing={!!compareCountryId}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Pill Navbar & Status Bar */}
      <BottomNavbar
        activeCountryId={activeCountryId}
        compareCountryId={compareCountryId}
        onToggleCompareMode={handleToggleCompareMode}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)]">
          <div className="w-8 h-8 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DharaDashboardContent />
    </Suspense>
  );
}
