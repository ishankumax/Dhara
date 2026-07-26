'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Palette, Sun, Moon } from 'lucide-react';
import { AccentColor, ThemeMode } from '@/types';

export const Header: React.FC = () => {
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
    <header className="sticky top-0 z-40 w-full px-4 lg:px-8 py-3 bg-[var(--bg-secondary)]/80 border-b border-[var(--border-color)] backdrop-blur-md transition-colors">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Brand Identity: DharaPod */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)]/40 flex items-center justify-center text-[var(--accent-primary)] shadow-sm">
            <Globe className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-[var(--text-primary)] leading-none tracking-tight">
              DharaPod
            </h1>
            <p className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider mt-0.5">
              Geopolitical & Strategic Intelligence
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Accent Customizer Button */}
          <div className="relative">
            <button
              onClick={() => setShowAccentPicker(!showAccentPicker)}
              className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)] transition-colors flex items-center space-x-1"
              title="Accent Color Customizer"
            >
              <Palette className="w-4 h-4" />
            </button>

            {showAccentPicker && (
              <div className="absolute right-0 mt-2 w-44 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-xl p-2 z-50 backdrop-blur-xl">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 px-2">
                  Theme Accent
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
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: item.colorHex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
