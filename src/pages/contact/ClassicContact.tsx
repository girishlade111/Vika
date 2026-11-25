import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { ClassicContactForm } from '@/components/contact/ClassicContactForm';
import { OFFICES } from '@/data/offices';
import { SITE_CONFIG } from '@/data/siteConfig';

const WHAT_HAPPENS_NEXT = [
  {
    number: '01',
    title: 'We read it',
    text: 'A partner reads every message on the day it arrives.',
  },
  {
    number: '02',
    title: 'We call you',
    text: 'Thirty minutes to understand your companies and anything overdue.',
  },
  {
    number: '03',
    title: 'You get a proposal',
    text: 'A fixed fee and a start date, in writing, within two working days.',
  },
];

export function ClassicContact() {
  return (
    <SiteLayout
      title="Contact | Vika accounting, tax and audit"
      description="Tell us about your numbers. A partner reads every message and replies within one working day."
    >
      <header className="section-contact-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Contact</span>
            </p>
            <p className="page-header_number text-style-label">(05) Contact</p>

            <h1 className="page-header_heading heading-style-display">
              Tell us about <span className="text-color-tertiary">your numbers.</span>
            </h1>

            <p className="page-header_lede text-size-large">
              A partner reads every message and replies within one working day. Prefer to talk?
              Ring either office, or write to{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-style-link">
                {SITE_CONFIG.email}
              </a>
            </p>

            <p className="page-header_status text-style-label">
              <span className="offices_dot" aria-hidden="true" />
              Dubai office open {OFFICES.dubai.hoursLabel}
            </p>
          </div>
        </div>
      </header>

      <section className="section-contact-form">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <ClassicContactForm />

            <aside className="contact_aside">
              <div className="contact_aside-block">
                <p className="text-style-label">What happens next</p>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1.25rem' }}>
                  {WHAT_HAPPENS_NEXT.map((step) => (
                    <li key={step.number} className="contact_step">
                      <p className="text-style-label">{step.number}</p>
                      <div className="contact_step-content">
                        <p className="text-weight-medium">{step.title}</p>
                        <p className="text-size-small text-color-secondary">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="contact_aside-block">
                <p className="text-style-label">Offices</p>
                <div className="contact_offices">
                  {[OFFICES.dubai, OFFICES.london].map((office) => (
                    <div key={office.id} className="contact_office">
                      <p className="contact_office-name text-weight-medium">
                        {office.city}{' '}
                        <span className="offices_dot" aria-hidden="true" style={{ display: 'inline-block', marginLeft: '0.35rem' }} />
                      </p>
                      <p className="text-size-small text-color-secondary">{office.hoursLabel}</p>
                      <p className="text-size-small text-color-secondary">
                        {office.addressLines.join(', ')}
                      </p>
                      <a href={office.phoneHref} className="text-style-link">
                        {office.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
