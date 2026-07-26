import { CountryIntelProfile, CountryOverview } from '@/types';
import { ICountryRepository } from './ICountryRepository';
import countryIndexData from '@/data/index.json';

import usaIntel from '@/data/countries/usa.json';
import chnIntel from '@/data/countries/chn.json';
import indIntel from '@/data/countries/ind.json';
import rusIntel from '@/data/countries/rus.json';
import gbrIntel from '@/data/countries/gbr.json';
import fraIntel from '@/data/countries/fra.json';
import jpnIntel from '@/data/countries/jpn.json';

const seedProfiles: Record<string, CountryIntelProfile> = {
  USA: usaIntel as CountryIntelProfile,
  CHN: chnIntel as CountryIntelProfile,
  IND: indIntel as CountryIntelProfile,
  RUS: rusIntel as CountryIntelProfile,
  GBR: gbrIntel as CountryIntelProfile,
  FRA: fraIntel as CountryIntelProfile,
  JPN: jpnIntel as CountryIntelProfile,
};

export class JsonCountryRepository implements ICountryRepository {
  private overviewList: CountryOverview[];

  constructor() {
    this.overviewList = countryIndexData as CountryOverview[];
  }

  async getAllCountries(): Promise<CountryOverview[]> {
    return this.overviewList;
  }

  async getCountryById(id: string): Promise<CountryIntelProfile | null> {
    const code = id.toUpperCase();
    const overview = this.overviewList.find((c) => c.id === code);

    if (!overview) return null;

    // Check if deep seed profile exists
    if (seedProfiles[code]) {
      return seedProfiles[code];
    }

    // Safe fallback placeholder profile for unseeded countries
    return {
      ...overview,
      hasDetailedData: false,
      summary: `${overview.name} (${overview.officialName}) is located in ${overview.region} (${overview.subregion}). Detailed military hardware breakdown and economic profile will be integrated in subsequent platform expansions.`,
      military: {
        aircraft: { totalFleet: 0, fighters: 0, attackHelicopters: 0 },
        landForces: { tanks: 0, armoredVehicles: 0, artillery: 0 },
        navalForces: { totalAssets: 0, aircraftCarriers: 0, submarines: 0, destroyers: 0 },
        personnel: { activeDuty: 0, reserves: 0, paramilitary: 0 },
      },
      economy: {
        gdpGrowthRatePercent: 0,
        inflationPercent: 0,
        topExports: ['Primary Commodities', 'Agriculture'],
        topImports: ['Manufactured Goods', 'Energy'],
        majorTradingPartners: ['Regional Partners'],
      },
      alliances: {
        primaryBlock: 'Regional UN Member',
        alliances: ['United Nations'],
        strategicPartners: ['Regional Allies'],
      },
    };
  }
}

// Singleton Export
export const countryRepository = new JsonCountryRepository();
