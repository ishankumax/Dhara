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
}
