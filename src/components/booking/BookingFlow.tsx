import React, { useMemo, useState } from 'react';
import { z } from 'zod';
import { BOOKING_PARTNERS, getUpcomingWeekdays } from '@/data/booking';
import { PEOPLE } from '@/data/people';
import { SITE_CONFIG } from '@/data/siteConfig';
import { formatOfficeTime } from '@/data/offices';
import { VikaButton } from '@/components/common/VikaButton';

const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid work email.'),
  company: z.string().optional(),
  topics: z.array(z.string()).min(1, 'Select at least one topic.'),
  notes: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm consent before submitting.' }) }),
});

interface BookingFlowProps {
  initialPartnerSlug?: string;
  initialServiceSlug?: string;
  onSuccess?: () => void;
}

const TOPICS = ['Accounting', 'Tax', 'Audit', 'Not sure yet'] as const;

export function BookingFlow({
  initialPartnerSlug = 'sara-lindqvist',
  initialServiceSlug = '',
  onSuccess,
}: BookingFlowProps) {
  const [partnerSlug, setPartnerSlug] = useState(
    BOOKING_PARTNERS.some((p) => p.personSlug === initialPartnerSlug)
      ? initialPartnerSlug
      : BOOKING_PARTNERS[0].personSlug
  );
  const partner = BOOKING_PARTNERS.find((p) => p.personSlug === partnerSlug) || BOOKING_PARTNERS[0];
  const personDoc = PEOPLE.find((p) => p.slug === partner.personSlug);

  const upcomingDates = useMemo(() => getUpcomingWeekdays(partner.timezone, 10), [partner.timezone]);
  const [selectedDateIso, setSelectedDateIso] = useState(upcomingDates[0]?.iso || '');
  const [selectedWindowId, setSelectedWindowId] = useState(partner.timeWindows[0].id);
  const [selectedSlot, setSelectedSlot] = useState(partner.timeWindows[0].slots[0]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [topics, setTopics] = useState<string[]>(() => {
    if (initialServiceSlug === 'accounting') return ['Accounting'];
    if (initialServiceSlug === 'tax') return ['Tax'];
    if (initialServiceSlug === 'audit') return ['Audit'];
    return ['Accounting'];
  });
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const activeWindow =
    partner.timeWindows.find((w) => w.id === selectedWindowId) || partner.timeWindows[0];
  const officeClock = formatOfficeTime(partner.timezone);

  const handlePartnerChange = (slug: string) => {
    setPartnerSlug(slug);
    const nextPartner = BOOKING_PARTNERS.find((p) => p.personSlug === slug) || BOOKING_PARTNERS[0];
    const nextDates = getUpcomingWeekdays(nextPartner.timezone, 10);
    setSelectedDateIso(nextDates[0]?.iso || '');
    setSelectedWindowId(nextPartner.timeWindows[0].id);
    setSelectedSlot(nextPartner.timeWindows[0].slots[0]);
  };

  const handleWindowChange = (winId: string) => {
    setSelectedWindowId(winId);
    const win = partner.timeWindows.find((w) => w.id === winId);
    if (win) setSelectedSlot(win.slots[0]);
  };

  const toggleTopic = (t: string) => {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === 'submitting') return;

    if (!selectedDateIso || !selectedSlot) {
      setErrorMsg('Please select a date and time slot.');
      setSubmitState('error');
      return;
    }

    const parsed = bookingSchema.safeParse({
      name,
      email,
      company,
      topics,
      notes,
      consent,
    });

    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message || 'Please check the form fields.');
      setSubmitState('error');
      return;
    }

    setSubmitState('submitting');
    setErrorMsg('');

    try {
      if (SITE_CONFIG.bookingEndpoint) {
        const res = await fetch(SITE_CONFIG.bookingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            partnerSlug,
            office: partner.office,
            timezone: partner.timezone,
            date: selectedDateIso,
            slot: selectedSlot,
            ...parsed.data,
          }),
        });
        if (!res.ok) throw new Error('Booking request failed');
        const json = await res.json().catch(() => ({}));
        setReferenceId(json.bookingId || 'CONFIRMED');
      } else {
        await new Promise((r) => setTimeout(r, 400));
        setReferenceId(`DEMO-${selectedDateIso.replace(/-/g, '')}-${selectedSlot.replace(':', '')}`);
      }
      setSubmitState('success');
      onSuccess?.();
    } catch {
      setSubmitState('error');
      setErrorMsg('We could not send that. Nothing was lost: try again, or email hello@vika.example.');
    }
  };

  if (submitState === 'success') {
    const selectedDateObj = upcomingDates.find((d) => d.iso === selectedDateIso);
    return (
      <div className="form_message-success" role="status" style={{ borderRadius: '0.75rem', padding: '2rem' }}>
        <p className="text-style-label" style={{ marginBottom: '0.5rem' }}>
          {SITE_CONFIG.demoMode ? 'Demonstration request recorded' : 'Request received'}
        </p>
        <h3 className="heading-style-h3" style={{ marginBottom: '0.75rem' }}>
          {SITE_CONFIG.demoMode
            ? `Example call request prepared for ${partner.name}.`
            : 'Thank you. Your invitation follows within the hour.'}
        </h3>
        <p className="text-size-regular" style={{ marginBottom: '1rem' }}>
          Partner: {partner.name} ({partner.office}, {partner.timezone}, current local time{' '}
          {officeClock.formatted}). Selected example slot: {selectedDateObj?.label || selectedDateIso}{' '}
          at {selectedSlot}.
        </p>
        <p className="text-size-small text-color-secondary" style={{ marginBottom: '1.25rem' }}>
          {SITE_CONFIG.demoMode
            ? `Reference ${referenceId}. This is a local demonstration fixture — no external calendar invite has been sent. Connect VITE_BOOKING_ENDPOINT to enable live scheduling.`
            : `Reference ${referenceId}. If the time no longer suits, reply to the invitation and we will move it.`}
        </p>
        <VikaButton
          label="Start another request"
          withIcon={false}
          variant="secondary"
          size="small"
          onClick={() => setSubmitState('idle')}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="booking_form" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <p className="form_label text-style-label">Who would you like to speak to?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))', gap: '0.75rem' }}>
          {BOOKING_PARTNERS.map((p) => {
            const pDoc = PEOPLE.find((x) => x.slug === p.personSlug);
            const active = p.personSlug === partnerSlug;
            return (
              <button
                key={p.personSlug}
                type="button"
                aria-pressed={active}
                onClick={() => handlePartnerChange(p.personSlug)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: active ? '1.5px solid #4c2218' : '1px solid var(--border-color--border-secondary)',
                  backgroundColor: active ? 'var(--base-color--brand--burgundy-100)' : 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  color: 'var(--text-color--text-primary)',
                }}
              >
                {pDoc && (
                  <img
                    src={pDoc.portrait}
                    alt={p.name}
                    style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  />
                )}
                <div>
                  <div className="text-size-small text-weight-medium">{p.name}</div>
                  <div className="text-style-label" style={{ fontSize: '0.65rem' }}>
                    {p.role} · {p.office}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.625rem' }}>
          <p className="form_label text-style-label" style={{ marginBottom: 0 }}>
            Preferred day ({partner.office}, {partner.timezone})
          </p>
          <span className="text-style-label">
            Local time {officeClock.formatted} · Example slots
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {upcomingDates.map((d) => (
            <button
              key={d.iso}
              type="button"
              aria-pressed={selectedDateIso === d.iso}
              className={`booking_slot-btn ${selectedDateIso === d.iso ? 'is-active' : ''}`}
              onClick={() => setSelectedDateIso(d.iso)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="form_label text-style-label">
          Preferred time, {partner.office} ({personDoc?.office === 'London' ? 'GMT/BST' : 'GMT+4'})
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {partner.timeWindows.map((w) => (
            <button
              key={w.id}
              type="button"
              aria-pressed={selectedWindowId === w.id}
              className={`booking_slot-btn ${selectedWindowId === w.id ? 'is-active' : ''}`}
              onClick={() => handleWindowChange(w.id)}
            >
              {w.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {activeWindow.slots.map((slot) => (
            <button
              key={slot}
              type="button"
              aria-pressed={selectedSlot === slot}
              className={`booking_slot-btn ${selectedSlot === slot ? 'is-active' : ''}`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1rem' }}>
        <div>
          <label htmlFor="booking-name" className="form_label text-style-label">
            Name
          </label>
          <input
            id="booking-name"
            type="text"
            className="form_input"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="booking-email" className="form_label text-style-label">
            Work email
          </label>
          <input
            id="booking-email"
            type="email"
            className="form_input"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-company" className="form_label text-style-label">
          Company, optional
        </label>
        <input
          id="booking-company"
          type="text"
          className="form_input"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <p className="form_label text-style-label">What is the call about?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {TOPICS.map((t) => {
            const active = topics.includes(t);
            return (
              <label key={t} className={`form_checkbox is-pill ${active ? 'is-active' : ''}`}>
                <input type="checkbox" checked={active} onChange={() => toggleTopic(t)} />
                <span>{t}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="booking-notes" className="form_label text-style-label">
          Anything to read first, optional
        </label>
        <textarea
          id="booking-notes"
          className="form_input is-text-area"
          placeholder="Year end, software and overdue matters."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <label className="form_checkbox is-consent" style={{ gap: '0.625rem', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ width: '1rem', height: '1rem', accentColor: '#4c2218', flexShrink: 0 }}
        />
        <span className="text-size-small text-color-secondary">
          I agree to Vika keeping these details to arrange the call. You can ask us to delete them
          at any time.
        </span>
      </label>

      {submitState === 'error' && (
        <div role="alert" className="form_message-error">
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p className="text-style-label">A calendar invitation follows within the hour.</p>
        <VikaButton
          type="submit"
          label={submitState === 'submitting' ? 'Sending' : 'Request a call'}
          hoverLabel="Reply within the hour"
          variant="dark"
          disabled={submitState === 'submitting'}
        />
      </div>
    </form>
  );
}
