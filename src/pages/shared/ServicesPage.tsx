import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { PricingCardsSection } from '@/components/pricing/PricingCardsSection';
import { FAQSection } from '@/components/faq/FAQSection';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { ANNUAL_SERVICE_CALENDAR, SERVICES } from '@/data/services';
import { PEOPLE } from '@/data/people';
import { CASE_STUDIES } from '@/data/caseStudies';
import { usePricing } from '@/context/PricingContext';
import { useBooking } from '@/context/BookingContext';

export function ServicesPage() {
  const { currency } = usePricing();
  const { openBooking } = useBooking();

  const formatMoney = (aed: number, gbp: number) => {
    const val = currency === 'GBP' ? gbp : aed;
    return currency === 'GBP'
      ? `£${new Intl.NumberFormat('en-GB').format(val)}`
      : `AED ${new Intl.NumberFormat('en-GB').format(val)}`;
  };

  return (
    <SiteLayout
      title="Services | Vika accounting, tax and audit"
      description="Three practices on one calendar: Accounting, Tax and Audit for growing companies in Dubai and London."
    >
      {/* 1. Services Hero */}
      <header className="section-services-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Services</span>
            </p>
            <p className="page-header_number text-style-label">(02) Services</p>
            <h1 className="page-header_heading heading-style-display">
              Three practices. <span className="text-color-tertiary">One set of numbers.</span>
            </h1>
            <p className="page-header_lede text-size-large">
              Each practice has its own team and its own partner, coordinated on one calendar. Our
              audit team never audits a company whose books we keep.
            </p>
            <div className="page-header_chips">
              {SERVICES.map((s) => (
                <a key={s.id} href={`#practice-${s.slug}`} className="chip">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Three Service Practice Blocks */}
      <section className="section-services-practices">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="services-practices_list" style={{ gridColumn: '1 / -1' }}>
              {SERVICES.map((svc) => {
                const lead = PEOPLE.find((p) => p.slug === svc.leadPersonSlug);
                return (
                  <article
                    key={svc.id}
                    id={`practice-${svc.slug}`}
                    className="services-practices_item"
                  >
                    <div className="grid-global">
                      <div className="services-practices_media">
                        <div className="services-practices_image-wrap">
                          <img
                            src={svc.image}
                            alt={svc.imageAlt}
                            loading="lazy"
                            className="services-practices_image"
                          />
                        </div>
                        <div className="services-practices_caption">
                          <p className="text-style-label">{svc.number}</p>
                          <p className="text-style-label">{svc.tagline}</p>
                        </div>
                      </div>

                      <div className="services-practices_content">
                        <div className="services-practices_top">
                          <h2 className="services-practices_name heading-style-h1">{svc.name}</h2>
                          <p className="text-style-label">{svc.number}</p>
                        </div>

                        <p className="text-size-large">{svc.description}</p>

                        <div className="services-practices_included text-rich-text w-richtext">
                          <ul>
                            {svc.deliverables.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="services-practices_meta">
                          <div className="services-practices_fee">
                            <p className="text-style-label">From</p>
                            <p className="heading-style-h3">
                              {formatMoney(svc.startingPrice.AED, svc.startingPrice.GBP)}
                            </p>
                            <p className="text-style-label">{svc.priceUnit}</p>
                          </div>

                          {lead && (
                            <Link to={`/people/${lead.slug}`} className="services-practices_lead">
                              <div className="services-practices_lead-image-wrap">
                                <img
                                  src={lead.portrait}
                                  alt={lead.name}
                                  loading="lazy"
                                  className="services-practices_lead-image"
                                />
                              </div>
                              <div className="services-practices_lead-text">
                                <p className="text-weight-medium">{lead.name}</p>
                                <p className="text-size-small text-color-secondary">{lead.role}</p>
                              </div>
                            </Link>
                          )}
                        </div>

                        <div className="services-practices_actions">
                          <VikaButton
                            label="Read about the practice"
                            hoverLabel="how we work"
                            to={`/services/${svc.slug}`}
                            variant="dark"
                          />
                          <button
                            type="button"
                            className="text-style-link"
                            style={{ background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
                            onClick={() => openBooking({ serviceSlug: svc.slug, partnerSlug: lead?.slug })}
                          >
                            Ask about this practice
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Annual Service Calendar (Gantt) */}
      <section className="section-services-year">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(04) The year</p>
              <h2 className="section-head_heading heading-style-h2">
                A year with Vika, <span className="text-color-tertiary">month by month.</span>
              </h2>
            </div>

            <div className="services-year_board" style={{ gridColumn: '1 / -1', overflowX: 'auto', marginTop: '2.5rem' }}>
              <div style={{ minWidth: '58rem', borderTop: '1px solid var(--border-color--border-primary)' }}>
                {/* Header Month Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '7.5rem repeat(12, minmax(0, 1fr))',
                    borderBottom: '1px solid var(--border-color--border-primary)',
                    padding: '0.75rem 0',
                  }}
                >
                  <span className="text-style-label">Practice</span>
                  {ANNUAL_SERVICE_CALENDAR.map((m) => (
                    <p key={m.month} className="services-year_month-name text-style-label" style={{ textAlign: 'center' }}>
                      {m.month}
                    </p>
                  ))}
                </div>

                {/* Accounting Lane */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '7.5rem repeat(12, minmax(0, 1fr))',
                    borderBottom: '1px solid var(--border-color--border-primary)',
                    padding: '1rem 0',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <p className="services-year_lane text-style-label">Accounting</p>
                  {ANNUAL_SERVICE_CALENDAR.map((m) => (
                    <div key={`acc-${m.month}`} style={{ textAlign: 'center' }}>
                      <span
                        className="services-year_mark text-style-label"
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '999px',
                          backgroundColor: 'var(--background-color--background-secondary)',
                          color: 'var(--text-color--text-primary)',
                          fontSize: '0.65rem',
                        }}
                      >
                        10th
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tax Lane */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '7.5rem repeat(12, minmax(0, 1fr))',
                    borderBottom: '1px solid var(--border-color--border-primary)',
                    padding: '1rem 0',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <p className="services-year_lane text-style-label">Tax</p>
                  {ANNUAL_SERVICE_CALENDAR.map((m) => (
                    <div key={`tax-${m.month}`} style={{ textAlign: 'center' }}>
                      {m.tax && (
                        <span
                          className="services-year_mark is-tax text-style-label"
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '999px',
                            backgroundColor: '#4c2218',
                            color: '#f3f2ee',
                            fontSize: '0.65rem',
                          }}
                        >
                          {m.tax}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Audit Lane */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '7.5rem repeat(12, minmax(0, 1fr))',
                    borderBottom: '1px solid var(--border-color--border-primary)',
                    padding: '1rem 0',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <p className="services-year_lane text-style-label">Audit</p>
                  {ANNUAL_SERVICE_CALENDAR.map((m) => (
                    <div key={`aud-${m.month}`} style={{ textAlign: 'center' }}>
                      {m.audit && (
                        <span
                          className="services-year_mark is-audit text-style-label"
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '999px',
                            backgroundColor: '#121211',
                            color: '#f3f2ee',
                            fontSize: '0.65rem',
                          }}
                        >
                          {m.audit}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 12 Month Breakdown */}
            <div
              style={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
                gap: '1.5rem 2rem',
                marginTop: '2.5rem',
              }}
            >
              {ANNUAL_SERVICE_CALENDAR.map((m) => (
                <div
                  key={`desc-${m.month}`}
                  style={{
                    borderTop: '1px solid var(--border-color--border-primary)',
                    paddingTop: '0.875rem',
                  }}
                >
                  <p className="text-style-label" style={{ marginBottom: '0.35rem' }}>
                    {m.month}
                  </p>
                  <p className="text-size-small text-color-secondary">{m.summary}</p>
                </div>
              ))}
            </div>

            <p className="services-year_foot text-size-small text-color-secondary" style={{ gridColumn: '1 / -1', marginTop: '2rem' }}>
              Every month closes by the tenth working day. Tax and audit dates assume calendar
              quarters and a 31 December year end.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fixed-Fee Pricing */}
      <PricingCardsSection id="fees" sectionClassName="section-services-fees" mode="tabbed" />

      {/* 5. Case Studies */}
      <section className="section-services-cases">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(06) Case studies</p>
              <h2 className="section-head_heading heading-style-h2">
                What the fees <span className="text-color-tertiary">paid for.</span>
              </h2>
              <Link to="/case-studies" className="section-head_link text-style-link">
                All case studies
              </Link>
            </div>

            <div className="case-cards_list" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
              {CASE_STUDIES.slice(0, 3).map((cs) => (
                <Link
                  key={cs.id}
                  to={`/case-studies/${cs.slug}`}
                  className="case-cards_card w-inline-block"
                >
                  <div className="case-cards_image-wrapper">
                    <img
                      src={cs.coverImage}
                      alt={cs.coverAlt}
                      loading="lazy"
                      className="case-cards_image"
                    />
                  </div>
                  <div className="case-cards_content">
                    <div className="case-cards_meta">
                      <p className="case-cards_meta-text text-style-label">{cs.sector}</p>
                      <p className="case-cards_meta-text text-style-label">{cs.location}</p>
                    </div>
                    <h3 className="case-cards_title heading-style-h3">{cs.title}</h3>
                    <p className="case-cards_result">{cs.summary}</p>
                    <div className="case-cards_metric">
                      <p className="case-cards_metric-value">{cs.primaryMetric.value}</p>
                      <p className="case-cards_metric-label text-style-label">
                        {cs.primaryMetric.label}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Services FAQ */}
      <FAQSection
        context="services"
        sectionLabel="(07) Questions"
        headingPrimary="Before you"
        headingMuted="ask."
        subtext="The six questions we hear most in a first call. Anything else,"
        ctaLabel="ask us directly"
        sectionClassName="section-services-questions"
      />

      {/* 7. Brown Practice CTA Band */}
      <PracticeCTA />
    </SiteLayout>
  );
}
