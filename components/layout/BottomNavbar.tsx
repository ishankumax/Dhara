'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Palette, Sun, Moon, Shield, ChevronUp } from 'lucide-react';
import { AccentColor, ThemeMode, CountryOverview } from '@/types';
import { countryTimezones } from '@/lib/timezones';
import countryIndexData from '@/data/index.json';

interface BottomNavbarProps {
  activeCountryId: string;
  countries?: CountryOverview[];
}

const FLAG_EMOJIS: Record<string, string> = {
  USA: '🇺🇸',
  CHN: '🇨🇳',
  IND: '🇮🇳',
  RUS: '🇷🇺',
  GBR: '🇬🇧',
  FRA: '🇫🇷',
  JPN: '🇯🇵',
  CAN: '🇨🇦',
  AUS: '🇦🇺',
  BRA: '🇧🇷',
  KOR: '🇰🇷',
  DEU: '🇩🇪',
};

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeCountryId,
  countries,
}) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [accent, setAccent] = useState<AccentColor>('amber');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Clocks
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');
  const [selectedCountryTime, setSelectedCountryTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  // Click outside to close workspace popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      // IST Time (Formatted without seconds)
      const istTimeStr =
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }) + ' IST';

      const dateStr = now.toLocaleDateString('en-GB', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      const dayStr = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
      });

      setCurrentTimeIST(istTimeStr);
      setCurrentDate(dateStr);
      setCurrentDay(dayStr);

      // Selected Country Local Time
      const tzConfig = countryTimezones[activeCountryId] || {
        timeZone: 'Asia/Kolkata',
        code: 'IST',
      };

      const localStr = now.toLocaleTimeString('en-US', {
        timeZone: tzConfig.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      setSelectedCountryTime(`${localStr} ${tzConfig.code}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [activeCountryId]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const accents: { id: AccentColor; name: string; colorHex: string }[] = [
    { id: 'amber', name: 'Tactical Amber', colorHex: '#D97706' },
    { id: 'emerald', name: 'Military Emerald', colorHex: '#059669' },
    { id: 'cyan', name: 'Defense Cyan', colorHex: '#0891B2' },
    { id: 'crimson', name: 'Crimson Intel', colorHex: '#DC2626' },
  ];

  // Resolve country metadata
  const countryList = countries || (countryIndexData as CountryOverview[]);
  const activeCountry =
    countryList.find((c) => c.id === activeCountryId) || {
      id: activeCountryId,
      name: activeCountryId,
      region: 'Global',
      flagUrl: '',
    };

  const flagEmoji = FLAG_EMOJIS[activeCountryId] || '🌐';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto bg-[var(--bg-secondary)]/95 border-t border-[var(--border-color)] px-4 lg:px-8 py-2 flex items-center justify-between text-xs font-mono text-[var(--text-muted)] tracking-wider backdrop-blur-2xl shadow-2xl">
      {/* 1. Left: Selected Country Contextual Info */}
      <div className="flex items-center space-x-2.5 min-w-0">
        <span className="text-base leading-none select-none" title={activeCountry.name}>
          {flagEmoji}
        </span>
        <span className="font-bold text-[var(--text-primary)] text-xs tracking-tight truncate">
          {activeCountry.name}
        </span>
        <span className="text-[var(--text-muted)] opacity-50 hidden sm:inline">•</span>
        <span className="text-[var(--text-secondary)] text-[11px] hidden sm:inline truncate">
          {activeCountry.region}
        </span>
        <span className="text-[var(--border-color)] opacity-70">|</span>
        {/* Prominently Highlighted Selected Country Local Time */}
        <span className="text-[var(--accent-primary)] font-extrabold text-xs sm:text-[13px] font-mono tracking-widest drop-shadow-[0_0_8px_var(--accent-primary)]">
          {selectedCountryTime}
        </span>
      </div>

      {/* 2. Center: Interactive Workspace Button with Popover Panel */}
      <div className="relative" ref={workspaceRef}>
        <button
          onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all duration-200 ${
            isWorkspaceOpen
              ? 'bg-[var(--accent-muted)] border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-lg'
              : 'bg-[var(--bg-tertiary)]/60 hover:bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          title="Toggle Workspace Controls"
        >
          <Shield className="w-3.5 h-3.5 text-[var(--accent-primary)] animate-pulse" />
          <span className="uppercase font-bold text-[10px] sm:text-[11px] font-mono tracking-wider">
            WORKSPACE: <span className="text-[var(--text-primary)] font-extrabold">GEOPOLITICAL INTEL MATRIX</span>
          </span>
          <ChevronUp
            className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
              isWorkspaceOpen ? 'rotate-180 text-[var(--accent-primary)]' : ''
            }`}
          />
        </button>

        {/* Workspace Dropdown / Popover Panel */}
        {isWorkspaceOpen && (
          <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 bg-[var(--bg-secondary)]/95 border border-[var(--border-color)] rounded-2xl shadow-2xl p-4 z-50 backdrop-blur-2xl transition-all duration-200 ring-1 ring-white/10">
            {/* Header: DharaPod Branding */}
            <div className="flex items-center space-x-3 pb-3 border-b border-[var(--border-color)]">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)]/40 flex items-center justify-center text-[var(--accent-primary)] shadow-sm">
                <Globe className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-[var(--text-primary)] leading-none tracking-tight">
                    DharaPod
                  </h3>
                  <span className="text-[9px] font-mono font-bold bg-[var(--accent-muted)] text-[var(--accent-primary)] px-1.5 py-0.5 rounded border border-[var(--accent-primary)]/30">
                    v1.2.0
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  Geopolitical Intel Matrix
                </p>
              </div>
            </div>

            {/* Accent Palette Customizer */}
            <div className="py-3 border-b border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[var(--text-muted)] font-semibold">
                <span className="flex items-center space-x-1">
                  <Palette className="w-3 h-3 text-[var(--accent-primary)]" />
                  <span>Theme Accent</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {accents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAccent(item.id)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      accent === item.id
                        ? 'bg-[var(--accent-muted)] text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/40'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-transparent'
                    }`}
                  >
                    <span className="text-[11px] truncate">{item.name}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/20"
                      style={{ backgroundColor: item.colorHex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Appearance Theme Toggle */}
            <div className="pt-3 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] font-semibold">
                Appearance
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)]/30 text-[var(--text-primary)] text-xs transition-colors border border-[var(--border-color)]"
              >
                {theme === 'dark' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Right: Secondary Reference IST Clock & Calendar */}
      <div className="hidden md:flex items-center space-x-3 text-[10px] font-mono tracking-wider">
        {/* IST Time in Secondary Muted Styling */}
        <span className="text-[var(--text-muted)] font-medium">
          IST: {currentTimeIST}
        </span>
        <span className="text-[var(--border-color)] opacity-60">|</span>
        <span className="text-[var(--text-secondary)]">{currentDate}</span>
        <span className="text-[var(--border-color)] opacity-60">|</span>
        <span className="text-[var(--text-secondary)] font-bold uppercase">{currentDay}</span>
      </div>
    </div>
  );
};
