export const countryTimezones: Record<string, { timeZone: string; code: string; name: string }> = {
  USA: { timeZone: 'America/New_York', code: 'EDT', name: 'Eastern Time (US)' },
  CHN: { timeZone: 'Asia/Shanghai', code: 'CST', name: 'China Standard Time' },
  IND: { timeZone: 'Asia/Kolkata', code: 'IST', name: 'India Standard Time' },
  RUS: { timeZone: 'Europe/Moscow', code: 'MSK', name: 'Moscow Standard Time' },
  GBR: { timeZone: 'Europe/London', code: 'BST', name: 'British Summer Time' },
  FRA: { timeZone: 'Europe/Paris', code: 'CEST', name: 'Central European Time' },
  JPN: { timeZone: 'Asia/Tokyo', code: 'JST', name: 'Japan Standard Time' },
  CAN: { timeZone: 'America/Toronto', code: 'EDT', name: 'Eastern Time (Canada)' },
  AUS: { timeZone: 'Australia/Sydney', code: 'AEST', name: 'Australian Eastern Standard Time' },
  BRA: { timeZone: 'America/Sao_Paulo', code: 'BRT', name: 'Brasilia Time' },
  KOR: { timeZone: 'Asia/Seoul', code: 'KST', name: 'Korea Standard Time' },
  EGY: { timeZone: 'Africa/Cairo', code: 'EET', name: 'Eastern European Time' },
  DZA: { timeZone: 'Africa/Algiers', code: 'CET', name: 'Central European Time' },
  ZAF: { timeZone: 'Africa/Johannesburg', code: 'SAST', name: 'South Africa Standard Time' },
  NGA: { timeZone: 'Africa/Lagos', code: 'WAT', name: 'West Africa Time' },
  ETH: { timeZone: 'Africa/Addis_Ababa', code: 'EAT', name: 'East Africa Time' },
  MAR: { timeZone: 'Africa/Casablanca', code: 'WET', name: 'Western European Time' },
  KEN: { timeZone: 'Africa/Nairobi', code: 'EAT', name: 'East Africa Time' },
  AGO: { timeZone: 'Africa/Luanda', code: 'WAT', name: 'West Africa Time' },
  COD: { timeZone: 'Africa/Kinshasa', code: 'WAT', name: 'West Africa Time' },
  GHA: { timeZone: 'Africa/Accra', code: 'GMT', name: 'Greenwich Mean Time' },
  TZA: { timeZone: 'Africa/Dar_es_Salaam', code: 'EAT', name: 'East Africa Time' },
  TUN: { timeZone: 'Africa/Tunis', code: 'CET', name: 'Central European Time' },
  SDN: { timeZone: 'Africa/Khartoum', code: 'CAT', name: 'Central Africa Time' },
  LBY: { timeZone: 'Africa/Tripoli', code: 'EET', name: 'Eastern European Time' },
  UGA: { timeZone: 'Africa/Kampala', code: 'EAT', name: 'East Africa Time' },
  SEN: { timeZone: 'Africa/Dakar', code: 'GMT', name: 'Greenwich Mean Time' },
  CIV: { timeZone: 'Africa/Abidjan', code: 'GMT', name: 'Greenwich Mean Time' },
  CMR: { timeZone: 'Africa/Douala', code: 'WAT', name: 'West Africa Time' },
};

export function getCountryTime(countryId: string, date: Date = new Date()) {
  const tzConfig = countryTimezones[countryId] || {
    timeZone: 'UTC',
    code: 'UTC',
    name: 'Coordinated Universal Time',
  };

  try {
    const formattedTime = date.toLocaleTimeString('en-US', {
      timeZone: tzConfig.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const formattedDate = date.toLocaleDateString('en-GB', {
      timeZone: tzConfig.timeZone,
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const dayName = date.toLocaleDateString('en-US', {
      timeZone: tzConfig.timeZone,
      weekday: 'short',
    });

    return {
      timeStr: `${formattedTime} ${tzConfig.code}`,
      timeOnly: formattedTime,
      dateStr: formattedDate,
      dayStr: dayName,
      tzCode: tzConfig.code,
      tzName: tzConfig.name,
    };
  } catch {
    return {
      timeStr: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' UTC',
      timeOnly: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      dateStr: date.toLocaleDateString('en-GB'),
      dayStr: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tzCode: 'UTC',
      tzName: 'UTC',
    };
  }
}
