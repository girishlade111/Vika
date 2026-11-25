import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/data/siteConfig';
import { OFFICES } from '@/data/offices';
import { VikaButton } from '@/components/common/VikaButton';
import { ExploreVika } from '@/components/layout/ExploreVika';
import { prefersReducedMotion } from '@/animations/gsapSetup';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMsg('That did not go through. Check the address and try again.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      if (SITE_CONFIG.newsletterEndpoint) {
        const res = await fetch(SITE_CONFIG.newsletterEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed }),
        });
        if (!res.ok) throw new Error('Submission failed');
      } else {
        await new Promise((r) => setTimeout(r, 350));
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('That did not go through. Check the address and try again.');
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <footer aria-label="Footer" className="footer_component">
      <div className="footer_box">
        <div className="padding-global">
          <div className="grid-global">
            <h2 className="footer_heading heading-style-h2">
              Stay ahead of the filing calendar.{' '}
              <span className="text-color-secondary">One short note a quarter.</span>
            </h2>

            <div className="footer_form-wrap">
              <div className="form_component">
                <form onSubmit={handleSubmit} noValidate className="form_form">
                  <label htmlFor="newsletter-email" className="form_label text-style-label">
                    The quarterly note
                  </label>
                  <div className="footer_field">
                    <input
                      id="newsletter-email"
                      name="Email"
                      type="email"
                      autoComplete="email"
                      maxLength={256}
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form_input is-inline"
                      required
                    />
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="button is-small"
                    >
                      {status === 'submitting' ? 'Sending' : 'Subscribe'}
                    </button>
                  </div>
                </form>

                {status === 'success' && (
                  <div role="status" className="form_message-success is-inline">
                    <p className="margin-0">
                      {SITE_CONFIG.demoMode
                        ? 'Demo note recorded locally. Configure VITE_NEWSLETTER_ENDPOINT for live delivery.'
                        : 'Thank you. The next note arrives at the end of the quarter.'}
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div role="alert" className="form_message-error is-inline">
                    <p className="margin-0">{errorMsg}</p>
                  </div>
                )}
              </div>
            </div>

            <nav aria-label="Site" className="footer_col">
              <p className="footer_label text-style-label">Studio</p>
              <Link to="/" className="footer_link text-size-regular">
                Index
              </Link>
              <Link to="/services" className="footer_link text-size-regular">
                Services
              </Link>
              <Link to="/pricing" className="footer_link text-size-regular">
                Pricing
              </Link>
              <Link to="/studio" className="footer_link text-size-regular">
                Studio
              </Link>
              <Link to="/team" className="footer_link text-size-regular">
                Team
              </Link>
              <Link to="/insights" className="footer_link text-size-regular">
                Insights
              </Link>
              <Link to="/case-studies" className="footer_link text-size-regular">
                Case studies
              </Link>
              <Link to="/contact" className="footer_link text-size-regular">
                Contact
              </Link>
            </nav>

            <div className="footer_col">
              <p className="footer_label text-style-label">Offices</p>
              <p className="footer_office text-size-small">
                <span className="text-weight-medium">Dubai</span>
                <span className="text-color-secondary">{OFFICES.dubai.addressLines[0]}</span>
                <span className="text-color-secondary">{OFFICES.dubai.addressLines[1]}</span>
              </p>
              <p className="footer_office text-size-small">
                <span className="text-weight-medium">London</span>
                <span className="text-color-secondary">{OFFICES.london.addressLines[0]}</span>
                <span className="text-color-secondary">{OFFICES.london.addressLines[1]}</span>
              </p>
            </div>

            <nav aria-label="Template" className="footer_col">
              <p className="footer_label text-style-label">Template</p>
              <Link to="/overview" className="footer_link text-size-regular">
                Overview
              </Link>
              <Link to="/style-guide" className="footer_link text-size-regular">
                Style guide
              </Link>
              <Link to="/instructions" className="footer_link text-size-regular">
                Instructions
              </Link>
              <Link to="/licenses" className="footer_link text-size-regular">
                Licenses
              </Link>
              <Link to="/changelog" className="footer_link text-size-regular">
                Changelog
              </Link>
              <Link to="/404" className="footer_link text-size-regular">
                404
              </Link>
              <Link to="/401" className="footer_link text-size-regular">
                Password
              </Link>
            </nav>

            <div className="footer_col">
              <p className="footer_label text-style-label">Contact</p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="footer_link text-size-regular">
                {SITE_CONFIG.email}
              </a>
              <a href={OFFICES.dubai.phoneHref} className="footer_link text-size-regular">
                {OFFICES.dubai.phone}
              </a>
              <a href={OFFICES.london.phoneHref} className="footer_link text-size-regular">
                {OFFICES.london.phone}
              </a>
            </div>

            <div className="footer_mark">
              <p className="footer_word" aria-label="Vika">
                <span className="footer_letter">V</span>
                <span className="footer_letter">i</span>
                <span className="footer_letter">k</span>
                <span className="footer_letter">a</span>
              </p>
              <div className="footer_side">
                <p className="text-style-label">
                  {SITE_CONFIG.tagline}. Dubai and London.
                </p>
                <VikaButton
                  label="Back to top"
                  hoverLabel="of the page"
                  href="#top"
                  onClick={scrollToTop}
                  variant="secondary"
                  size="small"
                  iconAlternate
                />
              </div>
            </div>

            <div className="footer_bottom text-size-tiny text-color-secondary">
              <p className="footer_legal">{SITE_CONFIG.legalNotice}</p>
              <p className="footer_legal">
                <Link to="/privacy-policy" className="text-style-link">
                  Privacy Policy
                </Link>
              </p>
              <p className="footer_legal">{SITE_CONFIG.demoDisclaimer}</p>
              <p className="footer_legal">
                Original design by{' '}
                <a
                  href={SITE_CONFIG.attribution.designerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-style-link"
                >
                  {SITE_CONFIG.attribution.designerName}
                </a>
                . Independent React recreation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ExploreVika />
    </footer>
  );
}
