'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Sun, Moon, Palette, ArrowRightLeft, Globe } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] shadow-sm">
            <Globe className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-bold text-lg tracking-wide text-[var(--text-primary)]">
                DHARA
              </h1>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[var(--accent-muted)] text-[var(--accent-primary)] border border-[var(--accent-primary)]">
                v1.0 Intel
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] hidden sm:block">
              Global Geopolitical & Strategic Intelligence Platform
            </p>
          </div>
        </div>

        {/* Center Comparison Mode Trigger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleCompareMode}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
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

        {/* Customization Toolbar */}
        <div className="flex items-center space-x-2">
          {/* Accent Customizer Popup */}
          <div className="relative">
            <button
              onClick={() => setShowAccentPicker(!showAccentPicker)}
              title="Change Accent Color"
              className="p-2 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)] transition-colors"
            >
              <Palette className="w-4 h-4" />
            </button>

            {showAccentPicker && (
              <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-xl p-2 z-50">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase mb-2 px-1">
                  Primary Accent Theme
                </div>
                <div className="space-y-1">
                  {accents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAccent(item.id);
                        setShowAccentPicker(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-xs transition-colors ${
                        accent === item.id
                          ? 'bg-[var(--accent-muted)] text-[var(--accent-primary)] font-semibold'
                          : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20 shadow-sm"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <span>{item.name}</span>
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
            className="p-2 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
