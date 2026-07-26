export type ThemeMode = 'light' | 'dark';
export type AccentColor = 'amber' | 'emerald' | 'cyan' | 'crimson';

export interface CountryOverview {
  id: string;                 // ISO 3-letter code (e.g. USA, CHN, IND)
  name: string;
  officialName: string;
  flagUrl: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  gdpNominalUsd: number;       // in USD billions
  gdpPerCapitaUsd: number;
  militaryRank: number;        // PowerIndex Global Rank
  defenseBudgetUsd: number;    // in USD billions
}

export interface MilitaryHardware {
  aircraft: {
    totalFleet: number;
    fighters: number;
    attackHelicopters: number;
  };
  landForces: {
    tanks: number;
    armoredVehicles: number;
    artillery: number;
  };
  navalForces: {
    totalAssets: number;
    aircraftCarriers: number;
    submarines: number;
    destroyers: number;
  };
  personnel: {
    activeDuty: number;
    reserves: number;
    paramilitary: number;
  };
}

export interface EconomyIntel {
  gdpGrowthRatePercent: number;
  inflationPercent: number;
  topExports: string[];
  topImports: string[];
  majorTradingPartners: string[];
}

export interface AllianceIntel {
  primaryBlock: string;       // e.g. NATO, BRICS, Quad, CSTO
  alliances: string[];
  strategicPartners: string[];
}

export interface CountryIntelProfile extends CountryOverview {
  summary: string;
  military: MilitaryHardware;
  economy: EconomyIntel;
  alliances: AllianceIntel;
  hasDetailedData: boolean;   // true for seed 5–7 countries, false for placeholders
}
