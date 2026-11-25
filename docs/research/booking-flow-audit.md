# Partner Booking & Timezone Flow Audit

Implemented across `src/data/booking.ts`, `src/context/BookingContext.tsx`, `src/components/booking/BookingFlow.tsx`, `src/components/booking/BookingOverlay.tsx`, and `/cinematic/contact-cinematic`.

## Partner Availability Matrix

- **Sara Lindqvist** (`sara-lindqvist`): Managing Partner, Dubai (`Asia/Dubai`), Accounting & group advisory. Monday to Friday, 09:00 to 18:00.
- **Rami Nassar** (`rami-nassar`): Tax Partner, Dubai (`Asia/Dubai`), UAE & UK tax and transfer pricing. Monday to Friday, 09:00 to 18:00.
- **Hannah Okoye** (`hannah-okoye`): Audit Partner, London (`Europe/London`), Statutory & free zone audits. Monday to Friday, 09:00 to 17:30.

## Step Flow

1. Choose Partner (pre-selectable from any page via `BookingContext.openBooking({ partnerSlug, serviceSlug, planSlug })`).
2. Pick an upcoming Mon-Fri weekday generated in the selected partner's office timezone (`getUpcomingWeekdays()`).
3. Select a 30-minute time slot within partner time windows.
4. Provide contact name, work email, company, and optional notes with Zod validation.
5. Submit via optional `VITE_BOOKING_ENDPOINT` or display clear local demonstration confirmation without touching external production systems.
