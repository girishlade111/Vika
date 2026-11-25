import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BookingOverlay } from '@/components/booking/BookingOverlay';
import { animateCounters, animateSectionReveals, ScrollTrigger } from '@/animations/gsapSetup';

interface SiteLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  hideChrome?: boolean;
}

export function SiteLayout({ title, description, children, hideChrome = false }: SiteLayoutProps) {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const scope = mainRef.current || document;
    const stopCounters = animateCounters(scope);
    const stopReveals = animateSectionReveals(scope);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.clearTimeout(t);
      stopCounters();
      stopReveals();
    };
  }, [location.pathname]);

  if (hideChrome) {
    return (
      <div className="page-wrapper">
        <main ref={mainRef} className="main-wrapper">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main ref={mainRef} className="main-wrapper">
        {children}
      </main>
      <Footer />
      <BookingOverlay />
    </div>
  );
}
