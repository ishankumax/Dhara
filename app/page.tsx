'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNavbar } from '@/components/layout/BottomNavbar';
import { CountrySelector } from '@/components/selectors/CountrySelector';
import { VectorMapStage } from '@/components/map/VectorMapStage';
import { CountryIntelView } from '@/components/intel/CountryIntelView';
import { TopographicBackground } from '@/components/common/TopographicBackground';
import { countryRepository } from '@/lib/repository/JsonCountryRepository';
import countryIndexData from '@/data/index.json';
import { CountryIntelProfile, CountryOverview } from '@/types';

function DharaPodDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCountryId = searchParams.get('country') || 'USA';

  // Synchronous initial state from registry for instant 0ms rendering
  const [countriesIndex] = useState<CountryOverview[]>(countryIndexData as CountryOverview[]);
  const [activeProfile, setActiveProfile] = useState<CountryIntelProfile | null>(null);

  // Sync profile data when URL query parameter changes
  useEffect(() => {
    async function syncProfiles() {
      const profileA = await countryRepository.getCountryById(activeCountryId);
      setActiveProfile(profileA);
    }
    syncProfiles();
  }, [activeCountryId]);

  // URL state update helper
  const handleSelectCountry = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('country', id);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-[var(--bg-primary)] transition-colors pt-8 pb-14 select-none relative">
      {/* Interactive Topographic Contour Lines Background */}
      <TopographicBackground />

      {/* Fixed Top Status Bar */}
      <TopBar />

      <main className="flex-1 min-h-0 max-w-[1600px] w-full mx-auto p-3 lg:p-4 h-full z-10">
        {/* Standard 8-Grid Spatial Matrix Layout (2 : 4 : 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-3 h-full min-h-0">
          {/* Left 2 Spatial Areas (Cols 1–2): Country Selector & Index */}
          <div className="lg:col-span-2 h-full min-h-0">
            <CountrySelector
              countries={countriesIndex}
              activeCountryId={activeCountryId}
              onSelectCountry={handleSelectCountry}
            />
          </div>

          {/* Center 4 Spatial Areas (Cols 3–6): Interactive Geo-Map Stage */}
          <div className="lg:col-span-4 h-full min-h-0">
            <VectorMapStage
              countries={countriesIndex}
              activeCountryId={activeCountryId}
              onSelectCountry={handleSelectCountry}
            />
          </div>

          {/* Right 2 Spatial Areas (Cols 7–8): Detailed Country Intel Panel */}
          <div className="lg:col-span-2 h-full min-h-0">
            <CountryIntelView country={activeProfile} />
          </div>
        </div>
      </main>

      {/* Floating Bottom Pill Navbar & Dynamic Timezone Status Bar */}
      <BottomNavbar activeCountryId={activeCountryId} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)]">
          <div className="w-8 h-8 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DharaPodDashboardContent />
    </Suspense>
  );
}
