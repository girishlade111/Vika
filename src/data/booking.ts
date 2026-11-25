import type { PartnerAvailability } from './types_booking_helper';

export interface BookingPartnerConfig {
  personSlug: string;
  name: string;
  role: string;
  office: 'Dubai' | 'London';
  timezone: 'Asia/Dubai' | 'Europe/London';
  practiceFocus: string;
  availableDays: number[]; // 1=Mon..5=Fri
  timeWindows: {
    id: string;
    label: string;
    startHour: number;
    endHour: number;
    slots: string[];
  }[];
}

export const BOOKING_PARTNERS: BookingPartnerConfig[] = [
  {
    personSlug: 'sara-lindqvist',
    name: 'Sara Lindqvist',
    role: 'Managing Partner',
    office: 'Dubai',
    timezone: 'Asia/Dubai',
    practiceFocus: 'Accounting & group advisory',
    availableDays: [1, 2, 3, 4, 5],
    timeWindows: [
      { id: 'w1', label: '9:00 to 11:00', startHour: 9, endHour: 11, slots: ['09:00', '09:30', '10:00', '10:30'] },
      { id: 'w2', label: '11:00 to 13:00', startHour: 11, endHour: 13, slots: ['11:00', '11:30', '12:00', '12:30'] },
      { id: 'w3', label: '14:00 to 16:00', startHour: 14, endHour: 16, slots: ['14:00', '14:30', '15:00', '15:30'] },
      { id: 'w4', label: '16:00 to 18:00', startHour: 16, endHour: 18, slots: ['16:00', '16:30', '17:00', '17:30'] },
    ],
  },
  {
    personSlug: 'rami-nassar',
    name: 'Rami Nassar',
    role: 'Tax Partner',
    office: 'Dubai',
    timezone: 'Asia/Dubai',
    practiceFocus: 'UAE & UK tax, transfer pricing',
    availableDays: [1, 2, 3, 4, 5],
    timeWindows: [
      { id: 'w1', label: '9:00 to 11:00', startHour: 9, endHour: 11, slots: ['09:00', '09:30', '10:00', '10:30'] },
      { id: 'w2', label: '11:00 to 13:00', startHour: 11, endHour: 13, slots: ['11:00', '11:30', '12:00', '12:30'] },
      { id: 'w3', label: '14:00 to 16:00', startHour: 14, endHour: 16, slots: ['14:00', '14:30', '15:00', '15:30'] },
      { id: 'w4', label: '16:00 to 18:00', startHour: 16, endHour: 18, slots: ['16:00', '16:30', '17:00', '17:30'] },
    ],
  },
  {
    personSlug: 'hannah-okoye',
    name: 'Hannah Okoye',
    role: 'Audit Partner',
    office: 'London',
    timezone: 'Europe/London',
    practiceFocus: 'Statutory & free zone audits',
    availableDays: [1, 2, 3, 4, 5],
    timeWindows: [
      { id: 'w1', label: '9:00 to 11:00', startHour: 9, endHour: 11, slots: ['09:00', '09:30', '10:00', '10:30'] },
      { id: 'w2', label: '11:00 to 13:00', startHour: 11, endHour: 13, slots: ['11:00', '11:30', '12:00', '12:30'] },
      { id: 'w3', label: '14:00 to 16:00', startHour: 14, endHour: 16, slots: ['14:00', '14:30', '15:00', '15:30'] },
      { id: 'w4', label: '16:00 to 17:30', startHour: 16, endHour: 17, slots: ['16:00', '16:30', '17:00'] },
    ],
  },
];

export const PREFERRED_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export interface UpcomingWeekdayDate {
  iso: string;
  weekday: string;
  label: string;
  dayOfWeek: number;
}

export function getUpcomingWeekdays(timezone: string, count = 10): UpcomingWeekdayDate[] {
  const results: UpcomingWeekdayDate[] = [];
  const now = new Date();
  let offset = 1;
  while (results.length < count && offset < 30) {
    const candidate = new Date(now.getTime() + offset * 86400000);
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      weekday: 'long',
    }).formatToParts(candidate);
    const map: Record<string, string> = {};
    for (const p of parts) map[p.type] = p.value;
    if (map.weekday !== 'Saturday' && map.weekday !== 'Sunday') {
      const isoDate = new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(candidate);
      results.push({
        iso: isoDate,
        weekday: map.weekday,
        label: `${map.weekday.slice(0, 3)}, ${map.day} ${map.month}`,
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(
          map.weekday
        ),
      });
    }
    offset++;
  }
  return results;
}
