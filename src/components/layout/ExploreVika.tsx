import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useLayout } from '@/context/LayoutContext';

export function ExploreVika() {
  const [open, setOpen] = useState(false);
  const { layoutFamily } = useLayout();

  if (!SITE_CONFIG.enableExploreVika) return null;

  return (
    <div className="tour">
      <button
        type="button"
        aria-label="Explore Vika"
        aria-expanded={open}
        className={`tour_toggle ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <div aria-hidden="true" className="tour_mark">
          <div className="tour_plus-line" />
          <div className="tour_plus-line is-vertical" />
        </div>
        <div className="tour_toggle-label">Explore Vika</div>
      </button>

      <nav aria-label="Template tour" className={`tour_list ${open ? 'is-open' : ''}`}>
        <div className="tour_panel">
          <div className="tour_head">
            <div className="text-style-label">Template preview</div>
            <div className="tour_title">Explore Vika</div>
            <p className="tour_text">
              Three layouts on one system, built for accounting, tax and audit firms. Pick a home
              layout, open Studio or Contact as 01 Classic, 02 Cinematic or 03 Statement, then make
              it yours.
            </p>
          </div>

          <div className="tour_group">
            <div className="text-style-label">Home layouts</div>
            <div className="tour_layouts">
              <Link
                to="/"
                className={`tour_layout ${layoutFamily === 'classic' ? 'is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <div className="text-style-label">01</div>
                <div className="tour_layout-name">Classic</div>
              </Link>
              <Link
                to="/cinematic/home-cinematic"
                className={`tour_layout ${layoutFamily === 'cinematic' ? 'is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <div className="text-style-label">02</div>
                <div className="tour_layout-name">Cinematic</div>
              </Link>
              <Link
                to="/statement/home-statement"
                className={`tour_layout ${layoutFamily === 'statement' ? 'is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <div className="text-style-label">03</div>
                <div className="tour_layout-name">Statement</div>
              </Link>
            </div>
          </div>

          <div className="tour_group">
            <div className="text-style-label">Pages</div>
            <div className="tour_pages">
              <div className="tour_page">
                <Link to="/services" className="text-style-link" onClick={() => setOpen(false)}>
                  Services
                </Link>
              </div>
              <div className="tour_page">
                <Link to="/studio" className="text-style-link" onClick={() => setOpen(false)}>
                  Studio
                </Link>
                <div className="tour_page-layouts">
                  <Link
                    aria-label="Studio, Classic layout"
                    to="/studio"
                    className="tour_page-layout"
                    onClick={() => setOpen(false)}
                  >
                    01
                  </Link>
                  <Link
                    aria-label="Studio, Cinematic layout"
                    to="/cinematic/studio-cinematic"
                    className="tour_page-layout"
                    onClick={() => setOpen(false)}
                  >
                    02
                  </Link>
                  <Link
                    aria-label="Studio, Statement layout"
                    to="/statement/studio-statement"
                    className="tour_page-layout"
                    onClick={() => setOpen(false)}
                  >
                    03
                  </Link>
                </div>
              </div>
              <div className="tour_page">
                <Link to="/team" className="text-style-link" onClick={() => setOpen(false)}>
                  Team
                </Link>
              </div>
              <div className="tour_page">
                <Link to="/insights" className="text-style-link" onClick={() => setOpen(false)}>
                  Insights
                </Link>
              </div>
              <div className="tour_page">
                <Link to="/contact" className="text-style-link" onClick={() => setOpen(false)}>
                  Contact
                </Link>
                <div className="tour_page-layouts">
                  <Link
                    aria-label="Contact, Classic layout"
                    to="/contact"
                    className="tour_page-layout"
                    onClick={() => setOpen(false)}
                  >
                    01
                  </Link>
                  <Link
                    aria-label="Contact, Cinematic layout"
                    to="/cinematic/contact-cinematic"
                    className="tour_page-layout"
                    onClick={() => setOpen(false)}
                  >
                    02
                  </Link>
                  <Link
                    aria-label="Contact, Statement layout"
                    to="/statement/contact-statement"
                    className="tour_page-layout"
                    onClick={() => setOpen(false)}
                  >
                    03
                  </Link>
                </div>
              </div>
              <div className="tour_page is-extras">
                <Link to="/overview" className="text-style-link" onClick={() => setOpen(false)}>
                  Overview
                </Link>
                <Link to="/case-studies" className="text-style-link" onClick={() => setOpen(false)}>
                  Case studies
                </Link>
                <Link to="/pricing" className="text-style-link" onClick={() => setOpen(false)}>
                  Pricing
                </Link>
                <Link to="/style-guide" className="text-style-link" onClick={() => setOpen(false)}>
                  Style guide
                </Link>
                <Link to="/instructions" className="text-style-link" onClick={() => setOpen(false)}>
                  Instructions
                </Link>
              </div>
            </div>
          </div>

          <div className="tour_cta">
            <Link
              to="/cinematic/contact-cinematic"
              className="button is-small is-brand"
              onClick={() => setOpen(false)}
            >
              Book a partner call
            </Link>
            <div className="tour_cta-meta">
              <Link to="/overview" className="text-style-link" onClick={() => setOpen(false)}>
                View all layouts & CMS
              </Link>
              <div className="text-style-label">By Margined</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
