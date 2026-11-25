import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { QuoteSlider } from '@/components/testimonials/QuoteSlider';
import { FAQSection } from '@/components/faq/FAQSection';
import { DEADLINES } from '@/data/deadlines';
import { SERVICES } from '@/data/services';
import { PEOPLE } from '@/data/people';
import { PLANS } from '@/data/plans';
import { CASE_STUDIES } from '@/data/caseStudies';
import { INSIGHTS } from '@/data/insights';
import { useBooking } from '@/context/BookingContext';
import { usePricing } from '@/context/PricingContext';

const STATEMENT_LEDGER = [
  { name: 'Companies on our books', value: '340' },
  { name: 'Returns filed last year', value: '2,100' },
  { name: 'People in Dubai and London', value: '26' },
  { name: 'Working days to a closed month', value: '10' },
  { name: 'Practices', value: '3' },
  { name: 'Offices', value: '2' },
];

export function StatementHome() {
  const { openBooking } = useBooking();
  const { currency } = usePricing();
  const [openPracticeId, setOpenPracticeId] = useState<string | null>(SERVICES[0].id);

  const featuredDeadline = DEADLINES[0];
  const upcomingDeadlines = DEADLINES.filter((d) =>
    ['dl-uk-vat-q3-2026', 'dl-uae-vat-q4-2026', 'dl-uae-vat-q1-2027'].includes(d.id)
  );

  const formatPlanPrice = (plan: (typeof PLANS)[number]) => {
    const val =
      plan.kind === 'retainer'
        ? plan.prices[currency].monthly ?? 0
        : plan.prices[currency].fixed ?? 0;
    const f = new Intl.NumberFormat('en-GB').format(val);
    return currency === 'GBP' ? `£${f}` : `AED ${f}`;
  };

  return (
    <SiteLayout
      title="Vika | Accounting and tax studio, Statement layout"
      description="Vika keeps the calendar, the books and the audits for 340 companies in the UAE and the UK, so a filing date is never news."
    >
      {/* 1. Statement Deadline-Led Hero */}
      <section className="section-home-statement-hero">
        <div className="padding-global">
          <div className="grid-global">
            <p className="statement-hero_meta-start text-style-label">
              (Index) Accounting · Tax · Audit
            </p>
            <p className="statement-hero_meta-center text-style-label">
              Dubai and London · Monday to Friday
            </p>
            <p className="statement-hero_meta-end text-style-label">Since 2016</p>

            <h1 className="statement-hero_heading">
              <span className="text-color-tertiary">Your next deadline</span> is already on our
              calendar.
            </h1>

            {featuredDeadline && (
              <div className="statement-hero_what">
                <p className="text-style-label">{featuredDeadline.practice}</p>
                <p className="statement-hero_what-name">{featuredDeadline.title}</p>
                <p className="text-size-regular text-color-secondary">{featuredDeadline.date}</p>
              </div>
            )}

            <p className="statement-hero_lede text-size-large">
              Vika keeps the calendar, the books and the audits for 340 companies in the UAE and the
              UK, so a date like this is never news.
            </p>

            <div className="statement-hero_actions">
              <VikaButton
                label="Book a call"
                hoverLabel="with a partner"
                variant="dark"
                onClick={() => openBooking()}
              />
              <a href="#fees" className="text-style-link">
                See our fees
              </a>
            </div>

            <div className="statement-hero_next">
              <div className="statement-hero_next-list">
                {upcomingDeadlines.map((dl) => (
                  <Link
                    key={dl.id}
                    to={`/deadlines/${dl.slug}`}
                    className="statement-hero_next-item w-inline-block"
                  >
                    <p className="statement-hero_next-date">{dl.date}</p>
                    <p className="text-style-label">{dl.practice}</p>
                    <p className="text-size-regular">{dl.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Expandable Practices Accordion */}
      <section className="section-home-statement-practices">
        <div className="padding-global padding-section-medium">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(01) Practices</p>
              <h2 className="section-head_heading heading-style-h2">
                Three practices,{' '}
                <span className="text-color-tertiary">opened one at a time.</span>
              </h2>
            </div>

            <div className="statement-practices_component">
              {SERVICES.map((svc) => {
                const isOpen = openPracticeId === svc.id;
                const lead = PEOPLE.find((p) => p.slug === svc.leadPersonSlug);
                return (
                  <div
                    key={svc.id}
                    className={`practices_item statement-practices_details ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      className="practices_row is-summary"
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 0,
                        textAlign: 'left',
                        fontFamily: 'inherit',
                        color: 'inherit',
                      }}
                      onClick={() => setOpenPracticeId(isOpen ? null : svc.id)}
                    >
                      <p className="practices_number text-style-label">{svc.number}</p>
                      <h3 className="practices_name">{svc.name}</h3>
                      <p className="practices_short text-size-medium">{svc.shortSummary}</p>
                      <div className="practices_fee">
                        <p className="text-style-label">From</p>
                        <p className="text-size-regular text-weight-medium">
                          AED {new Intl.NumberFormat('en-GB').format(svc.startingPrice.AED)}
                        </p>
                        <p className="text-size-small text-color-secondary">{svc.priceUnit}</p>
                      </div>
                      <span className="practices_icon is-plus" aria-hidden="true">
                        +
                      </span>
                    </button>

                    <div className="statement-practices_reveal">
                      <div className="statement-practices_panel">
                        <div className="statement-practices_media">
                          <img
                            src={svc.image}
                            alt={svc.name}
                            loading="lazy"
                            className="statement-practices_image"
                          />
                        </div>
                        <div className="statement-practices_body">
                          <p className="text-size-large">{svc.description}</p>
                          <div className="text-size-regular text-color-secondary w-richtext">
                            <ul>
                              {svc.deliverables.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="statement-practices_actions">
                            <VikaButton
                              label="Explore the practice"
                              hoverLabel="see the work"
                              to={`/services/${svc.slug}`}
                              variant="dark"
                            />
                            {lead && (
                              <div className="services-practices_lead">
                                <p className="text-style-label">Led by</p>
                                <Link
                                  to={`/people/${lead.slug}`}
                                  className="text-size-small text-weight-medium text-style-link"
                                >
                                  {lead.name}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ten Years, In Figures Ledger */}
      <section className="section-home-statement-ledger">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(02) The statement</p>
              <h2 className="section-head_heading heading-style-h2">
                Ten years, <span className="text-color-tertiary">in figures.</span>
              </h2>
            </div>

            <div className="ledger_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {STATEMENT_LEDGER.map((row) => (
                <div key={row.name} className="ledger_row">
                  <p className="ledger_name">{row.name}</p>
                  <p className="ledger_value">{row.value}</p>
                </div>
              ))}
              <div className="ledger_row is-total">
                <p className="ledger_name">The rule since 2016</p>
                <p className="ledger_total-value">Closed by the tenth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fixed Fees, In One Table */}
      <section id="fees" className="section-home-statement-fees">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(03) Fees</p>
              <h2 className="section-head_heading heading-style-h2">
                Fixed fees, <span className="text-color-tertiary">in one table.</span>
              </h2>
            </div>

            <div className="fee-table_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {PLANS.map((plan) => (
                <div key={plan.id} className="fee-table_row">
                  <div className="fee-table_intro">
                    <p className="fee-table_name">{plan.name}</p>
                    <p className="text-size-regular text-color-secondary">{plan.description}</p>
                  </div>
                  <div className="fee-table_items text-size-small text-color-secondary w-richtext">
                    <ul>
                      {plan.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="fee-table_price">
                    <p className="fee-table_amount">{formatPlanPrice(plan)}</p>
                    <Link to={`/plans/${plan.slug}`} className="text-style-link">
                      Choose this plan
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="fee-table_note text-size-small text-color-secondary">
              Fees exclude VAT. Monthly fees are reviewed with you once a year, never in the middle
              of a contract. London clients are quoted in pounds.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Clients Quote */}
      <QuoteSlider sectionLabel="(04) Clients" sectionClassName="section-home-statement-quote" />

      {/* 6. Case Studies Ledger Board */}
      <section className="section-home-statement-cases">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(05) Case studies</p>
              <h2 className="section-head_heading heading-style-h2">
                The work, <span className="text-color-tertiary">by the numbers.</span>
              </h2>
              <Link to="/case-studies" className="section-head_link text-style-link">
                All case studies
              </Link>
            </div>

            <div className="case-ledger_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {CASE_STUDIES.map((cs) => (
                <Link
                  key={cs.id}
                  to={`/case-studies/${cs.slug}`}
                  className="case-ledger_row is-board w-inline-block"
                >
                  <p className="case-ledger_metric is-board">{cs.primaryMetric.value}</p>
                  <p className="case-board_label text-style-label">{cs.primaryMetric.label}</p>
                  <h3 className="case-ledger_title heading-style-h3 is-board">{cs.title}</h3>
                  <p className="case-ledger_sector text-style-label is-board">{cs.sector}</p>
                  <p className="case-ledger_location text-style-label is-board">{cs.location}</p>
                  <span className="case-ledger_icon is-board" aria-hidden="true">
                    →
                  </span>
                  <img
                    src={cs.coverImage}
                    alt={cs.title}
                    loading="lazy"
                    className="case-board_image"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Latest Notes List */}
      <section className="section-home-statement-notes">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(06) Insights</p>
              <h2 className="section-head_heading heading-style-h2">
                The latest <span className="text-color-tertiary">notes.</span>
              </h2>
            </div>

            <div className="insights-list_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {INSIGHTS.slice(0, 4).map((ins) => (
                <Link
                  key={ins.id}
                  to={`/insights/${ins.slug}`}
                  className="insights-list_row w-inline-block"
                >
                  <div className="insight-row_component">
                    <p className="insights-list_date text-style-label">{ins.publicationDate}</p>
                    <h3 className="insights-list_title heading-style-h3">{ins.title}</h3>
                    <p className="insights-list_category text-style-label">{ins.category}</p>
                    <p className="insights-list_time text-style-label">{ins.readingTime} min</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <FAQSection
        context="home"
        sectionLabel="(07) Questions"
        headingPrimary="Asked often,"
        headingMuted="answered plainly."
        sectionClassName="section-home-statement-questions"
      />

      {/* 9. Statement Closing Row */}
      <section className="section-home-statement-close">
        <button
          type="button"
          className="closing-row_component"
          style={{ width: '100%', background: 'transparent', border: 0, cursor: 'pointer' }}
          onClick={() => openBooking({ partnerSlug: 'sara-lindqvist' })}
        >
          <span className="closing-row_text">Book a call with Sara</span>
        </button>
      </section>
    </SiteLayout>
  );
}
