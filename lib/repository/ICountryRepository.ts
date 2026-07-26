import { CountryIntelProfile, CountryOverview } from '@/types';

export interface ICountryRepository {
  /**
   * Retrieves all countries lightweight metadata registry
   */
  getAllCountries(): Promise<CountryOverview[]>;

  /**
   * Retrieves detailed country profile by ISO 3-letter ID (e.g. "USA")
   */
  getCountryById(id: string): Promise<CountryIntelProfile | null>;

  /**
   * Compares two countries side-by-side
   */
  compareCountries(idA: string, idB: string): Promise<{
    countryA: CountryIntelProfile | null;
    countryB: CountryIntelProfile | null;
  }>;
}
