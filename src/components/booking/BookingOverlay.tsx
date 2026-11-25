import { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { BookingFlow } from './BookingFlow';

export function BookingOverlay() {
  const { isOpen, preselectedPartner, preselectedService, closeBooking } = useBooking();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  return (
    <div
      className="booking-modal_backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBooking();
      }}
    >
      <div className="booking-modal_panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <p className="text-style-label" style={{ marginBottom: '0.5rem' }}>
              Book thirty minutes with a partner
            </p>
            <h2 id="booking-modal-title" className="heading-style-h3">
              Pick a partner, a day and a time.
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close booking dialog"
            className="navbar_close-button"
            style={{ color: 'var(--text-color--text-primary)', borderColor: 'var(--border-color--border-secondary)' }}
            onClick={closeBooking}
          >
            <span>Close</span>
            <span className="navbar_close-icon" aria-hidden="true">
              <span className="navbar_close-line" />
              <span className="navbar_close-line is-second" />
            </span>
          </button>
        </div>

        <BookingFlow
          initialPartnerSlug={preselectedPartner}
          initialServiceSlug={preselectedService}
        />
      </div>
    </div>
  );
}
