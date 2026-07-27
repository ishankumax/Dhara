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
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Clocks
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');
  const [selectedCountryTime, setSelectedCountryTime] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  // Click outside to close workspace popover and accent picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
        setShowAccentPicker(false);
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

      // Selected Country Local Time (for non-IND countries)
      if (activeCountryId && activeCountryId !== 'IND') {
        const tzConfig = countryTimezones[activeCountryId];
        if (tzConfig) {
          const localStr = now.toLocaleTimeString('en-US', {
            timeZone: tzConfig.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          setSelectedCountryTime(`${activeCountryId}: ${localStr}`);
        } else {
          setSelectedCountryTime(null);
        }
      } else {
        setSelectedCountryTime(null);
      }
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
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto bg-[var(--bg-secondary)] border-t border-[var(--border-color)] px-4 lg:px-8 py-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] tracking-wider shadow-2xl">
      {/* 1. Left: Country Indicator (Flag Icon | Country Name | Continent) */}
      <div className="flex items-center space-x-2 min-w-0">
        {/* Country Flag Icon aligned to far left edge */}
        {activeCountry.flagUrl ? (
          <img
            src={activeCountry.flagUrl}
            alt={activeCountry.name}
            className="w-4 h-3 object-cover rounded shadow-xs border border-[var(--border-color)]/40 flex-shrink-0"
          />
        ) : (
          <span className="text-xs leading-none flex-shrink-0">{flagEmoji}</span>
        )}
        <span className="font-bold text-[var(--text-primary)] truncate">
          {activeCountry.name}
        </span>
        <span className="text-[var(--border-color)] opacity-60">|</span>
        <span className="text-[var(--text-secondary)] truncate">
          {activeCountry.region}
        </span>
      </div>

      {/* 2. Center: Interactive Workspace Button with Glassmorphic Floating Popover Panel */}
      <div className="relative" ref={workspaceRef}>
        <button
          onClick={() => {
            setIsWorkspaceOpen(!isWorkspaceOpen);
            if (isWorkspaceOpen) setShowAccentPicker(false);
          }}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-all duration-200 ${
            isWorkspaceOpen
              ? 'bg-[var(--accent-muted)] border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-md'
              : 'bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          title="Toggle Workspace Controls"
        >
          <Shield className="w-3 h-3 text-[var(--accent-primary)] animate-pulse" />
          <span className="uppercase font-bold text-[10px] font-mono tracking-wider">
            WORKSPACE: <span className="text-[var(--text-primary)] font-extrabold">GEOPOLITICAL INTEL MATRIX</span>
          </span>
          <ChevronUp
            className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${
              isWorkspaceOpen ? 'rotate-180 text-[var(--accent-primary)]' : ''
            }`}
          />
        </button>

        {/* Workspace Dropdown Popover Panel (Original Floating Pill Design + Glassmorphism Water Effect) */}
        {isWorkspaceOpen && (
          <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-auto transition-all duration-200">
            {/* Accent Palette Dropdown Menu */}
            {showAccentPicker && (
              <div className="mb-2 w-48 bg-[var(--bg-secondary)]/85 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl p-2 z-50 ring-1 ring-white/10">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 px-2">
                  Theme Accent Palette
                </div>
                <div className="space-y-1">
                  {accents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAccent(item.id);
                        setShowAccentPicker(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all ${
                        accent === item.id
                          ? 'bg-[var(--accent-muted)] text-[var(--accent-primary)] font-semibold'
                          : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span
                        className="w-3 h-3 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: item.colorHex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Floating Navigation Pill (Original Design with Glassmorphism Water Effect) */}
            <div className="flex items-center gap-2 p-1.5 bg-[var(--bg-secondary)]/70 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.37)] ring-1 ring-white/10">
              {/* DharaPod Badge */}
              <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-primary)] text-white shadow-md">
                <Globe className="w-3.5 h-3.5 animate-spin-slow" />
                <span>DharaPod</span>
              </div>

              {/* Vertical Divider */}
              <div className="w-px h-4 bg-[var(--border-color)]" />

              {/* Palette Customizer Button */}
              <button
                onClick={() => setShowAccentPicker(!showAccentPicker)}
                title="Accent Palette"
                className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <Palette className="w-4 h-4" />
              </button>

              {/* Vertical Divider */}
              <div className="w-px h-4 bg-[var(--border-color)]" />

              {/* Theme Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                title="Toggle Light/Dark Theme"
                className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Right: Time Displays & Reference Clocks (Uniform text-[10px] font-mono tracking-wider) */}
      <div className="flex items-center space-x-3 text-[10px] font-mono tracking-wider">
        <div className="flex items-center space-x-2">
          {/* Selected Country Local Time (Primary: Neon Accent Highlighted) */}
          {selectedCountryTime ? (
            <>
              <span className="text-[var(--accent-primary)] font-bold drop-shadow-[0_0_8px_var(--accent-primary)]">
                {selectedCountryTime}
              </span>
              <span className="text-[var(--border-color)] opacity-60">|</span>
              {/* Secondary IST Reference Time (Muted) */}
              <span className="text-[var(--text-muted)] font-medium">
                {currentTimeIST}
              </span>
            </>
          ) : (
            /* Default IST Time when no other country selected (Primary: Neon Accent Highlighted) */
            <span className="text-[var(--accent-primary)] font-bold drop-shadow-[0_0_8px_var(--accent-primary)]">
              {currentTimeIST}
            </span>
          )}
        </div>

        <span className="text-[var(--border-color)] opacity-60">|</span>
        <span className="text-[var(--text-secondary)]">{currentDate}</span>
        <span className="text-[var(--border-color)] opacity-60">|</span>
        <span className="text-[var(--text-secondary)] font-bold uppercase">{currentDay}</span>
      </div>
    </div>
  );
};

