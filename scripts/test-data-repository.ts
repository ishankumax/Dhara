import { countryRepository } from '../lib/repository/JsonCountryRepository';

async function runDataTests() {
  console.log('🧪 Starting Dhara Data Repository Integration Tests...\n');

  // Test 1: Fetch all overview countries
  const allCountries = await countryRepository.getAllCountries();
  console.log(`✅ Test 1 Passed: Loaded ${allCountries.length} countries from registry.`);

  // Test 2: Fetch USA seeded profile
  const usaProfile = await countryRepository.getCountryById('USA');
  if (!usaProfile || !usaProfile.hasDetailedData) {
    throw new Error('USA profile failed to load or lacks detailed data.');
  }
  console.log(`✅ Test 2 Passed: Loaded USA profile (${usaProfile.officialName}, Rank #${usaProfile.militaryRank}).`);

  // Test 3: Fetch unseeded country fallback handling (e.g. CAN)
  const canProfile = await countryRepository.getCountryById('CAN');
  if (!canProfile) {
    throw new Error('CAN fallback profile failed to load.');
  }
  console.log(`✅ Test 3 Passed: Loaded CAN fallback profile successfully.`);

  console.log('\n🎉 ALL REPOSITORY INTEGRATION TESTS PASSED CLEANLY!\n');
}

runDataTests().catch((err) => {
  console.error('❌ Data Repository Test Failed:', err);
  process.exit(1);
});
