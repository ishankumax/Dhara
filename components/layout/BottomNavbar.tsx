'use client';

import React, { useState, useEffect } from 'react';
import { Globe, ArrowRightLeft, Palette, Sun, Moon, Shield } from 'lucide-react';
import { AccentColor, ThemeMode } from '@/types';

interface BottomNavbarProps {
  activeCountryId: string;
  compareCountryId: string | null;
  onToggleCompareMode: () => void;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeCountryId,
  compareCountryId,
  onToggleCompareMode,
}) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [accent, setAccent] = useState<AccentColor>('amber');
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  // Live IST Clock (No seconds, no sub timezone, no outer box, pure neon styling)
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr =
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }) + ' IST';

      const dateStr = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      const dayStr = now.toLocaleDateString('en-US', { weekday: 'short' });

      setCurrentTimeIST(timeStr);
      setCurrentDate(dateStr);
      setCurrentDay(dayStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const accents: { id: AccentColor; name: string; colorHex: string }[] = [
    { id: 'amber', name: 'Tactical Amber', colorHex: '#D97706' },
    { id: 'emerald', name: 'Military Emerald', colorHex: '#059669' },
    { id: 'cyan', name: 'Defense Cyan', colorHex: '#0891B2' },
    { id: 'crimson', name: 'Crimson Intel', colorHex: '#DC2626' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex flex-col items-center">
      {/* 1. Floating Pill Navigation Bar (Above Status Bar) */}
      <div className="pointer-events-auto mb-3 relative">
        {/* Accent Palette Dropdown Menu */}
        {showAccentPicker && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl">
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

        {/* Floating Pill Container */}
        <div className="flex items-center gap-2 p-1.5 bg-[var(--bg-secondary)]/90 border border-[var(--border-color)] rounded-full backdrop-blur-2xl shadow-2xl transition-all duration-300 ring-1 ring-white/10">
          {/* Active Workspace / View Pill */}
          <button
            onClick={() => {
              if (compareCountryId) onToggleCompareMode();
            }}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              !compareCountryId
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Dhara Core</span>
          </button>

          {/* Vertical Divider */}
          <div className="w-px h-4 bg-[var(--border-color)]" />

          {/* Side-by-Side Compare Pill */}
          <button
            onClick={onToggleCompareMode}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              compareCountryId
                ? 'bg-amber-500 text-white font-semibold shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{compareCountryId ? `Compare vs ${compareCountryId}` : 'Compare'}</span>
          </button>

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

          {/* Theme Mode Button (Sun / Moon) */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Fixed Bottom Status Bar with Clean Neon IST Time (No clock, no box, no seconds, no sub-tz) */}
      <div className="w-full bg-[var(--bg-secondary)] border-t border-[var(--border-color)] px-4 lg:px-8 py-1.5 pointer-events-auto flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
        {/* Left: Progress / Data Coverage Bar */}
        <div className="flex items-center space-x-3">
          <span className="uppercase text-[var(--text-secondary)] font-bold">
            SEEDED COVERAGE <span className="text-[var(--text-primary)]">7/195</span>
          </span>
          <div className="w-20 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden border border-[var(--border-color)]">
            <div className="h-full bg-[var(--accent-primary)] rounded-full w-full animate-pulse" />
          </div>
          <span className="text-[var(--accent-primary)] font-bold">100% ACTIVE</span>
        </div>

        {/* Center: Active Workspace Status */}
        <div className="hidden sm:flex items-center space-x-2">
          <Shield className="w-3 h-3 text-[var(--accent-primary)]" />
          <span className="uppercase font-bold text-[var(--text-secondary)]">
            WORKSPACE: <span className="text-[var(--text-primary)]">GEOPOLITICAL INTEL MATRIX</span>
          </span>
        </div>

        {/* Right: Pure Neon IST Time (No Clock Icon, No Box, No Seconds, No Sub-TZ) */}
        <div className="flex items-center space-x-3">
          <span className="text-[var(--accent-primary)] font-extrabold text-[11px] font-mono tracking-widest drop-shadow-[0_0_8px_var(--accent-primary)]">
            {currentTimeIST}
          </span>
          <span className="text-[var(--border-color)]">|</span>
          <span className="text-[var(--text-primary)]">{currentDate}</span>
          <span className="text-[var(--border-color)]">|</span>
          <span className="text-[var(--accent-primary)] font-bold uppercase">{currentDay}</span>
        </div>
      </div>
    </div>
  );
};
