import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '@/data/siteConfig';
import { OFFICES } from '@/data/offices';
import { OfficeClock } from '@/components/common/OfficeClock';
import { VikaButton } from '@/components/common/VikaButton';
import { useLayout } from '@/context/LayoutContext';
import { useBooking } from '@/context/BookingContext';
import { gsap, prefersReducedMotion } from '@/animations/gsapSetup';

const NAV_ITEMS = [
  { num: '(01)', label: 'Index', to: '/' },
  { num: '(02)', label: 'Services', to: '/services' },
  { num: '(03)', label: 'Studio', to: '/studio' },
  { num: '(04)', label: 'Insights', to: '/insights' },
  { num: '(05)', label: 'Pricing', to: '/pricing' },
  { num: '(06)', label: 'Contact', to: '/contact' },
];

export function Header() {
  const { layoutFamily, menuOpen, setMenuOpen, getLayoutRoute } = useLayout();
  const { openBooking } = useBooking();
  const location = useLocation();
  const [showPill, setShowPill] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const savedScrollY = useRef(0);

  // Show floating navigation pill after scrolling past hero (~420px) and hide when menu open
  useEffect(() => {
    const onScroll = () => {
      setShowPill(window.scrollY > 420 && !menuOpen);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen, location.pathname]);

  // Lock body scroll & restore focus + scroll when fullscreen menu opens/closes
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    if (menuOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);

      if (!prefersReducedMotion() && menuRef.current) {
        const texts = menuRef.current.querySelectorAll('.navbar_menu-text');
        const side = menuRef.current.querySelector('.navbar_menu-side');
        gsap.fromTo(
          texts,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: 'power3.out', delay: 0.08 }
        );
        if (side) {
          gsap.fromTo(
            side,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
          );
        }
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, setMenuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  const homeRoute =
    layoutFamily === 'cinematic'
      ? '/cinematic/home-cinematic'
      : layoutFamily === 'statement'
        ? '/statement/home-statement'
        : '/';

  return (
    <header className="navbar_component" id="top">
      <a href="#main-content" className="navbar_skip-link">
        Skip to main content
      </a>

      <div className="padding-global">
        <div className="grid-global is-navbar">
          <Link aria-label="Vika home" to={homeRoute} className="navbar_brand">
            <img
              src={SITE_CONFIG.wordmarkDark}
              loading="eager"
              alt="Vika"
              className="navbar_logo"
            />
          </Link>

          <p className="navbar_desc text-style-label">
            {SITE_CONFIG.tagline}
            <br />
            {SITE_CONFIG.subTagline}
          </p>

          <p className="navbar_hours text-style-label">
            <span className="navbar_dot" aria-hidden="true" />
            Dubai office open {OFFICES.dubai.hoursLabel}
          </p>

          <div className="navbar_tools">
            <button
              ref={triggerRef}
              type="button"
              aria-controls="vika-menu"
              aria-expanded={menuOpen}
              className="navbar_menu-button"
              onClick={() => setMenuOpen(true)}
            >
              <span>Menu</span>
              <span className="navbar_menu-icon" aria-hidden="true">
                <span className="navbar_menu-line" />
                <span className="navbar_menu-line" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Near-Black Editorial Menu */}
      <div
        ref={menuRef}
        id="vika-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`navbar_menu ${menuOpen ? 'is-open' : ''}`}
      >
        <div className="navbar_menu-inner">
          <div className="padding-global">
            <div className="grid-global is-navbar">
              <Link aria-label="Vika home" to={homeRoute} className="navbar_brand" onClick={closeMenu}>
                <img
                  src={SITE_CONFIG.wordmarkLight}
                  loading="lazy"
                  alt="Vika"
                  className="navbar_logo"
                />
              </Link>
              <div className="navbar_tools">
                <button
                  type="button"
                  aria-controls="vika-menu"
                  className="navbar_close-button"
                  onClick={closeMenu}
                >
                  <span>Close</span>
                  <span className="navbar_close-icon" aria-hidden="true">
                    <span className="navbar_close-line" />
                    <span className="navbar_close-line is-second" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="padding-global">
            <div className="grid-global is-menu">
              <nav
                aria-label="Main"
                className="navbar_menu-links"
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {NAV_ITEMS.map((item, idx) => {
                  const resolvedTo =
                    item.label === 'Index'
                      ? homeRoute
                      : item.label === 'Studio'
                        ? layoutFamily === 'cinematic'
                          ? '/cinematic/studio-cinematic'
                          : layoutFamily === 'statement'
                            ? '/statement/studio-statement'
                            : '/studio'
                        : item.label === 'Contact'
                          ? layoutFamily === 'cinematic'
                            ? '/cinematic/contact-cinematic'
                            : layoutFamily === 'statement'
                              ? '/statement/contact-statement'
                              : '/contact'
                          : item.to;

                  const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;
                  const isFocused = hoveredIdx === idx;

                  return (
                    <Link
                      key={item.label}
                      to={resolvedTo}
                      className="navbar_menu-link heading-style-h1"
                      onClick={closeMenu}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onFocus={() => setHoveredIdx(idx)}
                      onBlur={() => setHoveredIdx(null)}
                      style={{
                        opacity: isDimmed ? 0.5 : 1,
                        transform: isFocused ? 'translateX(14px)' : 'translateX(0px)',
                        color: isFocused ? 'var(--accent-color--accent-primary)' : undefined,
                        transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.35s',
                      }}
                    >
                      <span className="navbar_menu-number text-style-label">{item.num}</span>
                      <span className="navbar_menu-mask">
                        <span className="navbar_menu-text">{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="navbar_menu-side">
                <div className="navbar_menu-group">
                  <p className="text-style-label">Offices</p>
                  <p className="navbar_menu-office text-size-small">
                    <span className="navbar_dot" aria-hidden="true" />
                    <span className="text-weight-medium">Dubai</span>
                    <span className="navbar_menu-hours text-color-secondary">
                      {OFFICES.dubai.shortAddress} {OFFICES.dubai.hoursLabel}
                    </span>
                    <OfficeClock timezone={OFFICES.dubai.timezone} size="mini" />
                  </p>
                  <p className="navbar_menu-office text-size-small">
                    <span className="navbar_dot" aria-hidden="true" />
                    <span className="text-weight-medium">London</span>
                    <span className="navbar_menu-hours text-color-secondary">
                      {OFFICES.london.shortAddress} {OFFICES.london.hoursLabel}
                    </span>
                    <OfficeClock timezone={OFFICES.london.timezone} size="mini" />
                  </p>
                </div>

                <div className="navbar_menu-group">
                  <p className="text-style-label">Layouts</p>
                  <div className="navbar_menu-layouts">
                    <Link
                      to={getLayoutRoute('classic')}
                      className={`navbar_menu-layout ${layoutFamily === 'classic' ? 'is-active' : ''}`}
                      onClick={closeMenu}
                    >
                      <span className="navbar_menu-layout-number">01</span>Classic
                    </Link>
                    <Link
                      to={getLayoutRoute('cinematic')}
                      className={`navbar_menu-layout ${layoutFamily === 'cinematic' ? 'is-active' : ''}`}
                      onClick={closeMenu}
                    >
                      <span className="navbar_menu-layout-number">02</span>Cinematic
                    </Link>
                    <Link
                      to={getLayoutRoute('statement')}
                      className={`navbar_menu-layout ${layoutFamily === 'statement' ? 'is-active' : ''}`}
                      onClick={closeMenu}
                    >
                      <span className="navbar_menu-layout-number">03</span>Statement
                    </Link>
                  </div>
                </div>

                <div className="navbar_menu-group">
                  <p className="text-style-label">Write to us</p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="navbar_menu-mail text-size-large text-weight-medium text-style-link"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>

                <div className="navbar_menu-group">
                  <p className="text-style-label">Template</p>
                  <div className="navbar_menu-template">
                    <Link
                      to="/style-guide"
                      className="navbar_menu-template-link text-size-small text-color-secondary"
                      onClick={closeMenu}
                    >
                      Style guide
                    </Link>
                    <Link
                      to="/instructions"
                      className="navbar_menu-template-link text-size-small text-color-secondary"
                      onClick={closeMenu}
                    >
                      Instructions
                    </Link>
                    <Link
                      to="/licenses"
                      className="navbar_menu-template-link text-size-small text-color-secondary"
                      onClick={closeMenu}
                    >
                      Licenses
                    </Link>
                    <Link
                      to="/changelog"
                      className="navbar_menu-template-link text-size-small text-color-secondary"
                      onClick={closeMenu}
                    >
                      Changelog
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="padding-global">
            <div className="navbar_menu-foot">
              <p className="text-style-label">{SITE_CONFIG.tagline}</p>
              <p className="text-style-label">{SITE_CONFIG.subTagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Center Navigation Dock */}
      {SITE_CONFIG.enableNavigationDock && (
        <nav
          aria-label="Quick navigation"
          className={`navbar_pill ${showPill ? 'is-visible' : ''}`}
        >
          <Link aria-label="Vika home" to={homeRoute} className="navbar_pill-mark">
            V
          </Link>
          <Link to="/services" className="navbar_pill-link">
            Services
          </Link>
          <Link
            to={
              layoutFamily === 'cinematic'
                ? '/cinematic/studio-cinematic'
                : layoutFamily === 'statement'
                  ? '/statement/studio-statement'
                  : '/studio'
            }
            className="navbar_pill-link"
          >
            Studio
          </Link>
          <Link to="/insights" className="navbar_pill-link">
            Insights
          </Link>
          <button
            type="button"
            aria-controls="vika-menu"
            aria-expanded={menuOpen}
            className="navbar_pill-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span>Menu</span>
          </button>
          <span className="navbar_pill-divider" aria-hidden="true" />
          <VikaButton
            label="Book a call"
            hoverLabel="with a partner"
            variant="brand"
            size="small"
            iconBrand
            onClick={() => openBooking()}
          />
        </nav>
      )}

      <div id="main-content" tabIndex={-1} className="navbar_content-anchor" />
    </header>
  );
}
