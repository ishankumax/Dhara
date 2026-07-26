'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette, ArrowRightLeft, Globe, Sparkles } from 'lucide-react';
import { AccentColor, ThemeMode } from '@/types';

interface HeaderProps {
  activeCountryId: string;
  compareCountryId: string | null;
  onToggleCompareMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCountryId,
  compareCountryId,
  onToggleCompareMode,
}) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [accent, setAccent] = useState<AccentColor>('amber');
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

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
    <header className="sticky top-0 z-50 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between p-2 px-4 bg-[var(--bg-secondary)]/80 border border-[var(--border-color)] rounded-full backdrop-blur-2xl shadow-lg transition-all duration-300">
        
        {/* Brand Identity: Dhara+ */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] shadow-sm">
            <Globe className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex items-center space-x-1.5">
            <h1 className="font-serif font-bold text-base tracking-wide text-[var(--text-primary)]">
              Dhara<span className="text-[var(--accent-primary)] font-extrabold">+</span>
            </h1>
            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[var(--accent-muted)] text-[var(--accent-primary)] border border-[var(--accent-primary)]">
              Intel Core
            </span>
          </div>
        </div>

        {/* Center Pill Mode Switcher */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleCompareMode}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
              compareCountryId
                ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-md'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              {compareCountryId ? `Comparing vs ${compareCountryId}` : 'Compare Mode'}
            </span>
          </button>
        </div>

        {/* Customization Toolbar (Pill Style) */}
        <div className="flex items-center space-x-1.5">
          {/* Accent Customizer Popup */}
          <div className="relative">
            <button
              onClick={() => setShowAccentPicker(!showAccentPicker)}
              title="Theme Accent Palette"
              className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)] transition-colors"
            >
              <Palette className="w-4 h-4" />
            </button>

            {showAccentPicker && (
              <div className="absolute right-0 mt-3 w-48 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 px-2">
                  Accent Color Theme
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
          </div>

          {/* Theme Mode Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
