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
