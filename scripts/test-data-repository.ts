import { countryRepository } from '../lib/repository/JsonCountryRepository';

async function runDataRepositoryTests() {
  console.log('🧪 Starting Dhara Data Repository Integration Tests...\n');

  // Test 1: Fetch all registry countries
  const countries = await countryRepository.getAllCountries();
  console.log(`✅ Test 1: Fetched ${countries.length} countries from global registry.`);
  if (countries.length < 10) throw new Error('Registry failed to load expected minimum countries.');

  // Test 2: Fetch detailed seed profile (USA)
  const usaProfile = await countryRepository.getCountryById('USA');
  if (!usaProfile || !usaProfile.hasDetailedData) {
    throw new Error('Failed to load detailed profile for USA.');
  }
  console.log(`✅ Test 2: Successfully loaded USA detailed profile:`);
  console.log(`   - Aircraft Fleet: ${usaProfile.military.aircraft.totalFleet}`);
  console.log(`   - Defense Budget: $${usaProfile.defenseBudgetUsd} Billion`);
  console.log(`   - Primary Alliance: ${usaProfile.alliances.primaryBlock}`);

  // Test 3: Fetch fallback profile for unseeded nation (DEU)
  const deuProfile = await countryRepository.getCountryById('DEU');
  if (!deuProfile) throw new Error('Failed to load fallback profile for DEU.');
  console.log(`✅ Test 3: Fallback profile handled gracefully for DEU (hasDetailedData: ${deuProfile.hasDetailedData}).`);

  // Test 4: Compare USA vs CHN
  const comparison = await countryRepository.compareCountries('USA', 'CHN');
  if (!comparison.countryA || !comparison.countryB) {
    throw new Error('Comparison matrix failed to load profiles.');
  }
  console.log(`✅ Test 4: Successfully generated side-by-side comparison between ${comparison.countryA.name} and ${comparison.countryB.name}.`);

  console.log('\n🎉 ALL DATA INTEGRITY TESTS PASSED SUCCESSFULLY!');
}

runDataRepositoryTests().catch((err) => {
  console.error('❌ Data Repository Test Failed:', err);
  process.exit(1);
});
