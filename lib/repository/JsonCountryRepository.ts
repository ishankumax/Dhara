import { CountryIntelProfile, CountryOverview } from '@/types';
import { ICountryRepository } from './ICountryRepository';
import countryIndexData from '@/data/index.json';

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

    try {
      // Dynamic import for detailed seed profile
      const detailedModule = await import(`@/data/countries/${code.toLowerCase()}.json`);
      return detailedModule.default as CountryIntelProfile;
    } catch {
      // Fallback placeholder profile for unseeded countries
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
          topExports: ["Primary Commodities", "Agriculture"],
          topImports: ["Manufactured Goods", "Energy"],
          majorTradingPartners: ["Regional Partners"],
        },
        alliances: {
          primaryBlock: "Regional UN Member",
          alliances: ["United Nations"],
          strategicPartners: ["Regional Allies"],
        },
      };
    }
  }

  async compareCountries(idA: string, idB: string): Promise<{
    countryA: CountryIntelProfile | null;
    countryB: CountryIntelProfile | null;
  }> {
    const [countryA, countryB] = await Promise.all([
      this.getCountryById(idA),
      this.getCountryById(idB),
    ]);

    return { countryA, countryB };
  }
}

// Singleton Export
export const countryRepository = new JsonCountryRepository();
