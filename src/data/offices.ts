import type { OfficeInfo } from './types';

export const OFFICES: Record<'dubai' | 'london', OfficeInfo> = {
  dubai: {
    id: 'dubai',
    city: 'Dubai',
    timezone: 'Asia/Dubai',
    tzLabel: 'GMT+4',
    hoursLabel: 'Monday to Friday, 8:30 to 18:00',
    openHour: 8,
    openMinute: 30,
    closeHour: 18,
    closeMinute: 0,
    addressLines: ['Level 12, Vika House', 'Business Bay, Dubai'],
    shortAddress: 'Level 12, Vika House, Business Bay.',
    phone: '+971 4 000 0000',
    phoneHref: 'tel:+97140000000',
    email: 'hello@vika.example',
    image: '/assets/images/studio/6ad74e5e105689040c7bbf22_vika-dubai-office.webp',
    imageAlt: 'Warm stone facade of the Dubai office building in golden hour sunlight',
  },
  london: {
    id: 'london',
    city: 'London',
    timezone: 'Europe/London',
    tzLabel: 'GMT/BST',
    hoursLabel: 'Monday to Friday, 9:00 to 17:30',
    openHour: 9,
    openMinute: 0,
    closeHour: 17,
    closeMinute: 30,
    addressLines: ['14 Vika Yard', 'London EC1'],
    shortAddress: '14 Vika Yard, London EC1.',
    phone: '+44 20 7946 0142',
    phoneHref: 'tel:+442079460142',
    email: 'hello@vika.example',
    image: '/assets/images/studio/6ad74e66105689040c7bc939_vika-london-reception.webp',
    imageAlt: 'Quiet reception interior in London with burgundy sofa and soft daylight',
  },
};

export function isOfficeOpenNow(office: OfficeInfo, now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: office.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);

  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;

  const weekday = map.weekday;
  if (weekday === 'Sat' || weekday === 'Sun') return false;

  const totalMins = Number(map.hour) * 60 + Number(map.minute);
  const openMins = office.openHour * 60 + office.openMinute;
  const closeMins = office.closeHour * 60 + office.closeMinute;
  return totalMins >= openMins && totalMins < closeMins;
}

export function formatOfficeTime(timezone: string, now: Date = new Date()): {
  hour: number;
  minute: number;
  second: number;
  formatted: string;
} {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);

  const map: Record<string, number> = {};
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = Number(p.value);
  }
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    hour: map.hour ?? 0,
    minute: map.minute ?? 0,
    second: map.second ?? 0,
    formatted: `${pad(map.hour ?? 0)}:${pad(map.minute ?? 0)}`,
  };
}
