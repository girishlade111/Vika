import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { LayoutFamily } from '@/data/types';

interface LayoutContextValue {
  layoutFamily: LayoutFamily;
  setLayoutFamily: (f: LayoutFamily) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  getLayoutRoute: (targetFamily: LayoutFamily) => string;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

function inferFamilyFromPath(pathname: string): LayoutFamily | null {
  if (pathname.startsWith('/cinematic/')) return 'cinematic';
  if (pathname.startsWith('/statement/')) return 'statement';
  if (pathname === '/' || pathname === '/studio' || pathname === '/contact') return 'classic';
  return null;
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [layoutFamily, setLayoutFamily] = useState<LayoutFamily>(() => {
    return inferFamilyFromPath(window.location.pathname) || 'classic';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const inferred = inferFamilyFromPath(location.pathname);
    if (inferred) setLayoutFamily(inferred);
    setMenuOpen(false);
  }, [location.pathname]);

  const getLayoutRoute = (target: LayoutFamily): string => {
    const p = location.pathname;
    const isStudio = p.includes('studio');
    const isContact = p.includes('contact');
    if (isStudio) {
      if (target === 'cinematic') return '/cinematic/studio-cinematic';
      if (target === 'statement') return '/statement/studio-statement';
      return '/studio';
    }
    if (isContact) {
      if (target === 'cinematic') return '/cinematic/contact-cinematic';
      if (target === 'statement') return '/statement/contact-statement';
      return '/contact';
    }
    if (target === 'cinematic') return '/cinematic/home-cinematic';
    if (target === 'statement') return '/statement/home-statement';
    return '/';
  };

  return (
    <LayoutContext.Provider value={{ layoutFamily, setLayoutFamily, menuOpen, setMenuOpen, getLayoutRoute }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider');
  return ctx;
}
