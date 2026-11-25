import React, { createContext, useContext, useState } from 'react';

interface BookingOptions {
  partnerSlug?: string;
  serviceSlug?: string;
  planSlug?: string;
}

interface BookingContextValue {
  isOpen: boolean;
  preselectedPartner: string;
  preselectedService: string;
  preselectedPlan: string;
  openBooking: (opts?: BookingOptions) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedPartner, setPreselectedPartner] = useState('sara-lindqvist');
  const [preselectedService, setPreselectedService] = useState('');
  const [preselectedPlan, setPreselectedPlan] = useState('');

  const openBooking = (opts?: BookingOptions) => {
    if (opts?.partnerSlug) setPreselectedPartner(opts.partnerSlug);
    if (opts?.serviceSlug) setPreselectedService(opts.serviceSlug);
    if (opts?.planSlug) setPreselectedPlan(opts.planSlug);
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        preselectedPartner,
        preselectedService,
        preselectedPlan,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
